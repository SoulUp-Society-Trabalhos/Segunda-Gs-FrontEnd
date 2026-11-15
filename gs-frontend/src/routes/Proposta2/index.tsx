import Hero from "../../components/Hero";

export default function Proposta2() {
  return (
    <main>
      <Hero
        titulo="INTEGRANTES"
        descricao="Apresentação geral dos membros da nossa equipe."
      />

      {/* Primeira seção: fundo preto */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-black text-white px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Lorem ipsum dolor sit amet.
          </h2>

          <p className="text-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe enim
            quam reiciendis ipsa in dolorum at facere cupiditate quia
            dignissimos omnis tempore magnam libero blanditiis, recusandae,
            soluta aut maxime? Eveniet.
          </p>
        </div>

        <div className="flex-1">
          <img src="" alt="" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>

      {/* Segunda seção: fundo verde */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-10 bg-[#01c853] text-black px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Lorem ipsum dolor sit amet.
          </h2>

          <p className="text-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            possimus officia, porro repellendus voluptatibus commodi sunt
            consequuntur corporis, soluta cumque temporibus nostrum? Error, nam
            incidunt omnis alias voluptatum cumque a?
          </p>
        </div>

        <div className="flex-1">
          <img src="" alt="" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>

      {/* Terceira seção: fundo preto */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-black text-white px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Lorem ipsum dolor sit amet.
          </h2>

          <p className="text-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe esse
            repellat quas dignissimos ad dolores voluptatum molestiae, laborum
            ea nam alias quisquam. Aliquid possimus veniam a harum optio eum
            qui?
          </p>
        </div>

        <div className="flex-1">
          <img src="" alt="" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>
    </main>
  );
}
