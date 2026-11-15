import Hero from "../../components/Hero";
import masp from "../../assets/imagensPropostas/masp.jpg";
import noite1 from "../../assets/imagensPropostas/noite1.jpg";
import ponteCeuBonito from "../../assets/imagensPropostas/ponteCeuBonito.jpg";

export default function Proposta2() {
  return (
    <main>
      <Hero
        titulo="MAPA COMÉRCIOS"
        descricao="Conheça mais sobre nosso projeto!"
      />

      {/* Primeira seção: fundo preto */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-black text-white px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Nossa proposta
          </h2>

          <p className="text-lg leading-relaxed text-left">
            A segunda proposta da MiniCity é a criação de um mapa que reúne comércios, atrações e estabelecimentos bem avaliados também de forma geolocalizada. Este mapa exibiria os estabelecimentos junto de sua avaliação (de 1 a 5 estrelas), uma pequena descrição e também um link para o site do estabelecimento para que o usuário possa conhecê-lo melhor. As avaliações serão baseadas na avaliação do local no Google.
          </p>
        </div>

        <div className="flex-1">
          <img src={masp} alt="" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>

      {/* Segunda seção: fundo verde */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-10 bg-[#01c853] text-black px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Nossa assinatura
          </h2>

          <p className="text-lg leading-relaxed text-left">
            A MiniCity também contará com um serviço de assinatura para comerciantes que quiserem impulsionar seus estabelecimentos dentro de nossos mapas. Por um valor mensal de R$50,00, o comércio do assinante irá aparecer para usuários a uma distância maior, além de ganhar um selo especial de aprovação da própria MiniCity. Caso o comerciante deseje incluir mais de um estabelecimento no plano, o valor irá passar para R$75,00 mensais, o que garantirá também o ganho de um selo de maior nível, demonstrando qualidade e comprometimento para os usuários que visualizarem o estabelecimento através dos mapas.
          </p>
        </div>

        <div className="flex-1">
          <img src={ponteCeuBonito} alt="" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>

      {/* Terceira seção: fundo preto */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-black text-white px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Os benefícios
          </h2>

          <p className="text-lg leading-relaxed text-left">
            Com nosso mapa de comércios e o serviço de assinaturas, donos de estabelecimentos poderão facilitar a promoção e o marketing de suas lojas, tornando-as mais prósperas e facilitando o giro da economia. Além disso, este mapa permitirá com que usuários comuns possam conhecer mais sobre os comércios e atrações não apenas perto de sua casa, como também em seu trajeto ou perto de seu local de trabalho, melhorando a experiência dentro da cidade e deixando passeios comuns mais divertidos.
          </p>
        </div>

        <div className="flex-1">
          <img src={noite1} alt="" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>
    </main>
  );
}
