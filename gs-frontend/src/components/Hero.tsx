    import ponte from "../assets/imagensHero/ponte.jpg";
import ceu from "../assets/imagensHero/ceu.jpg"

type HeroProps = {
  titulo: string;
  descricao: string;
};

export default function Hero({ titulo, descricao }: HeroProps) {
  const [primeira, ...resto] = titulo.split(" ");

  return (
    <section className="bg-black px-5 pb-16 pt-2 uppercase text-[#01c853] sm:px-11">
      <h1 className="sr-only">{titulo}</h1>

      <div className="flex items-center justify-center gap-[3vw] font-anton" aria-hidden="true">
        <span className="text-[15vw] leading-[0.95]">{primeira}</span>
        <img
          src={ceu}
          alt="Imagem do centro de SP"
          className="h-[16vw] w-[26vw] rounded-md object-cover"
        />
      </div>

      <div className="mt-[2vw] flex items-center justify-center gap-[3vw] font-anton" aria-hidden="true">
        <img
          src={ponte}
          alt="Nuvens no céu azul"
          className="h-[12vw] w-[40vw] rounded-md object-cover"
        />
        {resto.length > 0 && (
          <span className="text-[15vw] leading-[0.95]">{resto.join(" ")}</span>
        )}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center font-[Montserrat] text-xl normal-case text-zinc-300">
        {descricao}
      </p>
    </section>
  );
}