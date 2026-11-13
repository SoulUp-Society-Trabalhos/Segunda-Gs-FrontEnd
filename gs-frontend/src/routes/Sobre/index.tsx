import Hero from "../../components/Hero";

export default function Sobre() {
  return (
    <main>
      <Hero
        titulo="SOBRE NÓS"
        descricao="Conheça mais sobre a MiniCity!"
      />
      <section className="bg-[#01c853] font-anton">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-black">
            Contando um pouco sobre nós...
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="rounded-lg bg-black p-6 text-[#01c853]">
              <p>
                A MiniCity é uma startup criada em Novembro de 2026 com a intenção de ajudar na distribuição de notícias geograficamente relevantes para a população. Focamos em ajudar os usuários a conhecer melhor o seu redor, além de incentivar a prática da cidadania. 
              </p>
            </article>

            <article className="rounded-lg bg-black p-6 text-[#01c853]">
              <p>
                Atualmente, nossos projetos estão voltados para o desenvolvimento de mapas que exibirão notícias, relatórios de cidadãos e estabelecimentos bem avaliados de forma geolocalizada, facilitando o compartilhamento de notícias relevantes para a rotina das pessoas.
              </p>
            </article>

            <article className="rounded-lg bg-black p-6 text-[#01c853]">
              <p>
                Além de simlesmente exibir notícias, a MiniCity deseja incentivar a participação do cidadão na sociedade. Os usuários poderão publicar relatórios falando sobre ocorrências como alagamentos ou lotações para ajudar outros usuários e moradores da região.
              </p>
            </article>

            <article className="rounded-lg bg-black p-6 text-[#01c853]">
              <p>
                A MiniCity direciona seu foco para impactar positivamente a sociedade, com nossa proposa se adequando às ODS 9, 11 e 13 através da melhora do acesso à informação urbana, mobilidade e segurança, além de utilizar tecnologia para aprimorar a experiência urbana e facilitar o acesso a alertas sobre enchentes e outros eventos climáticos.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}