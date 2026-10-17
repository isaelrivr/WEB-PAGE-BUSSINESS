"use client";

import { useEffect, useRef, useState } from "react";
import { QrCode, Store, Globe, Share2 } from "lucide-react";

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accentClass: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: QrCode,
    title: "Reseñas con NFC y QR",
    description:
      "Tarjetas y placas para que tus clientes dejen su reseña de Google en segundos.",
    accentClass: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white",
  },
  {
    icon: Store,
    title: "Perfil de Google Business",
    description:
      "Lo optimizamos para que más gente te encuentre y te contacte.",
    accentClass: "bg-highlight/15 text-primary group-hover:bg-primary group-hover:text-white",
  },
  {
    icon: Globe,
    title: "Páginas web",
    description:
      "Sitios rápidos, claros y hechos a la medida para tu negocio.",
    accentClass: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white",
  },
  {
    icon: Share2,
    title: "Redes sociales",
    description:
      "Contenido y diseño constantes para mantener tu marca activa.",
    accentClass: "bg-highlight/15 text-primary group-hover:bg-primary group-hover:text-white",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-border bg-surface/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de la sección */}
        <div
          className={`max-w-2xl mx-auto text-center space-y-3 sm:space-y-4 mb-16 sm:mb-20 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main leading-tight">
            Lo que hacemos por tu negocio
          </h2>
          <p className="text-base sm:text-lg text-text-muted font-normal leading-relaxed">
            Soluciones prácticas para ganar visibilidad local y fortalecer la presencia digital de tu empresa.
          </p>
        </div>

        {/* Cuadrícula responsiva: 1 col celular, 2 col tableta, 4 col escritorio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                style={{
                  transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
                }}
                className={`group p-6 sm:p-7 rounded-2xl bg-background border border-border shadow-xs hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div>
                  {/* Icono con fondo suave de baja opacidad (celeste / lila como decoración) */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${service.accentClass}`}
                  >
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Título de la tarjeta (peso 700, texto principal) */}
                  <h3 className="text-lg font-bold text-text-main tracking-tight mb-2">
                    {service.title}
                  </h3>

                  {/* Descripción de 2 líneas (peso 400, texto secundario) */}
                  <p className="text-sm text-text-muted font-normal leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
