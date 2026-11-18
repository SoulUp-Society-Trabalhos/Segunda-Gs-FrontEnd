
import { useState } from "react";
import type { FormEvent } from "react";

import type {
  CriarOcorrencia,
  OpcaoOcorrencia,
} from "../types/Ocorrencia";

// DADOS DA OCORRÊNCIA RETORNADA PELO BACKEND
export type OcorrenciaCriada = {
  id: number;
  nomeTitulo: string;
  descOcorrencia: string;
  gravidade: number;
  latitude: number;
  longitude: number;
  distrito: {
    id: number;
    nomeDistrito: string;
  };
  categoria: {
    id: number;
    nomeOcorrencia: string;
  };
  origem?: string;
  status?: string;
  dataOcorrencia?: string;
  pessoa?: {
    id: number;
  } | null;
};

// DADOS ADICIONAIS PARA EDIÇÃO
type OcorrenciaParaEdicao = OcorrenciaCriada & {
  origem?: string;
  status?: string;
  dataOcorrencia?: string;
  pessoa?: {
    id: number;
  } | null;
};

// PROPRIEDADES DO COMPONENTE
type FormularioOcorrenciaProps = {
  latitude: number;
  longitude: number;
  distritos: OpcaoOcorrencia[];
  categorias: OpcaoOcorrencia[];
  ocorrenciaEdicao?: OcorrenciaParaEdicao | null;
  onClose: () => void;
  onSucesso: (ocorrencia: OcorrenciaCriada) => void;
};

// DATA E HORÁRIO ATUAL
function dataHoraAtual() {
  const agora = new Date();
  const ajuste = agora.getTimezoneOffset() * 60000;

  return new Date(agora.getTime() - ajuste).toISOString().slice(0, 16);
}

// CONVERTER DATA DO BACKEND PARA O INPUT
function formatarData(data?: string) {
  if (!data) {
    return dataHoraAtual();
  }

  return data.slice(0, 16);
}

