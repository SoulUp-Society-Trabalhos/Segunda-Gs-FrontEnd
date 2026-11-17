import Hero from "../../components/Hero";

export default function Contatos() {
  return (
    <main>
      <Hero
        titulo="FALE CONOSCO"
        descricao="Tem alguma dúvida ou sugestão? Envie uma mensagem para a equipe MiniCity."
      />

      <section className="bg-[#01c853] px-6 py-12">
        <div className="mx-auto max-w-2xl rounded-xl bg-black p-6 text-white">
          <h2 className="mb-2 font-anton text-3xl text-[#01c853]">
            Entre em contato
          </h2>
          <p>
            Preencha o formulário abaixo para enviar uma mensagem à nossa
            equipe.
          </p>
        </div>
      </section>
    </main>
  );
}
