import { useState } from "react";
import { Link, useNavigate } from "react-router";
import ModalSucesso from "../../../components/ModalSucesso";
import { cadastrarUsuario } from "../../../service/AuthService";

export default function Cadastro() {
  const navigate = useNavigate();

  // Estados dos campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estados das mensagens
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Estado do modal
  const [modalAberto, setModalAberto] = useState(false);

  // Função para cadastrar
  async function cadastrar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      await cadastrarUsuario({
        nome,
        email,
        senha,
      });

      // Abre o modal de sucesso
      setModalAberto(true);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao conectar com o servidor.");
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

          <h2 className="text-2xl font-bold text-white mb-2">Crie sua conta</h2>

          <p className="text-gray-400 font-medium">
            Faça parte da nossa comunidade!
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={cadastrar} className="flex flex-col gap-5">
          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">Nome</label>

            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              minLength={3}
              maxLength={100}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#01c853] transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Email */}
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
              minLength={8}
              required
              className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#01c853] transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <p className="text-red-500 text-sm text-center font-medium">
              {erro}
            </p>
          )}

          {/* Botão cadastrar */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-[#01c853] text-black py-4 rounded-xl font-bold text-base hover:bg-green-400 transition-all duration-300 cursor-pointer mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {carregando ? "Cadastrando..." : "Criar minha conta"}
          </button>
        </form>

        {/* Redirecionamento para login */}
        <p className="text-center text-gray-400 mt-8">
          Já possui uma conta?
          <Link
            to="/app/login"
            className="text-[#01c853] font-bold ml-2 hover:underline"
          >
            Fazer login
          </Link>
        </p>
      </section>

      {/* Modal de sucesso */}
      <ModalSucesso
        aberto={modalAberto}
        titulo="Conta criada!"
        mensagem="Seu cadastro foi realizado com sucesso. Agora você já pode acessar sua conta MiniCity."
        textoBotao="Ir para o login"
        onConfirmar={() => navigate("/app/login")}
      />
    </main>
  );
}
