
import { api } from "./Api.ts";
import type { Ocorrencia } from "../types/Ocorrencia";

// Busca uma ocorrência específica pelo ID.
export async function buscarOcorrenciaPorId(
  id: number
): Promise<Ocorrencia> {

  const resposta = await api(`/ocorrencias/${id}`);

  return resposta.json();
}
