
export type Distrito = {
  id: number;
  nomeDistrito: string;
  zona: string;
  latitude: number;
  longitude: number;
};

export type CategoriaOcorrencia = {
  id: number;
  nomeOcorrencia: string;
  descTexto: string;
};

export type CriarOcorrencia = {
  nomeTitulo: string;
  descOcorrencia: string;
  gravidade: number;
  latitude: number;
  longitude: number;
  dataOcorrencia: string;
  distrito: { id: number };
  categoria: { id: number };
};


export type OpcaoOcorrencia = {
  id: number;
  nome: string;
};
