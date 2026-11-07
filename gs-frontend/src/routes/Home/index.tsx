
import { Link } from "react-router";
import { HiChevronDoubleRight } from "react-icons/hi";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <main>
      <Hero
        titulo="GLOBAL SOLUTION"
        descricao="Apresentação geral dos membros da nossa equipe."
      />

      <section className="bg-black px-[5%] py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-nunito text-sm font-bold text-[  ]">
            01 - PÁGINA DE PROPOSTAS
          </p>

          <h2 className="mt-4 font-anton text-5xl text-[#00c852] md:text-7xl">
            PROPOSTAS
          </h2>

          <p className="mt-5 max-w-xl font-nunito text-lg text-white">
            Interessado? Leia nosso projeto nessas páginas!
          </p>

          <Link
            to="/faq"
            className="mt-8 mr-3 inline-block rounded-md border-2 border-[#00c852] px-8 py-3 font-nunito font-bold text-[#00c852] transition hover:bg-[#00c852] hover:text-black"
          >
            Página 1<HiChevronDoubleRight />
          </Link>

          <Link
            to="/faq"
            className="mt-8 inline-block rounded-md border-2 border-[#00c852] px-8 py-3 font-nunito font-bold text-[#00c852] transition hover:bg-[#00c852] hover:text-black"
          >
            Página 2 <HiChevronDoubleRight />
          </Link>
        </div>
      </section>

      <section className="bg-[#00c852] px-[5%] py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-nunito text-sm font-bold text-black">
            02 - NOSSAS PROPOSTAS
          </p>

          <h2 className="mt-4 font-anton text-5xl text-black md:text-7xl">
            INTEGRANTES
          </h2>

          <p className="mt-5 max-w-xl font-nunito text-lg text-black">
            Conheça os integrantes responsáveis pelo desenvolvimento
            deste projeto.
          </p>

          <Link
            to="/integrantes"
            className="mt-8 inline-block rounded-md border-2 border-black px-8 py-3 font-nunito font-bold text-black transition hover:bg-black hover:text-[#00c852]"
          >
            CONHEÇA A EQUIPE <HiChevronDoubleRight />
          </Link>
        </div>
      </section>

      
      <section className="bg-black px-[5%] py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-nunito text-sm font-bold text-[#00c852]">
            03 - PERGUNTAS FREQUENTES
          </p>

          <h2 className="mt-4 font-anton text-5xl text-[#00c852] md:text-7xl">
            FAQ
          </h2>

          <p className="mt-5 max-w-xl font-nunito text-lg text-white">
            Tem alguma dúvida sobre nosso projeto? Confira as
            perguntas e respostas mais frequentes.
          </p>

          <Link
            to="/faq"
            className="mt-8 inline-block rounded-md border-2 border-[#00c852] px-8 py-3 font-nunito font-bold text-[#00c852] transition hover:bg-[#00c852] hover:text-black"
          >
            ACESSE O FAQ <HiChevronDoubleRight />
          </Link>
        </div>
      </section>

      
      <section className="bg-[#00c852] px-[5%] py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-nunito text-sm font-bold text-black">
            04 - CONHEÇA O PROJETO
          </p>

          <h2 className="mt-4 font-anton text-5xl text-black md:text-7xl">
            SOBRE NÓS
          </h2>

          <p className="mt-5 max-w-xl font-nunito text-lg text-black">
            Descubra nossa proposta, nossos objetivos e o que
            queremos transformar com essa iniciativa.
          </p>

          <Link
            to="/sobre"
            className="mt-8 inline-block rounded-md border-2 border-black px-8 py-3 font-nunito font-bold text-black transition hover:bg-black hover:text-[#00c852]"
          >
            SAIBA MAIS <HiChevronDoubleRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
