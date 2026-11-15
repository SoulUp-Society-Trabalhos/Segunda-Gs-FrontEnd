import { useEffect, useMemo, useState } from "react";
import { api } from "../../../service/api";

import type { DadosPessoa } from "../../../types/Pessoa";
import type { Noticia, RespostaNoticias } from "../../../types/Noticia";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Polygon,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// TYPE DO MAPA
type DadosGeoJSON = {
  type: string;
  features: {
    geometry: {
      type: string;
      coordinates: any;
    };
  }[];
};

// Retângulo gigante cobrindo o mundo
const MUNDO: [number, number][] = [
  [-85, -540],
  [-85, 540],
  [85, 540],
  [85, -540],
];

// Mapa de São Paulo
function MapaSP({ dados }: { dados: DadosGeoJSON }) {
  const mapa = useMap();

  const furos = useMemo(
    () =>
      dados.features.flatMap(({ geometry: g }) =>
        (g.type === "Polygon" ? [g.coordinates] : g.coordinates)
          .flat()
          .map((anel: number[][]) =>
            anel.map(([lng, lat]) => [lat, lng] as [number, number]),
          ),
      ),
    [dados],
  );

  useEffect(() => {
    const limites = L.geoJSON(dados as any).getBounds();

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
        data={dados as any}
        style={{ color: "#00c853", weight: 2, fillOpacity: 0 }}
        interactive={false}
      />
    </>
  );
}

export default function HomePage() {
  const [pessoa, setPessoa] = useState<DadosPessoa | null>(null);
  const [dadosMapa, setDadosMapa] = useState<DadosGeoJSON | null>(null);
  const [erro, setErro] = useState("");

  // ESTADOS DAS NOTÍCIAS
  const [abaAtiva, setAbaAtiva] = useState<"perfil" | "noticias">("perfil");
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [carregandoNoticias, setCarregandoNoticias] = useState(false);
  const [erroNoticias, setErroNoticias] = useState("");

  // Mapa: independe do login
  useEffect(() => {
    fetch("/geojson/municipio-sao-paulo-4326.geojson")
      .then((r) => {
        if (!r.ok) throw new Error(`Erro ${r.status}`);
        return r.json();
      })
      .then(setDadosMapa)
      .catch((e) => {
        console.error("Erro ao carregar o mapa:", e);
        setErro("Não foi possível carregar o mapa.");
      });
  }, []);

  // Usuário logado
  useEffect(() => {
    api("/auth/sessao")
      .then((r) => r.json())
      .then((id) => api(`/pessoas/${id}`))
      .then((r) => r.json())
      .then(setPessoa)
      .catch((e) => console.error("Erro ao carregar usuário:", e));
  }, []);

  // Buscar notícias no backend
  async function carregarNoticias() {
    try {
      setCarregandoNoticias(true);
      setErroNoticias("");

      const resposta = await api("/noticias/sao-paulo");
      const dados: RespostaNoticias = await resposta.json();

      setNoticias(dados.articles || []);
    } catch (e) {
      console.error("Erro ao carregar notícias:", e);
      setErroNoticias("Não foi possível carregar as notícias.");
    } finally {
      setCarregandoNoticias(false);
    }
  }

  useEffect(() => {
    carregarNoticias();
  }, []);

  return (
    <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
        {/* MAPA */}
        <section className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-3xl">
            <h1 className="font-nunito text-2xl font-bold mb-6">
              Explore São Paulo
            </h1>

            <div className="w-full h-[450px] md:h-[600px] relative overflow-hidden rounded-xl">
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
                </MapContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {erro || "Carregando mapa..."}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PAINEL LATERAL */}
        <aside className="w-full lg:w-80 xl:w-96 flex flex-col gap-5">
          {/* ABAS */}
          <div className="flex w-full border-b border-gray-800">
            <button
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
              onClick={() => setAbaAtiva("noticias")}
              className={`flex-1 py-3 font-nunito font-bold transition ${
                abaAtiva === "noticias"
                  ? "text-[#00c853] border-b-2 border-[#00c853]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Notícias
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

              <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-2">
                {noticias.map((noticia, index) => (
                  <article
                    key={`${noticia.url}-${index}`}
                    className="bg-[#151515] border border-gray-800 rounded-xl overflow-hidden"
                  >
                    {noticia.urlToImage && (
                      <img
                        src={noticia.urlToImage}
                        alt={noticia.title || "Imagem da notícia"}
                        className="w-full h-36 object-cover"
                        loading="lazy"
                      />
                    )}

                    <div className="p-4 flex flex-col gap-2">
                      <p className="text-[#00c853] text-xs font-bold">
                        {noticia.source?.name || "Notícia"}
                      </p>

                      <h3 className="font-nunito font-bold text-white">
                        {noticia.title || "Sem título"}
                      </h3>

                      {noticia.description && (
                        <p className="text-gray-400 text-sm">
                          {noticia.description}
                        </p>
                      )}

                      <p className="text-gray-500 text-xs">
                        {noticia.publishedAt
                          ? new Date(noticia.publishedAt).toLocaleString(
                              "pt-BR",
                            )
                          : "Data não disponível"}
                      </p>

                      <a
                        href={noticia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00c853] text-sm font-bold hover:underline mt-1"
                      >
                        Ler notícia →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
