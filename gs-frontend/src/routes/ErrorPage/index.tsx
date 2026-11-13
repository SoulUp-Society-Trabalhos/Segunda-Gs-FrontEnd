
export default function ErrorPage() {
  return (
    <main>
        <section className="min-h-[90vh] bg-gray-950 flex flex-col items-center justify-center">
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-6xl text-white font-montserrat font-bold mb-6">Erro 404</h1>

          <div className="text-2xl">
            <p className="text-[#01c853]">Página não encontrada.</p>
          </div>
        </div>
      </section>
    </main>
  );
}