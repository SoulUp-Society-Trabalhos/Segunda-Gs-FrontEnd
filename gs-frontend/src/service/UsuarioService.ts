
import { api } from "./Api";
import type { DadosPessoa } from "../types/Pessoa";

// Busca uma pessoa pelo ID
export async function buscarUsuarioPorId(
  id: number
): Promise<DadosPessoa> {
  const resposta = await api(`/pessoas/${id}`);

  return resposta.json();
}

// Busca os dados da pessoa que está logada
export async function buscarPessoaLogada(): Promise<DadosPessoa> {
  const respostaSessao = await api("/auth/sessao");

  const id: number = await respostaSessao.json();

  return buscarUsuarioPorId(id);
}
