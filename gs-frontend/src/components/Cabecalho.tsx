
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

export default function Cabecalho() {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const menuRef = useRef<HTMLElement>(null);
  const botaoMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuAberto) return;

    function verificarCliqueFora(event: PointerEvent) {
      const alvo = event.target as Node;

      if (
        !menuRef.current?.contains(alvo) &&
        !botaoMenuRef.current?.contains(alvo)
      ) {
        setMenuAberto(false);
        setDropdownAberto(false);
      }
    }

    function verificarTecla(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuAberto(false);
        setDropdownAberto(false);
      }
    }

    function verificarRedimensionamento() {
      if (window.innerWidth >= 1200) {
        setMenuAberto(false);
        setDropdownAberto(false);
      }
    }

    document.addEventListener("pointerdown", verificarCliqueFora);
    document.addEventListener("keydown", verificarTecla);
    window.addEventListener("resize", verificarRedimensionamento);

    return () => {
      document.removeEventListener("pointerdown", verificarCliqueFora);
      document.removeEventListener("keydown", verificarTecla);
      window.removeEventListener("resize", verificarRedimensionamento);
    };
  }, [menuAberto]);

  function fecharMenu() {
    setMenuAberto(false);
    setDropdownAberto(false);
  }

  return (
    <header className="sticky top-0 z-1001 grid grid-cols-[1fr_auto_auto] items-center gap-y-4 bg-black px-4 py-4 font-[IBM_Plex_Mono] sm:px-6 min-[1200px]:grid-cols-[1fr_auto_1fr] min-[1200px]:gap-y-0 min-[1200px]:px-11 min-[1200px]:py-5.5">

      <nav
        ref={menuRef}
        id="menu-principal"
        className={`${menuAberto ? "flex" : "hidden"} col-span-3 row-start-2 flex-col items-center gap-5 bg-black py-4 text-xs uppercase text-white min-[1200px]:col-span-1 min-[1200px]:col-start-1 min-[1200px]:row-start-auto min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:flex-nowrap min-[1200px]:justify-start min-[1200px]:gap-10`}
      >
        <Link
          to="/"
          onClick={fecharMenu}
          className="block w-full py-2 text-center text-base font-nunito font-medium min-[1200px]:w-auto min-[1200px]:py-0"
        >
          Home
        </Link>

        <li className="relative w-full list-none text-center font-nunito font-medium min-[1200px]:w-auto">
          <button
            type="button"
            onClick={() => setDropdownAberto(!dropdownAberto)}
            aria-expanded={dropdownAberto}
            className="flex w-full cursor-pointer items-center justify-center gap-2 py-2 font-nunito text-base font-medium min-[1200px]:w-auto min-[1200px]:py-0"
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
            <ul className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-[#01c853] bg-black shadow-lg min-[1200px]:w-44">
              <li>
                <Link
                  to="/proposta/"
                  onClick={fecharMenu}
                  className="block w-full px-4 py-3 text-center font-nunito font-medium text-white transition-colors hover:bg-[#01c853] hover:text-black"
                >
                  Proposta 1
                </Link>
              </li>

              <li>
                <Link
                  to="/proposta2/"
                  onClick={fecharMenu}
                  className="block w-full px-4 py-3 text-center font-nunito font-medium text-white transition-colors hover:bg-[#01c853] hover:text-black"
                >
                  Proposta 2
                </Link>
              </li>
            </ul>
          )}
        </li>

        <Link
          to="/integrantes"
          onClick={fecharMenu}
          className="block w-full py-2 text-center text-base font-nunito font-medium min-[1200px]:w-auto min-[1200px]:py-0"
        >
          Integrantes
        </Link>

        <Link
          to="/faq"
          onClick={fecharMenu}
          className="block w-full py-2 text-center text-base font-nunito font-medium min-[1200px]:w-auto min-[1200px]:py-0"
        >
          Faq
        </Link>

        <Link
          to="/sobre"
          onClick={fecharMenu}
          className="block w-full py-2 text-center text-base font-nunito font-medium min-[1200px]:w-auto min-[1200px]:py-0"
        >
          Sobre
        </Link>

        <Link
          to="/app/authpage"
          onClick={fecharMenu}
          className="block w-full py-2 text-center text-base font-nunito font-medium min-[1200px]:w-auto min-[1200px]:py-0"
        >
          PROTOTIPO
        </Link>
      </nav>

      <Link
        to="/"
        aria-label="Início"
        className="hidden min-[1200px]:block min-[1200px]:col-start-2 min-[1200px]:row-start-auto"
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

      <button
        ref={botaoMenuRef}
        type="button"
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
        aria-controls="menu-principal"
        onClick={() => {
          setMenuAberto(!menuAberto);
          setDropdownAberto(false);
        }}
        className="col-start-1 row-start-1 flex flex-col gap-1.5 p-2 text-[#01c853] min-[1200px]:hidden"
      >
        <span className="h-0.5 w-7 rounded bg-current" />
        <span className="h-0.5 w-7 rounded bg-current" />
        <span className="h-0.5 w-7 rounded bg-current" />
      </button>

      <Link
        to="/contatos"
        className="col-start-3 row-start-1 justify-self-end rounded-full bg-[#00C853] px-3 py-2 text-sm font-nunito uppercase text-black transition hover:bg-[#10B981] min-[1200px]:col-start-3 min-[1200px]:row-start-auto min-[1200px]:py-2.25 min-[1200px]:text-base"
      >
        CONTATE-NOS
      </Link>
    </header>
  );
}
