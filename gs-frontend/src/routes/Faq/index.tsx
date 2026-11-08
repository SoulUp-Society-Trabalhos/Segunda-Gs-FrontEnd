import { useState } from "react";
import Hero from "../../components/Hero";

const perguntas = [
  {
    pergunta: "Lorem ipsum dolor sit amet?",
    resposta:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    pergunta: "Consectetur adipiscing elit?",
    resposta:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    pergunta: "Sed do eiusmod tempor incididunt?",
    resposta:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    pergunta: "Ut enim ad minim veniam?",
    resposta:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(null);

  function alternar(index: number) {
    setAberta(aberta === index ? null : index);
  }

  return (
    <main>
      <Hero
        titulo="FREQUENT QUESTIONS"
        descricao="Apresentação geral dos membros da nossa equipe."
      />
      <section className="bg-[#01c853] font-anton text-black">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex flex-col gap-4">
            {perguntas.map((item, index) => {
              const estaAberta = aberta === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg bg-black text-white"
                >
                  <button
                    type="button"
                    onClick={() => alternar(index)}
                    aria-expanded={estaAberta}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg"
                  >
                    <span>{item.pergunta}</span>
                    <span
                      className={`text-2xl text-[#01c853] transition-transform duration-300 ${
                        estaAberta ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      estaAberta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 font-sans text-gray-200">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}