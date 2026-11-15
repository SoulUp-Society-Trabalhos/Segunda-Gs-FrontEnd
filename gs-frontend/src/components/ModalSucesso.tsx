interface ModalSucessoProps {
  aberto: boolean;
  titulo: string;
  mensagem: string;
  textoBotao: string;
  onConfirmar: () => void;
}

import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function ModalSucesso({
  aberto,
  titulo,
  mensagem,
  textoBotao,
  onConfirmar,
}: ModalSucessoProps) {
  if (!aberto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl p-8 text-center shadow-2xl"
      >
        {/* Ícone de sucesso */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#01c853]/15 flex items-center justify-center">
          <IoCheckmarkDoneSharp className="text-[#01c853] text-4xl" />
        </div>

        {/* Título */}
        <h2 id="modal-titulo" className="text-2xl font-bold text-white mb-3">
          {titulo}
        </h2>

        {/* Mensagem */}
        <p className="text-gray-400 font-medium mb-8">{mensagem}</p>

        {/* Botão */}
        <button
          onClick={onConfirmar}
          className="w-full bg-[#01c853] text-black py-3 rounded-xl font-bold hover:bg-green-400 transition-colors cursor-pointer"
        >
          {textoBotao}
        </button>
      </div>
    </div>
  );
}
