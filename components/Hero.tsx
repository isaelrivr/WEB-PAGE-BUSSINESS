import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function Hero() {
  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  return (
    <section className="relative flex-1 flex items-center justify-center py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Titular grande */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.12] text-balance animate-fade-in-up">
          Más reseñas y mejor presencia online para tu negocio local
        </h1>

        {/* Subtítulo de 1 o 2 líneas */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-zinc-600 max-w-2xl leading-relaxed font-normal text-pretty animate-fade-in-up animation-delay-150">
          Ayudamos a pequeños negocios a captar clientes con optimización de reseñas en Google, manejo de redes sociales y páginas web profesionales.
        </p>

        {/* Grupo de dos botones con colores neutros provisionales */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto animate-fade-in-up animation-delay-300">
          {/* Botón principal: Escríbenos por WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            aria-label="Escríbenos por WhatsApp (abre en una nueva pestaña)"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Escríbenos por WhatsApp</span>
          </a>

          {/* Botón secundario: Ver servicios */}
          <Link
            href="#servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-medium text-zinc-800 bg-white border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400 hover:text-zinc-950 transition-all duration-200 shadow-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            <span>Ver servicios</span>
            <ArrowRight className="w-4 h-4 text-zinc-500" />
          </Link>
        </div>

      </div>
    </section>
  );
}
