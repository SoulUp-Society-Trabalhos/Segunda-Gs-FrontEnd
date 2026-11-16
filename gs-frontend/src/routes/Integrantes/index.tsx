import { useState } from "react";
import Hero from "../../components/Hero";

type Integrante = {
  id: number;
  nome: string;
  rm: string;
  sala: string;
  foto: string;
  email: string;
  linkedin: string;
  github: string;
  descricao: string;
};

const integrantes: Integrante[] = [
  {
    id: 1,
    nome: "Breno Elisio Leal Loabto",
    rm: "569961",
    sala: "1TDSPJ",
    foto: "/integrantes/foto-breno.jpg",
    email: "brenobell03@gmail.com",
    linkedin: "https://www.linkedin.com/in/breno-elisio-2b123a405/",
    github: "https://github.com/Brenoell",
    descricao: "Breve descrição sobre o integrante e o que ele faz na equipe.",
  },
  {
    id: 2,
    nome: "Chrisitian Verzellesi Barbuto",
    rm: "568677",
    sala: "1TDSPJ",
    foto: "/integrantes/foto-christian.png",
    email: "Chrisvbarbuto@gmail.com",
    linkedin: "https://www.linkedin.com/in/christian-verzellesi-barbuto-938463382/",
    github: "https://github.com/ChrisVerBarbuto",
    descricao: "Breve descrição sobre o integrante e o que ele faz na equipe.",
  },
  {
    id: 3,
    nome: "Eduardo Pizzoli Junior",
    rm: "569529",
    sala: "1TDSPJ",
    foto: "/integrantes/foto-eduardop.jpg",
    email: "edupizzolijr@gmail.com",
    linkedin: "https://www.linkedin.com/in/eduardo-pizzoli-junior-a2964640b",
    github: "https://github.com/dudupizzoli",
    descricao: "Breve descrição sobre o integrante e o que ele faz na equipe.",
  },
  {
    id: 4,
    nome: "Eduardo Nery Kurahara",
    rm: "570916",
    sala: "1TDSPJ",
    foto: "/integrantes/foto-eduardo.png",
    email: "eduardonerykurahara@gmail.com",
    linkedin: "https://www.linkedin.com/in/eduardo-kurahara-786b003b9",
    github: "https://github.com/edu64123",
    descricao: "Breve descrição sobre o integrante e o que ele faz na equipe.",
  },
  {
    id: 5,
    nome: "Gustavo Lizier Pontes",
    rm: "573234",
    sala: "1TDSPJ",
    foto: "/integrantes/foto-gustavo.png",
    email: "gulizpon@gmail.com",
    linkedin: "https://www.linkedin.com/in/gustavo-pontes-07aa6a3b3",
    github: "https://github.com/gustavopontes1104",
    descricao: "Breve descrição sobre o integrante e o que ele faz na equipe.",
  },
];

export default function Integrantes() {
  const [aberto, setAberto] = useState<number | null>(null);

  const alternar = (id: number) => {
    setAberto((atual) => (atual === id ? null : id));
  };

  return (
    <main>
      <Hero
        titulo="INTE GRANTES"
        descricao="Apresentação geral dos membros da nossa equipe."
      />

      <section className="bg-[#00c852] px-[5%] py-20">
        <h2 className="font-anton mb-14 text-center text-5xl uppercase tracking-wide text-white md:text-7xl">
          INTEGRANTES
        </h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((pessoa) => {
            const estaAberto = aberto === pessoa.id;

            return (
              <div
                key={pessoa.id}
                onClick={() => alternar(pessoa.id)}
                className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={pessoa.foto}
                    alt={pessoa.nome}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                      estaAberto ? "scale-105" : "scale-100"
                    }`}
                  />
                </div>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    estaAberto
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-2 p-6">
                      <h3 className="font-anton text-3xl uppercase text-[#00c852]">
                        {pessoa.nome}
                      </h3>
                      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        RM: {pessoa.rm} • Sala: {pessoa.sala}
                      </p>
                      <p className="text-gray-700">{pessoa.descricao}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {pessoa.email}
                      </p>

                      <div className="flex gap-4 pt-2">
                        <a
                          href={pessoa.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg bg-[#00c852] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#00a843]"
                        >
                          LinkedIn
                        </a>
                        <a
                          href={pessoa.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}