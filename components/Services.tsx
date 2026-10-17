"use client";

import { useEffect, useRef, useState } from "react";
import { QrCode, Store, Globe, Share2 } from "lucide-react";

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: QrCode,
    title: "Reseñas con NFC y QR",
    description:
      "Tarjetas y placas para que tus clientes dejen su reseña de Google en segundos.",
  },
  {
    icon: Store,
    title: "Perfil de Google Business",
    description:
      "Lo optimizamos para que más gente te encuentre y te contacte.",
  },
  {
    icon: Globe,
    title: "Páginas web",
    description:
      "Sitios rápidos, claros y hechos a la medida para tu negocio.",
  },
  {
    icon: Share2,
    title: "Redes sociales",
    description:
      "Contenido y diseño constantes para mantener tu marca activa.",
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
      className="py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-zinc-100 bg-zinc-50/50"
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
            Lo que hacemos por tu negocio
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
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
                className={`group p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-xs hover:border-zinc-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div>
                  {/* Icono con contenedor sobrio y transición al hover */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center mb-5 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Título de la tarjeta */}
                  <h3 className="text-lg font-semibold text-zinc-900 tracking-tight mb-2">
                    {service.title}
                  </h3>

                  {/* Descripción de 2 líneas */}
                  <p className="text-sm text-zinc-600 font-normal leading-relaxed">
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
