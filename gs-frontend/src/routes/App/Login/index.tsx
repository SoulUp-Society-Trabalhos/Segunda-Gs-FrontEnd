import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

import { fazerLogin as autenticar } from "../../../service/AuthService";

import type { DadosLogin } from "../../../types/Auth";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login | MiniCity";
  }, []);

  // Dados do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Controle de erro e carregamento
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const dadosLogin: DadosLogin = {
        email,
        senha,
      };

      await autenticar(dadosLogin);

      // Login realizado com sucesso!
      navigate("/app/home-page");
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Não foi possível realizar o login.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-10 font-nunito">
      <section className="w-full max-w-md">
        {/* Título */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            MiniCity<span className="text-[#01c853]">.</span>
          </h1>

          <h2 className="text-2xl font-bold text-white mb-2">
            Bem-vindo de volta!
          </h2>

          <p className="text-gray-400 font-medium">
            Entre na sua conta e continue sua jornada.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={fazerLogin} className="flex flex-col gap-5">
          {/* E-mail */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">E-mail</label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#01c853] transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">Senha</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#01c853] transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          {/* Botão entrar */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-[#01c853] text-black py-4 rounded-xl font-bold text-base hover:bg-green-400 transition-all duration-300 cursor-pointer mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Link para cadastro */}
        <p className="text-center text-gray-400 mt-8">
          Ainda não possui uma conta?
          <Link
            to="/app/cadastro"
            className="text-[#01c853] font-bold ml-2 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </section>
    </main>
  );
}
