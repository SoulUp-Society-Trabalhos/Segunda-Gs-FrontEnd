import { useEffect, useMemo, useState } from "react";
import { api } from "../../../service/api";

import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Polygon,
    Pane,
    useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

type DadosPessoa = {
    id: number;
    nome: string;
};

type DadosGeoJSON = {
    type: string;
    features: {
        geometry: {
            type: string;
            coordinates: any;
        };
    }[];
};

// Ajusta o zoom para mostrar o município inteiro e limita a navegação.
function AjustarMapa({ dados }: { dados: DadosGeoJSON }) {
    const mapa = useMap();

    useEffect(() => {
        const camada = L.geoJSON(dados as any);
        const limites = camada.getBounds();

        mapa.invalidateSize();

        mapa.fitBounds(limites, {
            padding: [30, 30],
        });

        // Impede o usuário de se perder pelo resto do Brasil.
        mapa.setMaxBounds(limites.pad(0.4));
        mapa.setMinZoom(Math.max(mapa.getZoom() - 1, 0));
    }, [dados, mapa]);

    return null;
}

// Máscara DENTRO do mapa: um polígono "mundo inteiro" com um buraco no formato
// do município. Como é uma camada do próprio Leaflet, acompanha zoom e
// arrasto sozinha (sem recalcular nada, sem overlay por cima).
function MascaraMunicipio({ dados }: { dados: DadosGeoJSON }) {
    const furos = useMemo(() => {
        const aneis: [number, number][][] = [];

        dados.features.forEach((feature) => {
            const geometria = feature.geometry;

            let poligonos: any[] = [];

            if (geometria.type === "Polygon") {
                poligonos = [geometria.coordinates];
            }

            if (geometria.type === "MultiPolygon") {
                poligonos = geometria.coordinates;
            }

            poligonos.forEach((poligono) => {
                poligono.forEach((anel: any) => {
                    // GeoJSON é [lng, lat]; o Leaflet usa [lat, lng]
                    aneis.push(
                        anel.map(([lng, lat]: number[]) => [lat, lng])
                    );
                });
            });
        });

        return aneis;
    }, [dados]);

    // Retângulo gigante cobrindo o mundo (inclusive ao arrastar pros lados)
    const mundo: [number, number][] = [
        [-85, -540],
        [-85, 540],
        [85, 540],
        [85, -540],
    ];

    return (
        <>
            <Pane name="mascara" style={{ zIndex: 450 }}>
                <Polygon
                    positions={[mundo, ...furos]}
                    pathOptions={{
                        pane: "mascara",
                        stroke: false,
                        fillColor: "#080808",
                        fillOpacity: 0.8,
                        fillRule: "evenodd",
                        interactive: false,
                    }}
                />
            </Pane>

            <Pane name="contorno" style={{ zIndex: 460 }}>
                <GeoJSON
                    data={dados as any}
                    pane="contorno"
                    style={{
                        color: "#00c853",
                        weight: 2,
                        fillOpacity: 0,
                    }}
                    interactive={false}
                />
            </Pane>
        </>
    );
}

export default function HomePage() {
    const [pessoa, setPessoa] = useState<DadosPessoa | null>(null);
    const [dadosMapa, setDadosMapa] = useState<DadosGeoJSON | null>(null);
    const [erro, setErro] = useState("");

    // CARREGA O MAPA INDEPENDENTEMENTE DO LOGIN
    useEffect(() => {
        async function carregarMapa() {
            try {
                const resposta = await fetch(
                    "/geojson/municipio-sao-paulo-4326.geojson"
                );

                if (!resposta.ok) {
                    throw new Error(
                        `Erro ao carregar o mapa: ${resposta.status}`
                    );
                }

                const dadosGeoJSON = await resposta.json();

                setDadosMapa(dadosGeoJSON);
            } catch (error) {
                console.error("Erro ao carregar o mapa:", error);
                setErro("Não foi possível carregar o mapa.");
            }
        }

        carregarMapa();
    }, []);

    // CARREGA OS DADOS DO USUÁRIO LOGADO
    useEffect(() => {
        async function carregarPessoa() {
            try {
                const respostaSessao = await api("/auth/sessao");
                const idPessoa = await respostaSessao.json();

                const respostaPessoa = await api(`/pessoas/${idPessoa}`);
                const dadosPessoa = await respostaPessoa.json();

                setPessoa(dadosPessoa);
            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
            }
        }

        carregarPessoa();
    }, []);

    return (
        <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-6">
            {/* Deixa os tiles do OpenStreetMap escuros, sem precisar de API key */}
            <style>{`
                .tiles-escuros {
                    filter: invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.9);
                }
            `}</style>

            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-10">
                {/* MAPA */}
                <section className="flex-1 w-full flex justify-center">
                    <div className="w-full max-w-3xl">
                        <h1 className="font-nunito text-2xl font-bold mb-6">
                            Explore São Paulo
                        </h1>

                        <div className="w-full h-[600px] relative overflow-hidden">
                            {dadosMapa ? (
                                <MapContainer
                                    center={[-23.5505, -46.6333]}
                                    zoom={11}
                                    scrollWheelZoom={true}
                                    zoomControl={false}
                                    maxBoundsViscosity={1.0}
                                    className="w-full h-full bg-[#080808]"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        className="tiles-escuros"
                                    />

                                    <AjustarMapa dados={dadosMapa} />

                                    <MascaraMunicipio dados={dadosMapa} />
                                </MapContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    {erro || "Carregando mapa..."}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* PAINEL DO USUÁRIO */}
                <aside className="w-full lg:w-64 flex flex-col items-center lg:items-start gap-4">
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
                </aside>
            </div>
        </main>
    );
}