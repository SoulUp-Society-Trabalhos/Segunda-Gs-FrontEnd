import { useState } from "react";
import Hero from "../../components/Hero";

const perguntas = [
  {
    pergunta: "O que é a MiniCity?",
    resposta:
      "A MiniCity é uma startup que nasceu do desejo de ajudar as pessoas a organizar melhor a própria rotina, conhecendo mais sobre o local onde moram, seus acontecimentos e estabelecimentos, entregando as notícias mais relevantes para os moradores desta localidade.",
  },
  {
    pergunta: "Quais são os trabalhos atuais da MiniCity?",
    resposta:
      "Atualmente estamos desenvolvendo nosso aplicativo de mesmo nome, que permitirá ao usuário consultar mapas geolocalizados com notícias, relatórios de cidadãos e estabelecimentos bem avaliados. Com isso, visamos facilitar o consumo de notícias relevantes geograficamente para as pessoas, além de incentivar o exercício da cidadania e ajudar a conhecer melhor a própria região e trajeto.",
  },
  {
    pergunta: "É necessário pagar para utilizar a MiniCity?",
    resposta:
      "Não, tanto o download do aplicativo quanto a utilização dos mapas e serviços é completamente gratuita. Entretanto, empreendedores e donos de estabelecimentos comerciais poderão assinar nossos planos para impulsionar o próprio estabelecimento dentro de nossos mapas, além de ganhar um selo de qualidade especial.",
  },
  {
    pergunta: "Quais são as principais funcionalidades do aplicativo da MiniCity?",
    resposta:
      "As pricipais funcionalidades de nosso apllicativo são a consulta do mapa de notícias e relatórios, a consulta do mapa de estabelecimentos, a escrita de relatórios dos próprios usuários, o impulsionamento de estabelecimentos de assinantes de nossos planos, o salvamento de locais e a visualização de notícias relevantes a nível nacional.",
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
        titulo="PERGUNTAS FREQUENTES"
        descricao="Veja as dúvidas mais comuns que giram em torno de nosso projeto!"
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