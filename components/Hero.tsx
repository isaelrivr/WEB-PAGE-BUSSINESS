import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function Hero() {
  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  return (
    <section className="relative isolate flex-1 flex items-center justify-center -mt-20 pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-28 md:pb-36 min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      {/* FONDO DEL HERO */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Solo se funde con blanco en la parte baja; el resto del fondo queda con todo su color */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white" />
      </div>

      {/* Tarjeta de cristal con el contenido */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/70 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.25)] px-6 py-10 sm:px-12 sm:py-14">
        {/* Titular con "reseñas" resaltada en índigo */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-main leading-[1.12] text-balance animate-fade-in-up">
          Más <span className="text-primary">reseñas</span> y mejor presencia online para tu negocio local
        </h1>

        {/* Subtítulo con color explícito para que no dependa de transparencias */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-[#374151] max-w-2xl leading-relaxed font-medium text-pretty animate-fade-in-up animation-delay-150">
          Ayudamos a pequeños negocios a captar clientes con optimización de reseñas en Google, manejo de redes sociales y páginas web profesionales.
        </p>

        {/* Botones */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto animate-fade-in-up animation-delay-300">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium text-white bg-primary hover:bg-primary/90 transition-[background-color,transform,box-shadow] duration-200 shadow-md hover:shadow-lg active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Escríbenos por WhatsApp (abre en una nueva pestaña)"
          >
            <MessageCircle className="w-5 h-5 fill-current" aria-hidden="true" />
            <span>Escríbenos por WhatsApp</span>
          </a>

          <Link
            href="#servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-medium text-primary bg-white/80 backdrop-blur-sm border-2 border-primary hover:bg-primary/5 transition-[background-color,transform,box-shadow] duration-200 shadow-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Ver servicios</span>
            <ArrowRight className="w-4 h-4 text-primary" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}