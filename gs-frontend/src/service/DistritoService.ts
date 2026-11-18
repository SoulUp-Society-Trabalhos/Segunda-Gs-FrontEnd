
import type { Distrito } from "../types/Ocorrencia";

export async function buscarDistritos(): Promise<Distrito[]> {
  const resposta = await fetch("/api/distritos", {
    credentials: "include",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar os distritos.");
  }

  return await resposta.json();
}
