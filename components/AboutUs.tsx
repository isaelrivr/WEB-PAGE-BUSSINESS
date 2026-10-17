"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, ShieldCheck, Users, User } from "lucide-react";

interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accentClass: string;
}

const VALUES: ValueItem[] = [
  {
    icon: Lightbulb,
    title: "Claridad",
    description: "Explicamos todo sin tecnicismos.",
    accentClass: "bg-accent/10 text-accent",
  },
  {
    icon: ShieldCheck,
    title: "Honestidad",
    description: "Nunca usamos reseñas falsas ni prometemos lo imposible.",
    accentClass: "bg-highlight/15 text-primary",
  },
  {
    icon: Users,
    title: "Cercanía",
    description: "Trato directo y seguimiento constante.",
    accentClass: "bg-accent/10 text-accent",
  },
];

export default function AboutUs() {
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
      id="nosotros"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-border bg-surface/40"
    >
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div
          className={`max-w-2xl mx-auto text-center space-y-4 mb-16 sm:mb-20 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main leading-tight">
            Somos un equipo que entiende a los negocios pequeños
          </h2>
          <p className="text-base sm:text-lg text-text-muted font-normal leading-relaxed">
            Combinamos habilidades técnicas y de diseño para ayudar a negocios locales a destacar en internet con soluciones directas y sin complicaciones.
          </p>
        </div>

        {/* 3 Valores en tarjetas pequeñas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
          {VALUES.map((val, index) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                style={{
                  transitionDelay: isVisible
                    ? `${(index + 1) * 120}ms`
                    : "0ms",
                }}
                className={`p-6 sm:p-7 rounded-2xl bg-background border border-border shadow-xs hover:border-primary/40 hover:shadow-sm transition-all duration-300 flex flex-col ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${val.accentClass}`}
                >
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-text-main tracking-tight mb-1.5">
                  {val.title}
                </h3>
                <p className="text-sm text-text-muted font-normal leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Espacio reservado para fotos del equipo */}
        <div
          style={{
            transitionDelay: isVisible ? "450ms" : "0ms",
          }}
          className={`pt-10 sm:pt-12 border-t border-border/80 text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-border/60 border border-border flex flex-col items-center justify-center gap-1.5 shadow-inner">
                  <User className="w-6 h-6 text-text-muted/60" />
                  <span className="text-[11px] font-normal text-text-muted tracking-tight">
                    Foto pendiente
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
