import { Link } from "react-router";

export default function Cadastro() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-10 font-nunito">

      <section className="w-full max-w-md">

        {/* Título */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            MiniCity<span className="text-[#01c853]">.</span>
          </h1>

          <h2 className="text-2xl font-bold text-white mb-2">
            Crie sua conta
          </h2>

          <p className="text-gray-400 font-medium">
            Faça parte da nossa comunidade!
          </p>
        </div>

        {/* Formulário */}
        <form className="flex flex-col gap-5">

          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">
              Nome
            </label>

            <input
              type="text"
              placeholder="Digite seu nome"
              required
              className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#01c853] transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">
              E-mail
            </label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              required
              className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#01c853] transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              required
              minLength={6}
              className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#01c853] transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Botão cadastrar */}
          <button
            type="submit"
            className="w-full bg-[#01c853] text-black py-4 rounded-xl font-bold text-base hover:bg-green-400 transition-all duration-300 cursor-pointer mt-3"
          >
            Criar minha conta
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

    </main>
  );
}
