
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

// Dados completos de uma ocorrência retornada pelo backend.
export type Ocorrencia = {
  id: number;
  nomeTitulo: string;
  descOcorrencia: string;
  gravidade: number;
  origem: string;
  status: string;
  latitude: number;
  longitude: number;
  dataOcorrencia: string;
  dataPublicacao: string | null;
  dataAtualizacao: string | null;

  distrito: Distrito;
  categoria: CategoriaOcorrencia;

  fonte?: {
    id: number;
  } | null;

  pessoa?: {
    id: number;
    nome: string;
  } | null;

  idExterno?: string | null;
};