export default function FormularioOcorrencia({
  latitude,
  longitude,
  distritos,
  categorias,
  ocorrenciaEdicao,
  onClose,
  onSucesso,
}: FormularioOcorrenciaProps) {
  // PREENCHER OS CAMPOS COM OS DADOS EXISTENTES QUANDO FOR EDITAR
  const [titulo, setTitulo] = useState(
    () => ocorrenciaEdicao?.nomeTitulo ?? "",
  );

  const [descricao, setDescricao] = useState(
    () => ocorrenciaEdicao?.descOcorrencia ?? "",
  );

  const [gravidade, setGravidade] = useState(
    () => String(ocorrenciaEdicao?.gravidade ?? 1),
  );

  const [dataOcorrencia, setDataOcorrencia] = useState(
    () => formatarData(ocorrenciaEdicao?.dataOcorrencia),
  );

  const [distrito, setDistrito] = useState(
    () => String(ocorrenciaEdicao?.distrito.id ?? ""),
  );

  const [categoria, setCategoria] = useState(
    () => String(ocorrenciaEdicao?.categoria.id ?? ""),
  );

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // GUARDA A OCORRÊNCIA SALVA
  const [ocorrenciaSalva, setOcorrenciaSalva] =
    useState<OcorrenciaCriada | null>(null);

  // VERIFICA SE ESTÁ EDITANDO
  const estaEditando = ocorrenciaEdicao != null;

  // CADASTRAR OU EDITAR OCORRÊNCIA
  async function salvarOcorrencia(
    evento: FormEvent<HTMLFormElement>,
  ) {
    evento.preventDefault();

    try {
      setCarregando(true);
      setErro("");

      // OBJETO COM OS DADOS DO FORMULÁRIO
      const dados: CriarOcorrencia = {
        nomeTitulo: titulo,
        descOcorrencia: descricao,
        gravidade: Number(gravidade),
        latitude,
        longitude,
        dataOcorrencia,
        distrito: {
          id: Number(distrito),
        },
        categoria: {
          id: Number(categoria),
        },
      };

      let resposta: Response;

      if (estaEditando) {
        // REQUISIÇÃO PARA ATUALIZAR A OCORRÊNCIA
        const dadosAtualizacao = {
          ...dados,
          origem: ocorrenciaEdicao.origem || "CIDADAO",
          status: ocorrenciaEdicao.status || "ATIVA",
          pessoa: ocorrenciaEdicao.pessoa
            ? { id: ocorrenciaEdicao.pessoa.id }
            : undefined,
        };

        resposta = await fetch(
          `/api/ocorrencias/${ocorrenciaEdicao.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosAtualizacao),
          },
        );
      } else {
        // REQUISIÇÃO PARA CADASTRAR A OCORRÊNCIA
        resposta = await fetch("/api/ocorrencias", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        });
      }

      // VERIFICAR RESPOSTA DO BACKEND
      if (!resposta.ok) {
        const mensagem = await resposta.text();

        throw new Error(
          mensagem ||
            `Erro ao salvar ocorrência: ${resposta.status}`,
        );
      }

      // LER A RESPOSTA DO BACKEND
      const textoResposta = await resposta.text();

      let dadosResposta: Partial<OcorrenciaCriada> = {};

      if (textoResposta.trim()) {
        dadosResposta = JSON.parse(textoResposta);
      }

      // LOCALIZAR NOMES DO DISTRITO E DA CATEGORIA
      const distritoSelecionado = distritos.find(
        (item) => item.id === Number(distrito),
      );

      const categoriaSelecionada = categorias.find(
        (item) => item.id === Number(categoria),
      );

      // MONTAR OBJETO ATUALIZADO
      const ocorrencia: OcorrenciaCriada = {
        ...(ocorrenciaEdicao ?? {}),
        ...dadosResposta,
        id: dadosResposta.id ?? ocorrenciaEdicao?.id ?? 0,
        nomeTitulo: titulo,
        descOcorrencia: descricao,
        gravidade: Number(gravidade),
        latitude,
        longitude,
        distrito: {
          id: Number(distrito),
          nomeDistrito:
            dadosResposta.distrito?.nomeDistrito ??
            distritoSelecionado?.nome ??
            ocorrenciaEdicao?.distrito.nomeDistrito ??
            "",
        },
        categoria: {
          id: Number(categoria),
          nomeOcorrencia:
            dadosResposta.categoria?.nomeOcorrencia ??
            categoriaSelecionada?.nome ??
            ocorrenciaEdicao?.categoria.nomeOcorrencia ??
            "",
        },
        origem: ocorrenciaEdicao?.origem ?? "CIDADAO",
        status: ocorrenciaEdicao?.status ?? "ATIVA",
        dataOcorrencia,
        pessoa: ocorrenciaEdicao?.pessoa ?? null,
      };

      // ABRIR MODAL DE SUCESSO
      setOcorrenciaSalva(ocorrencia);
    } catch (e) {
      console.error("Erro ao salvar ocorrência:", e);

      setErro(
        e instanceof Error
          ? e.message
          : "Não foi possível salvar a ocorrência.",
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-100000 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#151515] border border-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        {ocorrenciaSalva ? (
          // MODAL DE SUCESSO
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-20 h-20 rounded-full bg-[#00c853]/20 flex items-center justify-center mb-5">
              <span className="text-[#00c853] text-5xl">✓</span>
            </div>

            <h2 className="text-2xl font-bold font-nunito text-white mb-3">
              {estaEditando
                ? "Ocorrência atualizada!"
                : "Ocorrência cadastrada!"}
            </h2>

            <p className="text-gray-400 mb-2">
              {estaEditando
                ? "Sua ocorrência foi atualizada com sucesso."
                : "Sua ocorrência foi registrada com sucesso."}
            </p>

            <p className="text-gray-400 text-sm mb-8">
              Ela já pode ser visualizada no mapa.
            </p>

            <button
              type="button"
              onClick={() => {
                onSucesso(ocorrenciaSalva);
                onClose();
              }}
              className="w-full py-3 rounded-lg bg-[#00c853] text-black font-bold hover:bg-green-400 transition"
            >
              Voltar ao mapa
            </button>
          </div>
        ) : (
          <>
            {/* CABEÇALHO */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold font-nunito text-white">
                  {estaEditando
                    ? "Editar ocorrência"
                    : "Registrar ocorrência"}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {estaEditando
                    ? "Altere os dados da sua ocorrência."
                    : "Preencha os dados do problema encontrado."}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={carregando}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={salvarOcorrencia}
              className="flex flex-col gap-4"
            >
              {/* TÍTULO */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Título
                </label>

                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  minLength={3}
                  maxLength={150}
                  required
                  placeholder="Ex.: Buraco na rua"
                  className="w-full bg-[#080808] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#00c853]"
                />
              </div>

              {/* DESCRIÇÃO */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Descrição
                </label>

                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  maxLength={1000}
                  required
                  rows={4}
                  placeholder="Descreva o problema encontrado..."
                  className="w-full bg-[#080808] border border-gray-700 rounded-lg p-3 text-white outline-none resize-none focus:border-[#00c853]"
                />
              </div>

              {/* GRAVIDADE */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Gravidade
                </label>

                <select
                  value={gravidade}
                  onChange={(e) => setGravidade(e.target.value)}
                  required
                  className="w-full bg-[#080808] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#00c853]"
                >
                  <option value="1">1 - Muito baixa</option>
                  <option value="2">2 - Baixa</option>
                  <option value="3">3 - Média</option>
                  <option value="4">4 - Alta</option>
                  <option value="5">5 - Muito alta</option>
                </select>
              </div>

              {/* DATA DA OCORRÊNCIA */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Data e horário da ocorrência
                </label>

                <input
                  type="datetime-local"
                  value={dataOcorrencia}
                  onChange={(e) => setDataOcorrencia(e.target.value)}
                  max={dataHoraAtual()}
                  required
                  className="w-full bg-[#080808] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#00c853]"
                />
              </div>

              {/* DISTRITO */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Distrito
                </label>

                <select
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  required
                  className="w-full bg-[#080808] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#00c853]"
                >
                  <option value="">Selecione um distrito</option>

                  {distritos.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* CATEGORIA */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Categoria
                </label>

                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                  className="w-full bg-[#080808] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#00c853]"
                >
                  <option value="">Selecione uma categoria</option>

                  {categorias.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* COORDENADAS */}
              <div className="bg-[#080808] border border-gray-800 rounded-lg p-3">
                <p className="text-[#00c853] font-bold text-sm mb-2">
                  Localização selecionada
                </p>

                <p className="text-gray-300 text-sm">
                  Latitude: {latitude.toFixed(6)}
                </p>

                <p className="text-gray-300 text-sm">
                  Longitude: {longitude.toFixed(6)}
                </p>
              </div>

              {/* ERRO */}
              {erro && (
                <p className="text-red-400 text-sm">{erro}</p>
              )}

              {/* BOTÕES */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={carregando}
                  className="flex-1 py-3 rounded-lg border border-gray-600 text-white font-bold hover:bg-gray-800 transition disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={carregando}
                  className="flex-1 py-3 rounded-lg bg-[#00c853] text-black font-bold hover:bg-green-400 transition disabled:opacity-50"
                >
                  {carregando
                    ? estaEditando
                      ? "Salvando..."
                      : "Cadastrando..."
                    : estaEditando
                      ? "Salvar alterações"
                      : "Cadastrar ocorrência"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
