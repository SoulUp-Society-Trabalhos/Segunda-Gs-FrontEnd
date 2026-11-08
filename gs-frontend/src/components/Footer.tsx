import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Footer() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Integrantes", href: "/integrantes" },
    { label: "Sobre", href: "/sobre" },
    { label: "Faq", href: "/faq" },
    { label: "Pág. Solução 1", href: "/solucao-1" },
    { label: "Pág. Solução 2", href: "/solucao-2" },
  ];
  return (
    <footer className="bg-black px-[5%] pb-8 pt-16 font-['Montserrat',sans-serif] text-[#00c852]">
      <div className="max-w-md">
        <h3 className="mb-5 text-xl font-semibold sm:text-2xl">Um pouco sobre nós</h3>

        <p className="mb-6 text-sm leading-6 opacity-80 sm:text-base sm:leading-7">
          Startup criada visando ao aperfeiçoamento da rede social SoulUp,
          focando em áreas como a sustentabilidade e a mobilidade.
        </p>

        <div className="mb-3 flex items-center gap-3 text-sm sm:text-base">
          <BsFillTelephoneFill /> 
          <p>+55 11 99999-9999</p>
        </div>

        <div className="mb-6 flex items-center gap-3 text-sm sm:text-base">
          <MdEmail />
          <span>minicity@gmail.com</span>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center rounded-full border border-[#00c852]/40 bg-black p-1.5"
        >
          <input
            type="email"
            placeholder="Insira o E-mail."
            className="
              w-full bg-transparent px-4 text-sm text-[#00c852]
              placeholder:text-[#00c852]/60
              focus:outline-none
            "
          />
          <button
            type="submit"
            className="
              rounded-full bg-[#00c852] px-6 py-2.5 text-sm font-bold text-black
              transition hover:brightness-110 font-nunito
            "
          >
            Enviar
          </button>
        </form>
      </div>

      
      <div className="mt-16 border-t border-[#00c852]/40 pt-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium sm:text-base">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:underline hover:underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="max-w-full text-xs leading-5 sm:text-sm lg:max-w-sm lg:text-right">
            Breno Lobato, Gustavo Pontes, Christian Barbuto, Eduardo Pizzoli,
            Eduardo Nery
          </p>
        </div>
      </div>
    </footer>
  );
}