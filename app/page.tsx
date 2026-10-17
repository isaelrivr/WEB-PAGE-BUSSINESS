export default function Home() {
  return (
    <section className="flex-1 flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Estructura base lista
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
          Layout base configurado
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
          Menú fijo con navegación y enlace a WhatsApp integrado, tipografía configurada y pie de página listo para las siguientes secciones.
        </p>
      </div>
    </section>
  );
}
