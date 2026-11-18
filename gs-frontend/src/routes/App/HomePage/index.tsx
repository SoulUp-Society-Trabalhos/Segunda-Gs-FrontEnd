import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { buscarPessoaLogada } from "../../../service/UsuarioService";
import { buscarNoticias } from "../../../service/NoticiaService";
import { buscarDistritos } from "../../../service/DistritoService";
import { buscarCategorias } from "../../../service/CategoriaOcorrenciaService";

import ModalSucesso from "../../../components/ModalSucesso";
import FormularioOcorrencia from "../../../components/FormularioOcorrencia";
import type { OcorrenciaCriada } from "../../../components/FormularioOcorrencia";

import type { DadosPessoa } from "../../../types/Pessoa";
import type { Noticia } from "../../../types/Noticia";
import type { DadosGeoJSON } from "../../../types/Mapa";
import type {
  Distrito,
  CategoriaOcorrencia,
  OpcaoOcorrencia,
} from "../../../types/Ocorrencia";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Polygon,
  useMap,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

// Dados adicionais da ocorrência retornados pelo backend.
type OcorrenciaComProprietario = OcorrenciaCriada & {
  origem?: string;
  status?: string;
  dataOcorrencia?: string;
  pessoa?: {
    id: number;
  } | null;
};

// Retângulo cobrindo o mundo.
const MUNDO: LatLngTuple[] = [
  [-85, -540],
  [-85, 540],
  [85, 540],
  [85, -540],
];

// Capturar clique no mapa.
function CapturarCliqueMapa({
  onSelecionar,
}: {
  onSelecionar: (latitude: number, longitude: number) => void;
}) {
  useMapEvents({
    click(evento) {
      onSelecionar(evento.latlng.lat, evento.latlng.lng);
    },
  });

  return null;
}

// Mapa de São Paulo.
function MapaSP({ dados }: { dados: DadosGeoJSON }) {
  const mapa = useMap();

  const furos = useMemo(() => {
    return dados.features.flatMap((feature) => {
      const geometria = feature.geometry;

      if (geometria.type === "Polygon") {
        return geometria.coordinates.map((anel) =>
          anel.map(
            ([longitude, latitude]) => [latitude, longitude] as LatLngTuple,
          ),
        );
      }

      return geometria.coordinates.flatMap((poligono) =>
        poligono.map((anel) =>
          anel.map(
            ([longitude, latitude]) => [latitude, longitude] as LatLngTuple,
          ),
        ),
      );
    });
  }, [dados]);

  useEffect(() => {
    const limites = L.geoJSON(dados).getBounds();

    if (!limites.isValid()) {
      return;
    }

    mapa
      .fitBounds(limites, { padding: [30, 30] })
      .setMaxBounds(limites.pad(0.4))
      .setMinZoom(mapa.getZoom() - 1);
  }, [dados, mapa]);

  return (
    <>
      <Polygon
        positions={[MUNDO, ...furos]}
        pathOptions={{
          stroke: false,
          fillColor: "#080808",
          fillOpacity: 0.8,
          interactive: false,
        }}
      />

      <GeoJSON
        data={dados}
        style={{
          color: "#00c853",
          weight: 2,
          fillOpacity: 0,
        }}
        interactive={false}
      />
    </>
  );
}

type AbaAtiva = "perfil" | "noticias" | "ocorrencias";

