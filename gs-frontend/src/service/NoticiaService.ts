
import { api } from "./Api.ts";

import type { Noticia, RespostaNoticias } from "../types/Noticia";

// Busca as notícias de São Paulo
export async function buscarNoticias(): Promise<Noticia[]> {
  const resposta = await api("/noticias/sao-paulo");

  const dados: RespostaNoticias = await resposta.json();

  return dados.articles || [];
}
