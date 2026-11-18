import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router";

import type { Ocorrencia } from "../../../types/Ocorrencia";
import type { Comentario } from "../../../types/Comentario";
import type { DadosPessoa } from "../../../types/Pessoa";

import { buscarOcorrenciaPorId } from "../../../service/OcorrenciaService";

import {
  buscarComentariosPorOcorrencia,
  criarComentario,
} from "../../../service/ComentarioService";

import { buscarPessoaLogada } from "../../../service/UsuarioService";

export default function PagOcorrencia() {
  const { id } = useParams();

  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [pessoa, setPessoa] = useState<DadosPessoa | null>(null);
  const [novoComentario, setNovoComentario] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [publicando, setPublicando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function formatarData(data?: string | null) {
    if (!data) {
      return "Data não informada";
    }

    return new Date(data).toLocaleString("pt-BR");
  }

  useEffect(() => {
    document.title = "Pag. Ocorrencia | MiniCity";
  }, []);


  useEffect(() => {
    async function carregarDados() {
      if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        setErro("Identificador da ocorrência inválido.");
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const idOcorrencia = Number(id);

        const [dadosOcorrencia, listaComentarios, pessoaLogada] =
          await Promise.all([
            buscarOcorrenciaPorId(idOcorrencia),
            buscarComentariosPorOcorrencia(idOcorrencia),
            buscarPessoaLogada(),
          ]);

        setOcorrencia(dadosOcorrencia);
        setComentarios(listaComentarios);
        setPessoa(pessoaLogada);
      } catch (error) {
        console.error("Erro ao carregar ocorrência:", error);
        setErro("Não foi possível carregar os dados da ocorrência.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [id]);

  async function handleEnviarComentario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const conteudo = novoComentario.trim();

    if (!conteudo) {
      setErro("Digite um comentário antes de publicar.");
      return;
    }

    if (conteudo.length > 500) {
      setErro("O comentário deve ter no máximo 500 caracteres.");
      return;
    }

    if (!pessoa || !ocorrencia) {
      setErro("Não foi possível identificar a pessoa ou ocorrência.");
      return;
    }

    try {
      setPublicando(true);
      setErro("");
      setSucesso("");

      const comentarioCriado = await criarComentario(ocorrencia.id, {
        descConteudo: conteudo,
        pessoa: {
          id: pessoa.id,
          nome: pessoa.nome,
          email: pessoa.email,
        },
      });

      setComentarios((comentariosAtuais) => [
        ...comentariosAtuais,
        comentarioCriado,
      ]);

      setNovoComentario("");
      setSucesso("Comentário publicado com sucesso!");
    } catch (error) {
      console.error("Erro ao publicar comentário:", error);
      setErro("Não foi possível publicar o comentário.");
    } finally {
      setPublicando(false);
    }
  }

  if (carregando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#080b09]">
        <p className="text-[#00d65f] text-lg font-semibold">
          Carregando ocorrência...
        </p>
      </main>
    );
  }

  if (erro && !ocorrencia) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#080b09] p-6">
        <div className="bg-[#151a17] border border-[#252d28] p-8 rounded-2xl text-center">
          <h1 className="text-2xl font-bold text-[#00d65f] mb-3">Ops!</h1>
          <p className="text-gray-300">{erro}</p>
        </div>
      </main>
    );
  }

  if (!ocorrencia) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#080b09] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* DETALHES DA OCORRÊNCIA */}

        <section className="bg-[#111713] border border-[#26342b] rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <span className="bg-[#00d65f]/15 text-[#00e66b] border border-[#00d65f]/30 px-4 py-2 rounded-full text-sm font-semibold">
              {ocorrencia.categoria?.nomeOcorrencia}
            </span>

            <span className="bg-[#202923] text-gray-200 border border-[#344139] px-4 py-2 rounded-full text-sm font-semibold">
              {ocorrencia.status}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            {ocorrencia.nomeTitulo}
          </h1>

          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-8">
            {ocorrencia.descOcorrencia}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[#29352d] pt-6">
            <div>
              <p className="text-sm text-[#00d65f] mb-1">Gravidade</p>
              <p className="font-semibold text-white">
                {ocorrencia.gravidade} / 5
              </p>
            </div>

            <div>
              <p className="text-sm text-[#00d65f] mb-1">Distrito</p>
              <p className="font-semibold text-white">
                {ocorrencia.distrito?.nomeDistrito || "Não informado"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#00d65f] mb-1">Zona</p>
              <p className="font-semibold text-white">
                {ocorrencia.distrito?.zona || "Não informada"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#00d65f] mb-1">Origem</p>
              <p className="font-semibold text-white">{ocorrencia.origem}</p>
            </div>

            <div>
              <p className="text-sm text-[#00d65f] mb-1">Data da ocorrência</p>
              <p className="font-semibold text-white">
                {formatarData(ocorrencia.dataOcorrencia)}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#00d65f] mb-1">Publicação</p>
              <p className="font-semibold text-white">
                {formatarData(ocorrencia.dataPublicacao)}
              </p>
            </div>
          </div>

          <div className="border-t border-[#29352d] mt-6 pt-5">
            <p className="text-sm text-[#00d65f] mb-2">Localização</p>

            <p className="font-semibold text-gray-200">
              Latitude: {ocorrencia.latitude}
            </p>

            <p className="font-semibold text-gray-200">
              Longitude: {ocorrencia.longitude}
            </p>
          </div>
        </section>

        {/* ÁREA DE COMENTÁRIOS */}

        <section className="bg-[#111713] border border-[#26342b] rounded-2xl shadow-xl p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Comentários</h2>

            <p className="text-gray-400 mt-1">
              Compartilhe sua opinião sobre esta ocorrência.
            </p>
          </div>

          {/* FORMULÁRIO */}

          <form onSubmit={handleEnviarComentario}>
            <textarea
              value={novoComentario}
              onChange={(event) => setNovoComentario(event.target.value)}
              placeholder="Escreva seu comentário..."
              maxLength={500}
              rows={4}
              disabled={publicando}
              className="w-full bg-[#080d0a] border border-[#344139] text-white placeholder-gray-500 rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-[#00d65f] focus:border-[#00d65f] transition disabled:opacity-50"
            />

            <div className="flex flex-wrap justify-between items-center gap-3 mt-3">
              <span className="text-sm text-gray-500">
                {novoComentario.length}/500 caracteres
              </span>

              <button
                type="submit"
                disabled={publicando || !novoComentario.trim()}
                className="bg-[#00c853] hover:bg-[#00e66b] text-black font-bold px-6 py-3 rounded-xl transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#00d65f]/10"
              >
                {publicando ? "Publicando..." : "Publicar comentário"}
              </button>
            </div>
          </form>

          {/* MENSAGENS */}

          {erro && <p className="mt-4 text-red-400 text-sm">{erro}</p>}

          {sucesso && (
            <p className="mt-4 text-[#00d65f] text-sm font-semibold">
              {sucesso}
            </p>
          )}

          {/* LISTA DE COMENTÁRIOS */}

          <div className="border-t border-[#29352d] mt-8 pt-6">
            <h3 className="font-bold text-lg text-white mb-5">
              Comentários publicados ({comentarios.length})
            </h3>

            {comentarios.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Ainda não existem comentários nesta ocorrência. Seja o primeiro
                a comentar!
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {comentarios.map((comentario) => (
                  <article
                    key={comentario.id}
                    className="bg-[#080d0a] border border-[#29352d] rounded-xl p-5 hover:border-[#00c853]/50 transition duration-200"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                      <h4 className="font-bold text-[#00d65f]">
                        {comentario.pessoa?.nome || "Usuário"}
                      </h4>

                      <span className="text-xs text-gray-500">
                        {formatarData(comentario.dataPublicacao)}
                      </span>
                    </div>

                    <p className="text-gray-300 whitespace-pre-wrap wrap-break-words leading-relaxed">
                      {comentario.descConteudo}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
