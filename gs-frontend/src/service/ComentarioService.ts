
import { api } from "./api";

import type {
  Comentario,
  CriarComentario
} from "../types/Comentario";

// Busca os comentários de uma ocorrência.
export async function buscarComentariosPorOcorrencia(
  idOcorrencia: number
): Promise<Comentario[]> {

  const resposta = await api(
    `/ocorrencias/${idOcorrencia}/comentarios`
  );

  return resposta.json();
}

// Cadastra um comentário em uma ocorrência.
export async function criarComentario(
  idOcorrencia: number,
  comentario: CriarComentario
): Promise<Comentario> {

  const resposta = await api(
    `/ocorrencias/${idOcorrencia}/comentarios`,
    {
      method: "POST",
      body: JSON.stringify(comentario)
    }
  );

  return resposta.json();
}
