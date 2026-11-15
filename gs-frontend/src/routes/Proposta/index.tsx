import Hero from "../../components/Hero";
import ceu2 from "../../assets/imagensPropostas/ceu2.jpg";
import ceuEntardecer from "../../assets/imagensPropostas/ceuEntardecer.jpg"; 
import noite2 from "../../assets/imagensPropostas/noite2.jpg"; 

export default function Proposta() {
  return (
    <main>
      <Hero
        titulo="MAPA NOTÍCIAS"
        descricao="Conheça mais sobre nosso projeto!"
      />

      {/* Primeira seção: fundo preto */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-black text-white px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Nossa proposta
          </h2>

          <p className="text-lg leading-relaxed text-left">
            A proposta principal da MiniCity é criar um aplicativo que disponibilize um mapa com notícias dispostas de forma geolocalizada, exibindo acontecimentos relevantess geograficamente para o usuário, para que este possa estar ciente do que acontece em sua vizinhança. As notícias serão adquiridas por meio de fontes confiáveis e seguras, aparecendo no mapa com um breve resumo e o link da fonte para que a notícia possa ser validada.
          </p>
        </div>

        <div className="flex-1">
          <img src={ceu2} alt="Céu ensolarado na cidade de São Paulo" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>

      {/* Segunda seção: fundo verde */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-10 bg-[#01c853] text-black px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Relatórios
          </h2>

          <p className="text-lg leading-relaxed text-left">
            Os usuários de nosso aplicativo, além de poderem visualizar notícias, também poderão escrever relatórios sobre problemas e ocorrências que não estão registradas no mapa. Buracos em uma calçada, alagamentos ou problemas na linha do metrô poderão ser reportados através do app da MiniCity. Os relatórios passarão por uma revisão após serem enviados e, quando aprovados, aparecerão no mapa assim como outras notícias e sumirão quando o problema for sanado.
          </p>
        </div>

        <div className="flex-1">
            <img src={noite2} alt="Noite em São Paulo" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>

      {/* Terceira seção: fundo preto */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-black text-white px-6 md:px-16 py-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5 text-left">
            Os benefícios
          </h2>

          <p className="text-lg leading-relaxed text-left">
            Os usuários de nosso aplicativo poderão se beneficiar muito de nossas funcionalidades. O mapa de notícias não os ajuda apenas a conhecer melhor a própria vizinhança, como também facilita o planejamento da rotina e de trajetos, garantindo mais preparo, eficiência e segurança durante deslocamentos ou mesmo antes de sair de casa. Já os relatórios permitem que os usuários exerçam sua cidadania com mais ênfase e eficiência, permitindo a eles que participem mais de sua vizinhança e ajudem outros moradores da área, melhorando a convivência e a vida da região de um modo geral.
          </p>
        </div>

        <div className="flex-1">
          <img src={ceuEntardecer} alt="Céu do entardecer em São Paulo" className="w-full h-72 object-cover rounded-xl" />
        </div>
      </section>
    </main>
  );
}
