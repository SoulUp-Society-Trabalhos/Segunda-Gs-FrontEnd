
export type Comentario = {
  id: number;
  descConteudo: string;
  dataPublicacao: string;

  pessoa: {
    id: number;
    nome: string;
    email: string;
  };

  distrito?: {
    id: number;
    nomeDistrito?: string;
  } | null;

  ocorrencia?: {
    id: number;
  } | null;
};

export type CriarComentario = {
  descConteudo: string;

  pessoa: {
    id: number;
    nome: string;
    email: string;
  };
};
