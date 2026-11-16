
import { api } from "./api";

import type { DadosLogin, DadosCadastro } from "../types/Auth";

// Verifica se existe uma sessão ativa
export async function verificarSessao() {
  const resposta = await api("/auth/sessao");

  return resposta.ok;
}

// Realiza o login
export async function fazerLogin(dados: DadosLogin) {
  const resposta = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(dados),
  });

  return resposta.json().catch(() => null);
}

// Realiza o cadastro
export async function cadastrarUsuario(dados: DadosCadastro) {
  const resposta = await api("/pessoas", {
    method: "POST",
    body: JSON.stringify(dados),
  });

  return resposta.json().catch(() => null);
}
