import ceu from "../assets/imagensHero/ceu.jpg"
import cidade from "../assets/imagensHero/cidade.jpg"

type HeroProps = {
  titulo: string;
  descricao: string;
};

export default function Hero({ titulo, descricao }: HeroProps) {
  const [primeira, ...resto] = titulo.split(" ");

  return (
    <section className="bg-black px-4 pb-16 pt-2 uppercase text-[#01c853] sm:px-11">
      <h1 className="sr-only">{titulo}</h1>

      <div className="flex items-center justify-center gap-[clamp(0.75rem,3vw,2.7rem)] font-anton" aria-hidden="true">
        <span className="whitespace-nowrap text-[clamp(3.5rem,15vw,13rem)] leading-[0.95]">{primeira}</span>
        <img
          src={ceu}
          alt="Imagem do centro de SP"
          className="h-auto w-[clamp(6rem,26vw,26rem)] aspect-13/8 shrink-0 rounded-md object-cover"
        />
      </div>

      <div className="mt-[clamp(0.75rem,2vw,1.8rem)] flex items-center justify-center gap-[clamp(0.75rem,3vw,2.7rem)] font-anton" aria-hidden="true">
        <img
          src={cidade}
          alt="Nuvens no céu azul"
          className="h-auto w-[clamp(6rem,26vw,26rem)] aspect-13/8 shrink-0 rounded-md object-cover"
        />
        {resto.length > 0 && (
          <span className="whitespace-nowrap text-[clamp(3.5rem,15vw,13rem)] leading-[0.95]">{resto.join(" ")}</span>
        )}
      </div>

      <p className="mx-auto mt-8 max-w-2xl px-2 text-center font-[Montserrat] text-[clamp(1rem,2vw,1.25rem)] normal-case text-zinc-300 sm:mt-10">
        {descricao}
      </p>
    </section>
  );
}