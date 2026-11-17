import { Link } from "react-router";
import { useState } from "react";

export default function Cabecalho() {
  const [dropdownAberto, setDropdownAberto] = useState(false);

  return (
    <header className="sticky top-0 z-1001 grid grid-cols-[1fr_auto] items-center gap-y-4 bg-black px-4 py-4 font-[IBM_Plex_Mono] sm:px-6 min-[1200px]:grid-cols-[1fr_auto_1fr] min-[1200px]:gap-y-0 min-[1200px]:px-11 min-[1200px]:py-5.5">
      <nav className="col-span-2 row-start-2 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs uppercase text-white min-[1200px]:col-span-1 min-[1200px]:col-start-1 min-[1200px]:row-start-auto min-[1200px]:flex-nowrap min-[1200px]:justify-start min-[1200px]:gap-10">
        <Link to="/" className="text-base font-nunito font-medium">
          Home
        </Link>

        <li className="relative list-none font-nunito font-medium">
          <button
            onClick={() => setDropdownAberto(!dropdownAberto)}
            className="flex items-center gap-2 cursor-pointer font-nunito font-medium text-base"
          >
            PROPOSTAS
            <span
              className={`transition-transform duration-200 ${
                dropdownAberto ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {dropdownAberto && (
            <ul className="absolute left-0 top-full mt-2 w-44 bg-black border border-[#01c853] rounded-lg shadow-lg overflow-hidden z-50">
              <li>
                <Link
                  to="/proposta/"
                  onClick={() => setDropdownAberto(false)}
                  className="block px-4 py-3 text-white hover:bg-[#01c853] hover:text-black transition-colors font-nunito font-medium"
                >
                  Proposta 1
                </Link>
              </li>

              <li>
                <Link
                  to="/proposta2/"
                  onClick={() => setDropdownAberto(false)}
                  className="block px-4 py-3 text-white hover:bg-[#01c853] hover:text-black transition-colors font-nunito font-medium"
                >
                  Proposta 2
                </Link>
              </li>
            </ul>
          )}
        </li>

        <Link to="/integrantes" className="text-base font-nunito font-medium">
          Integrantes
        </Link>
        <Link to="/faq" className=" text-base font-nunito font-medium">
          Faq
        </Link>
        <Link to="/sobre" className="text-base font-nunito font-medium">
          Sobre
        </Link>
        <Link to="/app/authpage" className="text-base font-nunito font-medium">
          PROTOTIPO
        </Link>
      </nav>

      <Link
        to="/"
        aria-label="Início"
        className="col-start-1 row-start-1 min-[1200px]:col-start-2 min-[1200px]:row-start-auto"
        >
        <svg
          viewBox="0 0 58 34"
          fill="none"
          stroke="#10B981"
          strokeWidth="2.2"
          className="h-8.5 w-14.5"
        >
          <ellipse cx="29" cy="17" rx="27" ry="15" />
          <ellipse cx="29" cy="17" rx="11" ry="15" />
          <line x1="29" y1="2" x2="29" y2="32" />
          <line x1="2" y1="17" x2="56" y2="17" />
          <path d="M6 8.5 Q29 14 52 8.5" />
          <path d="M6 25.5 Q29 20 52 25.5" />
        </svg>
      </Link>

      <Link
        to="/contatos"
        className="col-start-2 row-start-1 justify-self-end rounded-full bg-[#00C853] px-3 py-2 text-sm font-nunito uppercase text-black transition hover:bg-[#10B981] min-[1200px]:col-start-3 min-[1200px]:row-start-auto min-[1200px]:py-2.25 min-[1200px]:text-base"
      >
        CONTATE-NOS
      </Link>
    </header>
  );
}
