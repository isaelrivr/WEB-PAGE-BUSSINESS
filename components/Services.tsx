"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "motion/react";
import { QrCode, Store, Globe, Share2, type LucideIcon } from "lucide-react";
import ResenasVisual from "./servicios/visuals/ResenasVisual";
import GoogleBusinessVisual from "./servicios/visuals/GoogleBusinessVisual";
import WebVisual from "./servicios/visuals/WebVisual";
import RedesVisual from "./servicios/visuals/RedesVisual";

interface ServiceItem {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    icon: QrCode,
    title: "Reseñas con NFC y QR",
    description:
      "Tarjetas y placas para que tus clientes dejen su reseña de Google en segundos.",
  },
  {
    number: "02",
    icon: Store,
    title: "Perfil de Google Business",
    description:
      "Lo optimizamos para que más gente te encuentre y te contacte.",
  },
  {
    number: "03",
    icon: Globe,
    title: "Páginas web",
    description:
      "Sitios rápidos, claros y hechos a la medida para tu negocio.",
  },
  {
    number: "04",
    icon: Share2,
    title: "Redes sociales",
    description:
      "Contenido y diseño constantes para mantener tu marca activa.",
  },
];

// Mensajes prellenados de WhatsApp para el enlace 'Quiero esto →'
const WHATSAPP_MESSAGES: Record<string, string> = {
  "Reseñas con NFC y QR":
    "Hola, me gustaría más información sobre el servicio de Reseñas con NFC y QR para mi negocio.",
  "Perfil de Google Business":
    "Hola, me gustaría más información sobre el servicio de Perfil de Google Business para mi negocio.",
  "Páginas web":
    "Hola, me gustaría más información sobre el servicio de Páginas web para mi negocio.",
  "Redes sociales":
    "Hola, me gustaría más información sobre el servicio de Redes sociales para mi negocio.",
};

// Degradados de fondo sutiles al 8%
const CARD_GRADIENTS = [
  "bg-gradient-to-br from-[#0EA5E9]/[0.08] via-white to-white",
  "bg-gradient-to-br from-primary/[0.08] via-white to-white",
  "bg-gradient-to-br from-[#A78BFA]/[0.08] via-white to-white",
  "bg-gradient-to-br from-[#0EA5E9]/[0.08] via-[#A78BFA]/[0.08] to-white",
];

