import { Link } from "react-router";
import { useState } from "react";

export default function Cabecalho() {
  const [dropdownAberto, setDropdownAberto] = useState(false);

  return (
    <header className="sticky top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center bg-black px-11 py-5.5 font-[IBM_Plex_Mono]">
      <nav className="flex gap-10 text-xs uppercase text-white">
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

      <Link to="/" aria-label="Início">
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
        className="font-nunito justify-self-end rounded-full bg-[#00C853] px-3 py-2.25 text-base uppercase text-black transition hover:bg-[#10B981]"
      >
        CONTATE-NOS
      </Link>
    </header>
  );
}
