import Hero from "../../components/Hero";

export default function Sobre() {
  return (
    <main>
      <Hero
        titulo="SOBRE NÓS"
        descricao="Apresentação geral dos membros da nossa equipe."
      />
      <section className="bg-[#01c853] font-anton">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-black">
            Contando um pouco sobre nós...
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="rounded-lg bg-black p-6 text-[#01c853]">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </article>

            <article className="rounded-lg bg-black p-6 text-[#01c853]">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </article>

            <article className="rounded-lg bg-black p-6 text-[#01c853]">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </article>

            <article className="rounded-lg bg-black p-6 text-[#01c853]">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}