const VISUAL_COMPONENTS = [
  ResenasVisual,
  GoogleBusinessVisual,
  WebVisual,
  RedesVisual,
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldReduceMotion = isMounted && Boolean(prefersReduced);

  // Progreso de scroll ligado a la sección de 400vh
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Suavizado con useSpring tal como se especificó: stiffness 120, damping 28, mass 0.4
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  // Seguimiento del servicio activo según el scroll para la lista y accesibilidad
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.25) {
      setActiveIndex(0);
    } else if (latest < 0.53) {
      setActiveIndex(1);
    } else if (latest < 0.81) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  // Manchas de color difuminadas de fondo: desplazamiento suave con scroll
  const blob1X = useTransform(smoothProgress, [0, 1], ["0px", "60px"]);
  const blob1Y = useTransform(smoothProgress, [0, 1], ["-20px", "80px"]);

  const blob2X = useTransform(smoothProgress, [0, 1], ["0px", "-60px"]);
  const blob2Y = useTransform(smoothProgress, [0, 1], ["30px", "-60px"]);

  // Valores de 'foco' (0 a 1) para cada visual conforme su tarjeta llega al frente
  // Tarjeta 0: el foco se completa en el primer tramo (0.0 a 0.16)
  const foco0 = useTransform(smoothProgress, [0.0, 0.16], [0, 1], {
    clamp: true,
  });
  // Tarjeta 1: el foco sube de 0 a 1 mientras la tarjeta entra al frente (0.18 a 0.32)
  const foco1 = useTransform(smoothProgress, [0.18, 0.32], [0, 1], {
    clamp: true,
  });
  // Tarjeta 2: el foco sube de 0 a 1 mientras la tarjeta entra al frente (0.46 a 0.60)
  const foco2 = useTransform(smoothProgress, [0.46, 0.6], [0, 1], {
    clamp: true,
  });
  // Tarjeta 3: el foco sube de 0 a 1 mientras la tarjeta entra al frente (0.74 a 0.88)
  const foco3 = useTransform(smoothProgress, [0.74, 0.88], [0, 1], {
    clamp: true,
  });

  // Animaciones de las tarjetas (solo transform y opacity para máximo rendimiento)
  // Tarjeta 0: Inicia al frente, se reduce a 0.92, -10% y opacidad 0.4 al entrar tarjeta 1
  const card0Y = useTransform(
    smoothProgress,
    [0, 0.18, 0.32, 0.46, 0.6, 1],
    ["0%", "0%", "-10%", "-10%", "-18%", "-18%"]
  );
  const card0Scale = useTransform(
    smoothProgress,
    [0, 0.18, 0.32, 0.46, 0.6, 1],
    [1, 1, 0.92, 0.92, 0.85, 0.85]
  );
  const card0Opacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.32, 0.46, 0.6, 0.72, 0.84, 1],
    [1, 1, 0.4, 0.4, 0.15, 0.15, 0, 0]
  );

  // Tarjeta 1: Entra de 110% a 0%, luego se reduce a 0.92, -10% y opacidad 0.4 al entrar tarjeta 2
  const card1Y = useTransform(
    smoothProgress,
    [0, 0.18, 0.32, 0.46, 0.6, 0.74, 0.88, 1],
    ["110%", "110%", "0%", "0%", "-10%", "-10%", "-18%", "-18%"]
  );
  const card1Scale = useTransform(
    smoothProgress,
    [0, 0.18, 0.32, 0.46, 0.6, 0.74, 0.88, 1],
    [1, 1, 1, 1, 0.92, 0.92, 0.85, 0.85]
  );
  const card1Opacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.2, 0.46, 0.6, 0.74, 0.88, 1],
    [0, 0, 1, 1, 0.4, 0.4, 0.15, 0.15]
  );

  // Tarjeta 2: Entra de 110% a 0%, luego se reduce a 0.92, -10% y opacidad 0.4 al entrar tarjeta 3
  const card2Y = useTransform(
    smoothProgress,
    [0, 0.46, 0.6, 0.74, 0.88, 1],
    ["110%", "110%", "0%", "0%", "-10%", "-10%"]
  );
  const card2Scale = useTransform(
    smoothProgress,
    [0, 0.46, 0.6, 0.74, 0.88, 1],
    [1, 1, 1, 1, 0.92, 0.92]
  );
  const card2Opacity = useTransform(
    smoothProgress,
    [0, 0.43, 0.48, 0.74, 0.88, 1],
    [0, 0, 1, 1, 0.4, 0.4]
  );

  // Tarjeta 3: Entra de 110% a 0% y queda al frente
  const card3Y = useTransform(
    smoothProgress,
    [0, 0.74, 0.88, 1],
    ["110%", "110%", "0%", "0%"]
  );
  const card3Scale = useTransform(smoothProgress, [0, 1], [1, 1]);
  const card3Opacity = useTransform(
    smoothProgress,
    [0, 0.71, 0.76, 1],
    [0, 0, 1, 1]
  );

  // Lista numerada (columna izquierda): el elemento activo resalta al 100% y se desplaza a la derecha
  const list0Opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.3, 1],
    [1, 1, 0.35, 0.35]
  );
  const list0X = useTransform(
    smoothProgress,
    [0, 0.2, 0.3, 1],
    [10, 10, 0, 0]
  );

  const list1Opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.3, 0.48, 0.58, 1],
    [0.35, 0.35, 1, 1, 0.35, 0.35]
  );
  const list1X = useTransform(
    smoothProgress,
    [0, 0.2, 0.3, 0.48, 0.58, 1],
    [0, 0, 10, 10, 0, 0]
  );

  const list2Opacity = useTransform(
    smoothProgress,
    [0, 0.48, 0.58, 0.76, 0.86, 1],
    [0.35, 0.35, 1, 1, 0.35, 0.35]
  );
  const list2X = useTransform(
    smoothProgress,
    [0, 0.48, 0.58, 0.76, 0.86, 1],
    [0, 0, 10, 10, 0, 0]
  );

  const list3Opacity = useTransform(
    smoothProgress,
    [0, 0.76, 0.86, 1],
    [0.35, 0.35, 1, 1]
  );
  const list3X = useTransform(
    smoothProgress,
    [0, 0.76, 0.86, 1],
    [0, 0, 10, 10]
  );

  const cardTransforms = [
    { y: card0Y, scale: card0Scale, opacity: card0Opacity, zIndex: 10, foco: foco0 },
    { y: card1Y, scale: card1Scale, opacity: card1Opacity, zIndex: 20, foco: foco1 },
    { y: card2Y, scale: card2Scale, opacity: card2Opacity, zIndex: 30, foco: foco2 },
    { y: card3Y, scale: card3Scale, opacity: card3Opacity, zIndex: 40, foco: foco3 },
  ];

  const listTransforms = [
    { opacity: list0Opacity, x: list0X },
    { opacity: list1Opacity, x: list1X },
    { opacity: list2Opacity, x: list2X },
    { opacity: list3Opacity, x: list3X },
  ];

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const targets = [0.05, 0.38, 0.67, 0.95];
    const targetScroll = sectionTop + targets[index] * totalScrollable;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // Modo accesible: cuadrícula normal estática si el usuario tiene activado 'reducir movimiento'
  if (shouldReduceMotion) {
    return (
      <section
        id="servicios"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border bg-surface/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center space-y-3 sm:space-y-4 mb-16 sm:mb-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary">
              Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main leading-tight">
              Lo que hacemos por tu negocio
            </h2>
            <p className="text-base sm:text-lg text-text-muted font-normal leading-relaxed">
              Soluciones prácticas para ganar visibilidad local y fortalecer la presencia digital de tu empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isCeleste = index % 2 === 0;
              const VisualComponent = VISUAL_COMPONENTS[index];
              const gradientClass = CARD_GRADIENTS[index];

              return (
                <div
                  key={service.title}
                  className={`p-6 sm:p-7 rounded-[2rem] ${gradientClass} border border-border shadow-xl shadow-indigo-500/5 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          isCeleste
                            ? "bg-[#0EA5E9]/10 text-[#0EA5E9]"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <span className="text-3xl font-extrabold text-primary/15 font-sans select-none tracking-tight">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-text-main tracking-tight mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Visual ilustrativo en estado final sin animación */}
                    <div className="mb-4">
                      <VisualComponent foco={smoothProgress} reducedMotion={true} />
                    </div>
                  </div>

                  {/* Enlace 'Quiero esto →' a WhatsApp con mensaje prellenado */}
                  <div className="pt-3.5 border-t border-border/60 flex items-center justify-between">
                    <a
                      href={`https://wa.me/5210000000000?text=${encodeURIComponent(
                        WHATSAPP_MESSAGES[service.title] ||
                          "Hola, me gustaría más información sobre sus servicios."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      <span>Quiero esto</span>
                      <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                        →
                      </span>
                    </a>
                    <span className="text-xs font-mono font-medium text-text-muted/60">
                      Servicio {service.number}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Versión animada ligada al scroll
  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative h-[400vh] border-t border-border bg-surface/30"
    >
      {/* Contenedor Sticky que se mantiene fijo mientras el usuario hace scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-4 sm:px-6 lg:px-8">
        {/* Manchas de color difuminadas de fondo (lila #A78BFA y celeste #0EA5E9) */}
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute -top-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] rounded-full bg-[#A78BFA]/15 blur-3xl pointer-events-none select-none"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          className="absolute -bottom-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] rounded-full bg-[#0EA5E9]/15 blur-3xl pointer-events-none select-none"
          aria-hidden="true"
        />

        {/* Contenido principal en dos columnas (escritorio) o una columna (celular) */}
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Columna Izquierda (Escritorio) / Arriba (Celular) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary w-fit mb-3">
                  Servicios
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-text-main leading-tight mb-3">
                  Lo que hacemos por tu negocio
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-text-muted font-normal leading-relaxed max-w-md">
                  Soluciones prácticas para ganar visibilidad local y fortalecer la presencia digital de tu empresa.
                </p>
              </div>

              {/* Lista numerada interactiva (solo en escritorio) */}
              <div
                className="hidden lg:flex flex-col space-y-3 pt-6 mt-6 border-t border-border/70"
                role="tablist"
                aria-label="Lista de servicios"
              >
                {SERVICES.map((service, index) => {
                  const isCeleste = index % 2 === 0;
                  const isActive = activeIndex === index;
                  return (
                    <motion.button
                      key={service.title}
                      type="button"
                      onClick={() => scrollToCard(index)}
                      style={{
                        opacity: listTransforms[index].opacity,
                        x: listTransforms[index].x,
                      }}
                      className="group flex items-center gap-4 text-left p-2.5 rounded-xl transition-colors hover:bg-white/80 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                    >
                      <span
                        className={`text-xs font-mono font-bold px-2 py-1 rounded-md transition-colors ${
                          isActive
                            ? isCeleste
                              ? "bg-[#0EA5E9] text-white"
                              : "bg-primary text-white"
                            : isCeleste
                            ? "bg-[#0EA5E9]/10 text-[#0EA5E9]"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {service.number}
                      </span>
                      <span
                        className={`text-base font-semibold tracking-tight transition-colors ${
                          isActive
                            ? "text-text-main"
                            : "text-text-muted group-hover:text-text-main"
                        }`}
                      >
                        {service.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Columna Derecha: Tarjetas apiladas con sus respectivos visuales */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-xl h-[470px] sm:h-[500px] lg:h-[520px]">
                {SERVICES.map((service, index) => {
                  const Icon = service.icon;
                  const isCeleste = index % 2 === 0;
                  const transform = cardTransforms[index];
                  const VisualComponent = VISUAL_COMPONENTS[index];
                  const gradientClass = CARD_GRADIENTS[index];

                  return (
                    <motion.div
                      key={service.title}
                      style={{
                        y: transform.y,
                        scale: transform.scale,
                        opacity: transform.opacity,
                        zIndex: transform.zIndex,
                        transformOrigin: "top center",
                      }}
                      className={`absolute inset-0 w-full h-full rounded-[2rem] ${gradientClass} border border-indigo-100/70 shadow-xl shadow-indigo-500/10 p-5 sm:p-7 flex flex-col justify-between select-none`}
                    >
                      <div>
                        {/* Cabecera de la tarjeta: Icono con recuadro y número grande en índigo tenue */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-xs ${
                              isCeleste
                                ? "bg-[#0EA5E9]/10 text-[#0EA5E9]"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                          </div>
                          <span className="text-4xl sm:text-5xl font-extrabold text-primary/15 font-sans tracking-tight select-none">
                            {service.number}
                          </span>
                        </div>

                        {/* Título y descripción */}
                        <h3 className="text-xl sm:text-2xl font-bold text-text-main tracking-tight mb-1 sm:mb-1.5">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {service.description}
                        </p>
                      </div>

                      {/* Visual interactivo exclusivo de este servicio */}
                      <div className="my-auto py-2">
                        <VisualComponent foco={transform.foco} reducedMotion={false} />
                      </div>

                      {/* Pie: Enlace 'Quiero esto →' a WhatsApp con mensaje prellenado */}
                      <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                        <a
                          href={`https://wa.me/5210000000000?text=${encodeURIComponent(
                            WHATSAPP_MESSAGES[service.title] ||
                              "Hola, me gustaría más información sobre sus servicios."
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-[#4338CA] transition-colors group/link"
                        >
                          <span>Quiero esto</span>
                          <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                            →
                          </span>
                        </a>
                        <span className="text-xs font-mono font-medium text-text-muted/60">
                          Servicio {service.number}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Barra de progreso delgada en el borde inferior que se llena de izquierda a derecha */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-border/40 z-20">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full bg-gradient-to-r from-primary via-[#0EA5E9] to-[#A78BFA] origin-left"
          />
        </div>
      </div>
    </section>
  );
}
