import Hero from "../../components/Hero";

export default function Contatos() {
  return (
    <main>
      <Hero
        titulo="FALE CONOSCO"
        descricao="Tem alguma dúvida ou sugestão? Envie uma mensagem para a equipe MiniCity."
      />

      <section className="bg-[#01c853] px-6 py-12">
        <div className="mx-auto max-w-2xl rounded-xl bg-black p-6 text-white shadow-xl">
          <h2 className="mb-2 font-anton text-3xl text-[#01c853]">
            Entre em contato
          </h2>
          <p className="mb-8 text-zinc-300">
            Preencha o formulário abaixo para enviar uma mensagem à nossa
            equipe.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="font-nunito font-semibold">
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                required
                placeholder="Seu nome"
                className="rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-[#01c853] focus:ring-2 focus:ring-[#01c853]/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-nunito font-semibold">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="voce@exemplo.com"
                className="rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-[#01c853] focus:ring-2 focus:ring-[#01c853]/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mensagem" className="font-nunito font-semibold">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={5}
                required
                placeholder="Escreva sua mensagem"
                className="resize-y rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-[#01c853] focus:ring-2 focus:ring-[#01c853]/30"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#01c853] px-6 py-3 font-nunito font-bold text-black transition hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
