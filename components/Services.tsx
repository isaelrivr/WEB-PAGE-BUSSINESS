"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  useMotionValue,
  useInView,
} from "motion/react";
import { QrCode, Store, Globe, Share2, type LucideIcon } from "lucide-react";
import ResenasScene from "@/components/scenes/ResenasScene";
import GoogleScene from "@/components/scenes/GoogleScene";
import WebScene from "@/components/scenes/WebScene";
import RedesScene from "@/components/scenes/RedesScene";

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

const SCENE_COMPONENTS = [
  ResenasScene,
  GoogleScene,
  WebScene,
  RedesScene,
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isServicesInView = useInView(sectionRef, { margin: "200px 0px" });
  const prefersReduced = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const prevProgressRef = useRef(0);
  const isScrollingDownRef = useRef(true);

  // MotionValue estático en t=1 para modo accesible
  const staticT = useMotionValue(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldReduceMotion = isMounted && Boolean(prefersReduced);

  // Progreso de scroll ligado a la sección de 400vh
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Suavizado con useSpring: stiffness 120, damping 28, mass 0.4
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  // Seguimiento del servicio activo según el scroll sin despachos redundantes
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    isScrollingDownRef.current = latest >= prevProgressRef.current;
    prevProgressRef.current = latest;
    const nextIndex =
      latest < 0.25 ? 0 : latest < 0.53 ? 1 : latest < 0.81 ? 2 : 3;
    if (activeIndexRef.current !== nextIndex) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  // Manchas de color difuminadas de fondo
  const blob1X = useTransform(smoothProgress, [0, 1], ["0px", "60px"]);
  const blob1Y = useTransform(smoothProgress, [0, 1], ["-20px", "80px"]);

  const blob2X = useTransform(smoothProgress, [0, 1], ["0px", "-60px"]);
  const blob2Y = useTransform(smoothProgress, [0, 1], ["30px", "-60px"]);

  // t de cada escena derivado del scroll: useTransform(progress, [b - 0.35*step, c - 0.1*step], [0, 1])
  const step = 0.14;

  // Tarjeta 0: inicia al frente en scroll 0; termina antes de que la tarjeta 1 empiece a reemplazarla (c = 0.18)
  const t0 = useTransform(smoothProgress, [0, 0.18 - 0.1 * step], [0, 1], {
    clamp: true,
  });

  // Tarjeta 1: entra a=0.18, llega al frente b=0.32, salida c=0.46
  const t1 = useTransform(
    smoothProgress,
    [0.32 - 0.35 * step, 0.46 - 0.1 * step],
    [0, 1],
    { clamp: true }
  );

  // Tarjeta 2: entra a=0.46, llega al frente b=0.60, salida c=0.74
  const t2 = useTransform(
    smoothProgress,
    [0.6 - 0.35 * step, 0.74 - 0.1 * step],
    [0, 1],
    { clamp: true }
  );

  // Tarjeta 3: entra a=0.74, llega al frente b=0.88, final = 1
  const t3 = useTransform(smoothProgress, [0.88 - 0.35 * step, 1], [0, 1], {
    clamp: true,
  });

  // Animaciones de posicionamiento de las tarjetas
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

  // Lista numerada (columna izquierda): el elemento activo resalta al 100%
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
    { y: card0Y, scale: card0Scale, opacity: card0Opacity, zIndex: 10, t: t0 },
    { y: card1Y, scale: card1Scale, opacity: card1Opacity, zIndex: 20, t: t1 },
    { y: card2Y, scale: card2Scale, opacity: card2Opacity, zIndex: 30, t: t2 },
    { y: card3Y, scale: card3Scale, opacity: card3Opacity, zIndex: 40, t: t3 },
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

  // Modo accesible: cuadrícula normal estática con las escenas en t=1
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
              const SceneComponent = SCENE_COMPONENTS[index];
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

                    {/* Escena en celular estático t=1 */}
                    <div className="my-4 flex justify-center">
                      <div className="w-[220px] h-[340px] rounded-[1.75rem] bg-[#111827] p-2 shadow-md border-2 border-slate-800/80 flex flex-col justify-between shrink-0 select-none">
                        <div className="w-14 h-2.5 bg-black rounded-full mx-auto shrink-0 mb-1" />
                        <div className="relative flex-1 w-full rounded-[1.25rem] bg-white overflow-hidden p-1.5 flex flex-col border border-slate-200/50">
                          <SceneComponent t={staticT} reducedMotion={true} />
                        </div>
                        <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto mt-1 shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Enlace WhatsApp */}
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

  // Versión interactiva ligada al scroll
  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative h-[400vh] border-t border-border bg-surface/30"
    >
      {/* Contenedor Sticky fijo durante el scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8">
        {/* Manchas difuminadas de fondo con radial-gradient nativo (sin filtros blur-3xl) */}
        <motion.div
          style={{ x: blob1X, y: blob1Y, willChange: "transform" }}
          className="absolute -top-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] rounded-full pointer-events-none select-none [background:radial-gradient(circle,rgba(167,139,250,0.18)_0%,transparent_70%)]"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y, willChange: "transform" }}
          className="absolute -bottom-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] rounded-full pointer-events-none select-none [background:radial-gradient(circle,rgba(14,165,233,0.18)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Columna Izquierda: Encabezado y lista de selección */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary w-fit mb-2 sm:mb-3">
                  Servicios
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-main leading-tight mb-2 sm:mb-3">
                  Lo que hacemos por tu negocio
                </h2>
                <p className="text-xs sm:text-sm lg:text-base text-text-muted font-normal leading-relaxed max-w-md">
                  Soluciones prácticas para ganar visibilidad local y fortalecer la presencia digital de tu empresa.
                </p>
              </div>

              {/* Lista interactiva (solo escritorio) */}
              <div
                className="hidden lg:flex flex-col space-y-2.5 pt-5 mt-5 border-t border-border/70"
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
                      className="group flex items-center gap-3.5 text-left p-2 rounded-xl transition-colors hover:bg-white/80 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                        className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${
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

            {/* Columna Derecha: Tarjetas apiladas con dos columnas en escritorio y marco de celular */}
            <div className="lg:col-span-8 flex items-center justify-center">
              <div className="relative w-full max-w-lg lg:max-w-3xl xl:max-w-4xl h-[560px] sm:h-[580px] lg:h-[520px]">
                {SERVICES.map((service, index) => {
                  const Icon = service.icon;
                  const isCeleste = index % 2 === 0;
                  const transform = cardTransforms[index];
                  const SceneComponent = SCENE_COMPONENTS[index];
                  const gradientClass = CARD_GRADIENTS[index];

                  // Montar escena solo en la tarjeta activa y la adyacente según dirección de scroll
                  const adjacentIndex = isScrollingDownRef.current
                    ? Math.min(activeIndex + 1, SERVICES.length - 1)
                    : Math.max(activeIndex - 1, 0);

                  const shouldMountScene =
                    isServicesInView && (index === activeIndex || index === adjacentIndex);

                  return (
                    <motion.div
                      key={service.title}
                      style={{
                        y: transform.y,
                        scale: transform.scale,
                        opacity: transform.opacity,
                        zIndex: transform.zIndex,
                        transformOrigin: "top center",
                        willChange: "transform, opacity",
                      }}
                      className={`absolute inset-0 w-full h-full rounded-[2rem] ${gradientClass} border border-indigo-100/70 shadow-lg shadow-indigo-500/5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between select-none overflow-hidden`}
                    >
                      <div className="h-full flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 items-center justify-between">
                        {/* Columna Izquierda (Escritorio): Número, Icono, Título, Descripción y Enlace WhatsApp */}
                        <div className="w-full lg:col-span-7 flex flex-col justify-between h-full py-1">
                          <div>
                            {/* Cabecera: Icono y número */}
                            <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                              <div
                                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-xs ${
                                  isCeleste
                                    ? "bg-[#0EA5E9]/10 text-[#0EA5E9]"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                <Icon className="w-5 h-5 stroke-[1.8]" />
                              </div>
                              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary/15 font-sans tracking-tight select-none">
                                {service.number}
                              </span>
                            </div>

                            {/* Título y descripción */}
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-main tracking-tight mb-1.5 sm:mb-2">
                              {service.title}
                            </h3>
                            <p className="text-xs sm:text-sm lg:text-base text-text-muted font-normal leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                              {service.description}
                            </p>
                          </div>

                          {/* Enlace 'Quiero esto →' a WhatsApp */}
                          <div className="pt-2.5 sm:pt-3 border-t border-border/60 flex items-center justify-between">
                            <a
                              href={`https://wa.me/5210000000000?text=${encodeURIComponent(
                                WHATSAPP_MESSAGES[service.title] ||
                                  "Hola, me gustaría más información sobre sus servicios."
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm lg:text-base font-semibold text-primary hover:text-[#4338CA] transition-colors group/link"
                            >
                              <span>Quiero esto</span>
                              <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                                →
                              </span>
                            </a>
                            <span className="text-[11px] sm:text-xs font-mono font-medium text-text-muted/60">
                              Servicio {service.number}
                            </span>
                          </div>
                        </div>

                        {/* Columna Derecha (Escritorio) / Abajo (Celular): Marco de celular con la escena */}
                        <div className="w-full lg:col-span-5 flex items-center justify-center shrink-0">
                          <div className="w-[230px] sm:w-[250px] lg:w-[285px] h-[330px] sm:h-[360px] lg:h-[465px] rounded-[2rem] lg:rounded-[2.5rem] bg-[#111827] p-2 lg:p-2.5 shadow-lg shadow-indigo-950/20 border-4 border-slate-800/80 relative flex flex-col justify-between shrink-0 select-none">
                            {/* Notch */}
                            <div className="w-16 lg:w-20 h-3 lg:h-3.5 bg-black rounded-full mx-auto shrink-0 mb-1 z-30" />

                            {/* Pantalla del celular con la escena */}
                            <div className="relative flex-1 w-full rounded-[1.5rem] lg:rounded-[2rem] bg-white overflow-hidden p-1.5 lg:p-2 flex flex-col border border-slate-200/50">
                              {shouldMountScene ? (
                                <SceneComponent
                                  t={transform.t}
                                  reducedMotion={false}
                                />
                              ) : (
                                <div className="h-full w-full bg-slate-50 flex items-center justify-center">
                                  <div className="w-5 h-5 rounded-full bg-slate-200 animate-pulse" />
                                </div>
                              )}
                            </div>

                            {/* Barra inferior del marco */}
                            <div className="w-20 lg:w-24 h-1 bg-slate-700 rounded-full mx-auto mt-1 shrink-0" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Barra de progreso inferior */}
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
