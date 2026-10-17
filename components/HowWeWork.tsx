"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowRight, ArrowDown } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Revisamos tu perfil de Google, tus redes y tu página para ver qué está funcionando y qué no.",
  },
  {
    number: "02",
    title: "Implementación",
    description:
      "Ponemos en marcha lo acordado, ya sean tarjetas NFC, rediseño de perfil, web o contenido.",
  },
  {
    number: "03",
    title: "Seguimiento",
    description:
      "Medimos resultados y ajustamos cada mes para que sigas mejorando.",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa%20gratis%20para%20mi%20negocio";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="como-trabajamos"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-border bg-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div
          className={`max-w-2xl mx-auto text-center space-y-3 sm:space-y-4 mb-16 sm:mb-20 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main leading-tight">
            Así trabajamos contigo
          </h2>
          <p className="text-base sm:text-lg text-text-muted font-normal leading-relaxed">
            Un método directo, transparente y enfocado en que tu negocio obtenga resultados paso a paso.
          </p>
        </div>

        {/* Pasos conectados visualmente */}
        <div className="relative">
          {/* Contenedor de pasos: horizontal en escritorio (md:grid-cols-3), vertical en celular */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 relative">
            {STEPS.map((step, index) => (
              <div key={step.number} className="relative flex flex-col">
                <div
                  style={{
                    transitionDelay: isVisible
                      ? `${(index + 1) * 180}ms`
                      : "0ms",
                  }}
                  className={`relative z-10 flex-1 p-7 sm:p-8 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:shadow-xs transition-all duration-700 ease-out flex flex-col justify-between ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    {/* Número distintivo */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base tracking-wider shadow-xs">
                        {step.number}
                      </span>
                      <span className="text-xs uppercase font-semibold tracking-wider text-text-muted">
                        Paso {index + 1}
                      </span>
                    </div>

                    {/* Título del paso (peso 700, texto principal) */}
                    <h3 className="text-xl font-bold text-text-main tracking-tight mb-3">
                      {step.title}
                    </h3>

                    {/* Descripción (peso 400, texto secundario) */}
                    <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Conector visual entre pasos (celeste decorativo) */}
                {index < STEPS.length - 1 && (
                  <>
                    {/* Flecha horizontal en escritorio */}
                    <div className="hidden md:flex absolute top-1/2 -right-3.5 lg:-right-4.5 -translate-y-1/2 z-20">
                      <div className="w-7 h-7 rounded-full bg-background border border-border shadow-xs flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-accent" />
                      </div>
                    </div>

                    {/* Flecha vertical en celular */}
                    <div className="md:hidden flex items-center justify-center my-3">
                      <div className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center">
                        <ArrowDown className="w-3.5 h-3.5 text-accent" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Botón final para agendar asesoría gratuita (Botón principal: índigo con texto blanco) */}
        <div
          style={{
            transitionDelay: isVisible ? "700ms" : "0ms",
          }}
          className={`mt-16 sm:mt-20 text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-medium text-white bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Agenda una asesoría gratis por WhatsApp (abre en una nueva pestaña)"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Agenda una asesoría gratis</span>
          </a>
        </div>
      </div>
    </section>
  );
}
