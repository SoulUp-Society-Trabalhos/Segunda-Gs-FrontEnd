
import type { CategoriaOcorrencia } from "../types/Ocorrencia";

export async function buscarCategorias(): Promise<CategoriaOcorrencia[]> {
  const resposta = await fetch("/api/categorias-ocorrencia", {
    credentials: "include",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar as categorias.");
  }

  return await resposta.json();
}