export default function HomePage() {
  const navigate = useNavigate();

  const [pessoa, setPessoa] = useState<DadosPessoa | null>(null);

  const [dadosMapa, setDadosMapa] = useState<DadosGeoJSON | null>(null);
  const [erro, setErro] = useState("");

  const [saindo, setSaindo] = useState(false);
  const [erroLogout, setErroLogout] = useState("");

  // Abas do painel.
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>("perfil");

  // Notícias.
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [carregandoNoticias, setCarregandoNoticias] = useState(true);
  const [erroNoticias, setErroNoticias] = useState("");

  // Ocorrências.
  const [ocorrencias, setOcorrencias] = useState<OcorrenciaComProprietario[]>(
    [],
  );
  const [carregandoOcorrencias, setCarregandoOcorrencias] = useState(true);
  const [erroOcorrencias, setErroOcorrencias] = useState("");

  // Modal de confirmação da exclusão.
  const [ocorrenciaParaExcluir, setOcorrenciaParaExcluir] = useState<
    number | null
  >(null);

  // Controle da requisição de exclusão.
  const [excluindo, setExcluindo] = useState(false);

  // Modal de sucesso da exclusão.
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);

  // Localização selecionada no mapa.
  const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Formulário.
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [carregandoOpcoes, setCarregandoOpcoes] = useState(false);
  const [erroFormulario, setErroFormulario] = useState("");

  const [distritos, setDistritos] = useState<OpcaoOcorrencia[]>([]);
  const [categorias, setCategorias] = useState<OpcaoOcorrencia[]>([]);

  // Ocorrência selecionada para edição.
  const [ocorrenciaEmEdicao, setOcorrenciaEmEdicao] =
    useState<OcorrenciaComProprietario | null>(null);

  // Carregar o mapa.
  useEffect(() => {
    let ativo = true;

    fetch("/geojson/municipio-sao-paulo-4326.geojson")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error(`Erro ${resposta.status}`);
        }

        return resposta.json() as Promise<DadosGeoJSON>;
      })
      .then((dados) => {
        if (ativo) {
          setDadosMapa(dados);
        }
      })
      .catch((erroMapa: unknown) => {
        console.error("Erro ao carregar o mapa:", erroMapa);

        if (ativo) {
          setErro("Não foi possível carregar o mapa.");
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  // Buscar todas as ocorrências.
  useEffect(() => {
    let ativo = true;

    async function carregarOcorrencias() {
      try {
        setCarregandoOcorrencias(true);
        setErroOcorrencias("");

        const resposta = await fetch("/api/ocorrencias", {
          credentials: "include",
        });

        if (!resposta.ok) {
          throw new Error("Não foi possível buscar as ocorrências.");
        }

        const dados: OcorrenciaComProprietario[] = await resposta.json();

        if (ativo) {
          setOcorrencias(dados);
        }
      } catch (erroBusca) {
        console.error("Erro ao carregar ocorrências:", erroBusca);

        if (ativo) {
          setErroOcorrencias("Não foi possível carregar as ocorrências.");
        }
      } finally {
        if (ativo) {
          setCarregandoOcorrencias(false);
        }
      }
    }

    carregarOcorrencias();

    return () => {
      ativo = false;
    };
  }, []);

  // Buscar pessoa logada.
  useEffect(() => {
    let ativo = true;

    buscarPessoaLogada()
      .then((dados) => {
        if (ativo) {
          setPessoa(dados);
        }
      })
      .catch((erroPessoa) => {
        console.error("Erro ao carregar usuário:", erroPessoa);
      });

    return () => {
      ativo = false;
    };
  }, []);

  // Buscar notícias.
  useEffect(() => {
    let ativo = true;

    buscarNoticias()
      .then((dados) => {
        if (ativo) {
          setNoticias(dados);
        }
      })
      .catch((erroBusca) => {
        console.error("Erro ao carregar notícias:", erroBusca);

        if (ativo) {
          setErroNoticias("Não foi possível carregar as notícias.");
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregandoNoticias(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  // Atualizar notícias.
  async function carregarNoticias() {
    try {
      setCarregandoNoticias(true);
      setErroNoticias("");

      const dados = await buscarNoticias();

      setNoticias(dados);
    } catch (erroBusca) {
      console.error("Erro ao carregar notícias:", erroBusca);
      setErroNoticias("Não foi possível carregar as notícias.");
    } finally {
      setCarregandoNoticias(false);
    }
  }

  // Carregar as opções de distrito e categoria.
  async function carregarOpcoesFormulario() {
    const [dadosDistritos, dadosCategorias] = await Promise.all([
      buscarDistritos(),
      buscarCategorias(),
    ]);

    const distritosFormatados: OpcaoOcorrencia[] = (
      dadosDistritos as Distrito[]
    ).map((distrito) => ({
      id: distrito.id,
      nome: distrito.nomeDistrito,
    }));

    const categoriasFormatadas: OpcaoOcorrencia[] = (
      dadosCategorias as CategoriaOcorrencia[]
    ).map((categoria) => ({
      id: categoria.id,
      nome: categoria.nomeOcorrencia,
    }));

    setDistritos(distritosFormatados);
    setCategorias(categoriasFormatadas);
  }

  // Abrir formulário para cadastrar.
  async function abrirFormulario() {
    if (!localizacaoSelecionada) {
      setErroFormulario("Clique primeiro em um ponto do mapa.");
      return;
    }

    try {
      setCarregandoOpcoes(true);
      setErroFormulario("");
      setOcorrenciaEmEdicao(null);

      await carregarOpcoesFormulario();

      setFormularioAberto(true);
    } catch (erroBusca) {
      console.error("Erro ao carregar opções:", erroBusca);

      setErroFormulario(
        "Não foi possível carregar os distritos e as categorias.",
      );
    } finally {
      setCarregandoOpcoes(false);
    }
  }

  // Abrir formulário para editar.
  async function abrirEdicao(ocorrencia: OcorrenciaComProprietario) {
    try {
      setCarregandoOpcoes(true);
      setErroOcorrencias("");

      await carregarOpcoesFormulario();

      setLocalizacaoSelecionada(null);
      setOcorrenciaEmEdicao(ocorrencia);
      setFormularioAberto(true);
    } catch (erroBusca) {
      console.error("Erro ao carregar opções:", erroBusca);

      setErroOcorrencias("Não foi possível abrir a edição da ocorrência.");
    } finally {
      setCarregandoOpcoes(false);
    }
  }

  // Fechar o formulário.
  function fecharFormulario() {
    setFormularioAberto(false);
    setOcorrenciaEmEdicao(null);
    setLocalizacaoSelecionada(null);
  }

  // Adicionar ou atualizar ocorrência na lista.
  function salvarNaLista(ocorrencia: OcorrenciaCriada) {
    if (ocorrenciaEmEdicao) {
      setOcorrencias((anteriores) =>
        anteriores.map((item) =>
          item.id === ocorrencia.id
            ? {
                ...item,
                ...ocorrencia,
                origem: "CIDADAO",
                pessoa: item.pessoa,
              }
            : item,
        ),
      );
    } else {
      setOcorrencias((anteriores) => [
        ...anteriores,
        {
          ...ocorrencia,
          origem: "CIDADAO",
          pessoa: pessoa?.id ? { id: pessoa.id } : null,
        },
      ]);
    }

    setFormularioAberto(false);
    setOcorrenciaEmEdicao(null);
    setLocalizacaoSelecionada(null);
  }

  // Abrir modal de confirmação da exclusão.
  function abrirConfirmacaoExclusao(id: number) {
    setErroOcorrencias("");
    setOcorrenciaParaExcluir(id);
  }

  // Cancelar exclusão.
  function cancelarExclusao() {
    if (excluindo) {
      return;
    }

    setOcorrenciaParaExcluir(null);
  }

  // Confirmar e excluir a ocorrência.
  async function confirmarExclusao() {
    if (ocorrenciaParaExcluir === null) {
      return;
    }

    try {
      setExcluindo(true);
      setErroOcorrencias("");

      const resposta = await fetch(
        `/api/ocorrencias/${ocorrenciaParaExcluir}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!resposta.ok) {
        const mensagem = await resposta.text();

        throw new Error(mensagem || "Não foi possível excluir a ocorrência.");
      }

      // Remove a ocorrência da lista e do mapa.
      setOcorrencias((anteriores) =>
        anteriores.filter(
          (ocorrencia) => ocorrencia.id !== ocorrenciaParaExcluir,
        ),
      );

      // Fecha o modal de confirmação.
      setOcorrenciaParaExcluir(null);

      // Abre o modal de sucesso.
      setModalExclusaoAberto(true);
    } catch (erroExcluir) {
      console.error("Erro ao excluir ocorrência:", erroExcluir);

      setErroOcorrencias(
        erroExcluir instanceof Error
          ? erroExcluir.message
          : "Não foi possível excluir a ocorrência.",
      );

      setOcorrenciaParaExcluir(null);
    } finally {
      setExcluindo(false);
    }
  }

  // Selecionar somente ocorrências da pessoa logada.
  const minhasOcorrencias = ocorrencias.filter(
    (ocorrencia) =>
      ocorrencia.origem === "CIDADAO" &&
      pessoa?.id != null &&
      ocorrencia.pessoa?.id === pessoa.id,
  );

  // Abrir a página individual da ocorrência.
  function abrirOcorrencia(id: number) {
    navigate(`/app/ocorrencias/${id}`);
  }
  // Logout.
  async function fazerLogout() {
    try {
      setSaindo(true);
      setErroLogout("");

      const resposta = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao realizar logout.");
      }

      navigate("/app/login", { replace: true });
    } catch (erroLogout) {
      console.error("Erro ao sair:", erroLogout);

      setErroLogout("Não foi possível encerrar a sessão.");
      setSaindo(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
        {/* MAPA */}
        <section className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-3xl">
            <h1 className="font-nunito text-2xl font-bold mb-6">
              Explore São Paulo
            </h1>

            <p className="text-gray-400 text-sm mb-3">
              Clique em um ponto do mapa para selecionar o local de uma
              ocorrência.
            </p>

            <div className="w-full h-112.5 md:h-150 relative overflow-hidden rounded-xl">
              {dadosMapa ? (
                <MapContainer
                  center={[-23.5505, -46.6333]}
                  zoom={11}
                  zoomControl={false}
                  maxBoundsViscosity={1.0}
                  className="w-full h-full bg-[#080808]"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="invert hue-rotate-180 brightness-90 contrast-90"
                  />

                  <MapaSP dados={dadosMapa} />

                  {/* MARCADORES DE TODAS AS OCORRÊNCIAS */}
                  {ocorrencias.map((ocorrencia) => (
                    <Marker
                      key={ocorrencia.id}
                      position={[ocorrencia.latitude, ocorrencia.longitude]}
                      eventHandlers={{
                        click: () => abrirOcorrencia(ocorrencia.id),
                      }}
                    >
                      <Popup>
                        <div className="min-w-40">
                          <h3 className="font-bold text-base mb-2">
                            {ocorrencia.nomeTitulo}
                          </h3>

                          <p className="mb-2">{ocorrencia.descOcorrencia}</p>

                          <p>
                            <strong>Gravidade:</strong> {ocorrencia.gravidade}/5
                          </p>

                          <p>
                            <strong>Distrito:</strong>{" "}
                            {ocorrencia.distrito?.nomeDistrito ||
                              "Não informado"}
                          </p>

                          <p>
                            <strong>Categoria:</strong>{" "}
                            {ocorrencia.categoria?.nomeOcorrencia ||
                              "Não informada"}
                          </p>

                          <button
                            type="button"
                            onClick={() => abrirOcorrencia(ocorrencia.id)}
                            className="mt-3 w-full bg-[#00c853] text-black font-bold rounded-lg py-2"
                          >
                            Ver ocorrência
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  <CapturarCliqueMapa
                    onSelecionar={(latitude, longitude) => {
                      setLocalizacaoSelecionada({
                        latitude,
                        longitude,
                      });

                      setErroFormulario("");
                    }}
                  />
                </MapContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {erro || "Carregando mapa..."}
                </div>
              )}
            </div>

            {/* LOCALIZAÇÃO SELECIONADA */}
            {localizacaoSelecionada && (
              <div className="mt-4 bg-[#151515] border border-gray-800 rounded-xl p-4">
                <p className="text-[#00c853] font-bold font-nunito mb-2">
                  Local selecionado
                </p>

                <p className="text-gray-300 text-sm">
                  Latitude: {localizacaoSelecionada.latitude.toFixed(6)}
                </p>

                <p className="text-gray-300 text-sm">
                  Longitude: {localizacaoSelecionada.longitude.toFixed(6)}
                </p>
              </div>
            )}

            {/* BOTÃO DE REGISTRO */}
            <button
              type="button"
              onClick={abrirFormulario}
              disabled={!localizacaoSelecionada || carregandoOpcoes}
              className="w-full mt-4 px-5 py-3 rounded-lg bg-[#00c853] text-black font-nunito font-bold hover:bg-green-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {carregandoOpcoes ? "Carregando..." : "Registrar ocorrência"}
            </button>

            {!localizacaoSelecionada && (
              <p className="text-gray-500 text-xs mt-2 text-center">
                Selecione um ponto no mapa antes de registrar.
              </p>
            )}

            {erroFormulario && (
              <p className="text-red-400 text-sm mt-3">{erroFormulario}</p>
            )}
          </div>
        </section>

        {/* PAINEL LATERAL */}
        <aside className="w-full lg:w-80 xl:w-96 flex flex-col gap-5">
          {/* LOGOUT */}
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              onClick={fazerLogout}
              disabled={saindo}
              className="px-5 py-2 rounded-lg border border-red-500 text-red-400 font-nunito font-bold hover:bg-red-500 hover:text-white transition disabled:opacity-50"
            >
              {saindo ? "Saindo..." : "Sair"}
            </button>

            {erroLogout && <p className="text-red-400 text-sm">{erroLogout}</p>}
          </div>

          {/* ABAS */}
          <div className="flex w-full border-b border-gray-800">
            <button
              type="button"
              onClick={() => setAbaAtiva("perfil")}
              className={`flex-1 py-3 font-nunito font-bold transition ${
                abaAtiva === "perfil"
                  ? "text-[#00c853] border-b-2 border-[#00c853]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Meu perfil
            </button>

            <button
              type="button"
              onClick={() => setAbaAtiva("noticias")}
              className={`flex-1 py-3 font-nunito font-bold transition ${
                abaAtiva === "noticias"
                  ? "text-[#00c853] border-b-2 border-[#00c853]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Notícias
            </button>

            <button
              type="button"
              onClick={() => setAbaAtiva("ocorrencias")}
              className={`flex-1 py-3 font-nunito font-bold transition ${
                abaAtiva === "ocorrencias"
                  ? "text-[#00c853] border-b-2 border-[#00c853]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Minhas ocorrências
            </button>
          </div>

          {/* ABA PERFIL */}
          {abaAtiva === "perfil" && (
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#00c853] flex items-center justify-center">
                <span className="text-black text-2xl font-bold">
                  {pessoa?.nome?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>

              <div>
                <p className="text-gray-400 font-nunito text-sm">
                  Bem-vindo(a),
                </p>

                <h2 className="text-2xl font-bold font-nunito">
                  {pessoa?.nome || "Carregando..."}
                </h2>
              </div>

              <div className="w-full h-px bg-gray-800 my-2" />

              <p className="text-gray-400 font-nunito text-sm">
                Explore o município de São Paulo.
              </p>

              {erro && <p className="text-red-400 text-sm">{erro}</p>}
            </div>
          )}

          {/* ABA NOTÍCIAS */}
          {abaAtiva === "noticias" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold font-nunito">
                  Notícias de São Paulo
                </h2>

                <button
                  type="button"
                  onClick={carregarNoticias}
                  disabled={carregandoNoticias}
                  className="text-[#00c853] text-sm font-bold hover:text-green-400 disabled:opacity-50"
                >
                  Atualizar
                </button>
              </div>

              {carregandoNoticias && (
                <p className="text-gray-400 text-sm">Carregando notícias...</p>
              )}

              {erroNoticias && (
                <p className="text-red-400 text-sm">{erroNoticias}</p>
              )}

              {!carregandoNoticias &&
                noticias.length === 0 &&
                !erroNoticias && (
                  <p className="text-gray-400 text-sm">
                    Nenhuma notícia encontrada.
                  </p>
                )}

              <div className="flex flex-col gap-3 max-h-130 overflow-y-auto pr-2">
                {noticias.map((noticia, index) => (
                  <article
                    key={`${noticia.url}-${index}`}
                    className="flex gap-3 bg-[#151515] border border-gray-800 rounded-xl p-3 hover:border-[#00c853]/50 transition"
                  >
                    {noticia.urlToImage ? (
                      <img
                        src={noticia.urlToImage}
                        alt=""
                        className="w-24 h-24 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-24 h-24 shrink-0 rounded-lg bg-[#252525] flex items-center justify-center">
                        <span className="text-gray-500 text-xs text-center">
                          Sem imagem
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col flex-1 min-w-0 gap-1">
                      <p className="text-[#00c853] text-xs font-bold truncate">
                        {noticia.source?.name || "Notícia"}
                      </p>

                      <h3 className="font-nunito font-bold text-white text-sm line-clamp-2">
                        {noticia.title || "Sem título"}
                      </h3>

                      <p className="text-gray-400 text-xs line-clamp-2">
                        {noticia.description || "Descrição não disponível."}
                      </p>

                      <a
                        href={noticia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00c853] text-xs font-bold hover:underline mt-auto"
                      >
                        Ler notícia →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ABA MINHAS OCORRÊNCIAS */}
          {abaAtiva === "ocorrencias" && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold font-nunito">
                  Minhas ocorrências
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Gerencie as ocorrências que você cadastrou.
                </p>
              </div>

              {carregandoOcorrencias && (
                <p className="text-gray-400 text-sm">
                  Carregando ocorrências...
                </p>
              )}

              {erroOcorrencias && (
                <p className="text-red-400 text-sm">{erroOcorrencias}</p>
              )}

              {!carregandoOcorrencias && minhasOcorrencias.length === 0 && (
                <div className="bg-[#151515] border border-gray-800 rounded-xl p-5 text-center">
                  <p className="text-gray-300 font-bold">
                    Você ainda não cadastrou ocorrências.
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    Selecione um local no mapa e registre sua primeira
                    ocorrência.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 max-h-162.5 overflow-y-auto pr-2">
                {minhasOcorrencias.map((ocorrencia) => (
                  <article
                    key={ocorrencia.id}
                    className="bg-[#151515] border border-gray-800 rounded-xl p-4 flex flex-col gap-3"
                  >
                    <div>
                      <h3 className="font-nunito font-bold text-white">
                        {ocorrencia.nomeTitulo}
                      </h3>

                      <p className="text-gray-400 text-sm mt-2 wrap-break-words">
                        {ocorrencia.descOcorrencia}
                      </p>
                    </div>

                    <div className="text-gray-400 text-xs flex flex-col gap-1">
                      <p>
                        <strong className="text-gray-300">Gravidade:</strong>{" "}
                        {ocorrencia.gravidade}/5
                      </p>

                      <p>
                        <strong className="text-gray-300">Distrito:</strong>{" "}
                        {ocorrencia.distrito?.nomeDistrito || "Não informado"}
                      </p>

                      <p>
                        <strong className="text-gray-300">Categoria:</strong>{" "}
                        {ocorrencia.categoria?.nomeOcorrencia ||
                          "Não informada"}
                      </p>

                      <p>
                        <strong className="text-gray-300">Status:</strong>{" "}
                        {ocorrencia.status || "Não informado"}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-gray-800">
                      <button
                        type="button"
                        onClick={() => abrirEdicao(ocorrencia)}
                        disabled={carregandoOpcoes}
                        className="flex-1 py-2 rounded-lg bg-[#00c853] text-black font-bold text-sm hover:bg-green-400 transition disabled:opacity-50"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => abrirConfirmacaoExclusao(ocorrencia.id)}
                        className="flex-1 py-2 rounded-lg border border-red-500 text-red-400 font-bold text-sm hover:bg-red-500 hover:text-white transition"
                      >
                        Excluir
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* FORMULÁRIO DE CADASTRO OU EDIÇÃO */}
      {formularioAberto && (localizacaoSelecionada || ocorrenciaEmEdicao) && (
        <div className="fixed inset-0 z-1000 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-auto">
            <FormularioOcorrencia
              key={ocorrenciaEmEdicao?.id ?? "novo"}
              latitude={
                ocorrenciaEmEdicao?.latitude ??
                localizacaoSelecionada?.latitude ??
                0
              }
              longitude={
                ocorrenciaEmEdicao?.longitude ??
                localizacaoSelecionada?.longitude ??
                0
              }
              distritos={distritos}
              categorias={categorias}
              ocorrenciaEdicao={ocorrenciaEmEdicao}
              onClose={fecharFormulario}
              onSucesso={salvarNaLista}
            />
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DA EXCLUSÃO */}
      {ocorrenciaParaExcluir !== null && (
        <div className="fixed inset-0 z-10000 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#151515] border border-gray-700 rounded-2xl p-6 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-3xl">!</span>
            </div>

            <h2 className="text-white text-xl font-bold font-nunito text-center">
              Excluir ocorrência?
            </h2>

            <p className="text-gray-400 text-sm text-center mt-3">
              Tem certeza de que deseja excluir esta ocorrência? Essa ação não
              poderá ser desfeita.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={cancelarExclusao}
                disabled={excluindo}
                className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300 font-bold hover:bg-gray-800 transition disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarExclusao}
                disabled={excluindo}
                className="flex-1 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition disabled:opacity-50"
              >
                {excluindo ? "Excluindo..." : "Sim, excluir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE SUCESSO DA EXCLUSÃO */}
      <ModalSucesso
        aberto={modalExclusaoAberto}
        titulo="Ocorrência excluída!"
        mensagem="A ocorrência foi excluída com sucesso."
        textoBotao="Continuar"
        onConfirmar={() => setModalExclusaoAberto(false)}
      />
    </main>
  );
}
