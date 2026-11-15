import { Link } from "react-router";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 font-nunito">

      <section className="w-full max-w-md text-center">

        {/* Logo / Nome */}
        <h1 className="text-5xl font-bold text-white mb-4">
          MiniCity
          <span className="text-[#01c853]">.</span>
        </h1>

        {/* Apresentação */}
        <h2 className="text-2xl font-bold text-white mb-4">
          Saiba o que há ao seu ao redor! 
        </h2>

        <p className="text-gray-400 font-medium text-base leading-relaxed mb-10">
          Conheça sua vizinhança e facilite o planejamento de sua rotina.
        </p>

        {/* Botões */}
        <div className="flex flex-col gap-4">

          <Link
            to="/app/cadastro"
            className="w-full bg-[#01c853] text-black py-4 rounded-xl font-nunito font-bold text-base hover:bg-green-400 transition-all duration-300"
          >
            Criar minha conta
          </Link>

          <Link
            to="/app/login"
            className="w-full border-2 border-[#01c853] text-[#01c853] py-4 rounded-xl font-nunito font-bold text-base hover:bg-[#01c853] hover:text-black transition-all duration-300"
          >
            Já tenho uma conta
          </Link>

        </div>

        {/* Rodapé */}
        <p className="text-gray-500 text-sm mt-10 font-nunito font-medium">
          Um mapa. Diversos caminhos.
        </p>

      </section>

    </main>
  );
}
