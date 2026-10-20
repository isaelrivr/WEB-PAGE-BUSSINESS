"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  type MotionValue,
} from "motion/react";
import {
  MessageCircle,
  ArrowRight,
  Play,
  Pause,
  Wifi,
  MapPin,
  Globe,
  Share2,
  Star,
} from "lucide-react";

import ResenasScene from "@/components/scenes/ResenasScene";
import GoogleScene from "@/components/scenes/GoogleScene";
import WebScene from "@/components/scenes/WebScene";
import RedesScene from "@/components/scenes/RedesScene";

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export interface HeroSlideItem {
  badge: string;
  headline: string;
  subtitle: string;
  whatsappMessage: string;
  icon: typeof Wifi;
  scene: React.ComponentType<{ t: MotionValue<number>; reducedMotion?: boolean }>;
  dotColor: string;
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    badge: "Reseñas con NFC y QR",
    headline: "Que tus clientes te dejen su reseña en segundos",
    subtitle:
      "Tarjetas y placas NFC con QR que llevan directo a tu perfil de Google.",
    whatsappMessage:
      "Hola, me interesa el servicio de reseñas con NFC y QR para mi negocio",
    icon: Wifi,
    scene: ResenasScene,
    dotColor: "bg-[#0EA5E9]",
  },
  {
    badge: "Perfil de Google Business",
    headline: "Que te encuentren cuando te buscan cerca",
    subtitle:
      "Optimizamos tu perfil para que más gente te vea, te llame y llegue a tu negocio.",
    whatsappMessage:
      "Hola, me interesa el servicio de perfil de Google Business para mi negocio",
    icon: MapPin,
    scene: GoogleScene,
    dotColor: "bg-primary",
  },
  {
    badge: "Páginas web",
    headline: "Una página clara, rápida y hecha para tu negocio",
    subtitle:
      "Sitios a la medida que explican lo que haces y facilitan que te contacten.",
    whatsappMessage:
      "Hola, me interesa el servicio de páginas web para mi negocio",
    icon: Globe,
    scene: WebScene,
    dotColor: "bg-[#0EA5E9]",
  },
  {
    badge: "Redes sociales",
    headline: "Redes activas que mantienen tu marca presente",
    subtitle:
      "Contenido y diseño constantes, con un calendario para que tu marca no desaparezca.",
    whatsappMessage:
      "Hola, me interesa el servicio de redes sociales para mi negocio",
    icon: Share2,
    scene: RedesScene,
    dotColor: "bg-primary",
  },
];

interface HeroSlidesProps {
  isHeroInView: boolean;
  shouldReduceMotion: boolean;
  textScrollY?: MotionValue<number>;
  textScrollOpacity?: MotionValue<number>;
  phoneScrollScale?: MotionValue<number>;
  phoneScrollY?: MotionValue<number>;
  rotateX?: MotionValue<number>;
  rotateY?: MotionValue<number>;
  chip1X?: MotionValue<number>;
  chip1Y?: MotionValue<number>;
  chip2X?: MotionValue<number>;
  chip2Y?: MotionValue<number>;
  chip3X?: MotionValue<number>;
  chip3Y?: MotionValue<number>;
}

export default function HeroSlides({
  isHeroInView,
  shouldReduceMotion,
  textScrollY,
  textScrollOpacity,
  phoneScrollScale,
  phoneScrollY,
  rotateX,
  rotateY,
  chip1X,
  chip1Y,
  chip2X,
  chip2Y,
  chip3X,
  chip3Y,
}: HeroSlidesProps) {
  // Estado único sincronizado: activeIndex (0 a 3) y t (0 a 1)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isHoveredText, setIsHoveredText] = useState(false);
  const [isHoveredPhone, setIsHoveredPhone] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const t = useMotionValue(0);

  // Control de pestaña activa / oculta
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const isPaused =
    isHoveredText ||
    isHoveredPhone ||
    !isTabVisible ||
    !isHeroInView ||
    isManuallyPaused ||
    shouldReduceMotion;

  // Refs para controlar el ciclo sin reiniciar t en hover/pausa
  const animControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isCompletedRef = useRef(false);
  const pauseTimerStartedAtRef = useRef(0);
  const remainingPauseDurationRef = useRef(1500);
  const isPausedRef = useRef(false);

  isPausedRef.current = isPaused;

  const startPauseCountdown = useCallback((delay: number) => {
    pauseTimerStartedAtRef.current = Date.now();
    remainingPauseDurationRef.current = delay;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, delay);
  }, []);

  // Efecto 1: Se ejecuta al cambiar activeIndex o si cambia shouldReduceMotion
  useEffect(() => {
    if (shouldReduceMotion) {
      t.set(1);
      return;
    }

    t.set(0);
    isCompletedRef.current = false;
    remainingPauseDurationRef.current = 1500;

    const controls = animate(t, 1, {
      duration: 5,
      ease: "linear",
      onComplete: () => {
        isCompletedRef.current = true;
        t.set(1);
        if (!isPausedRef.current) {
          startPauseCountdown(1500);
        }
      },
    });

    animControlsRef.current = controls;

    if (isPausedRef.current) {
      controls.pause();
    }

    return () => {
      controls.stop();
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [activeIndex, shouldReduceMotion, startPauseCountdown, t]);

  // Efecto 2: Pausar y reanudar sin reiniciar t a 0
  useEffect(() => {
    if (shouldReduceMotion) return;

    if (isPaused) {
      if (!isCompletedRef.current) {
        animControlsRef.current?.pause();
      } else if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
        const elapsed = Date.now() - pauseTimerStartedAtRef.current;
        remainingPauseDurationRef.current = Math.max(
          0,
          remainingPauseDurationRef.current - elapsed
        );
      }
    } else {
      if (!isCompletedRef.current) {
        animControlsRef.current?.play();
      } else if (!pauseTimeoutRef.current && remainingPauseDurationRef.current > 0) {
        startPauseCountdown(remainingPauseDurationRef.current);
      }
    }
  }, [isPaused, shouldReduceMotion, startPauseCountdown]);

  const handleSelectSlide = useCallback((idx: number) => {
    setActiveIndex(idx);
    setIsManuallyPaused(false);
  }, []);

  const handleTogglePlayPause = useCallback(() => {
    setIsManuallyPaused((prev) => !prev);
  }, []);

  const activeSlide = HERO_SLIDES[activeIndex];
  const ActiveSceneComponent = activeSlide.scene;

  const whatsappUrl = `https://wa.me/5210000000000?text=${encodeURIComponent(
    activeSlide.whatsappMessage
  )}`;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_SMOOTH }}
      className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center"
    >
      {/* 
        COLUMNA IZQUIERDA: TEXTO SINCRONIZADO
        Las 4 versiones se apilan en la misma celda de grid (col-start-1 row-start-1)
        para que la altura sea la de la versión más larga y no haya saltos de layout (CLS = 0).
      */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: textScrollY,
                opacity: textScrollOpacity,
              }
        }
        onMouseEnter={() => setIsHoveredText(true)}
        onMouseLeave={() => setIsHoveredText(false)}
        className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0 w-full"
      >
        {/* H1 fijo para SEO / accesibilidad */}
        <h1 className="sr-only">
          Más reseñas y mejor presencia online para tu negocio local
        </h1>

        {/* Rejilla de apilamiento para evitar saltos de layout */}
        <div className="grid grid-cols-1 grid-rows-1 w-full">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = activeIndex === idx;
            const words = slide.headline.split(" ");
            const SlideIcon = slide.icon;

            return (
              <div
                key={idx}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 transition-[opacity,visibility] duration-250 ${
                  isActive
                    ? "opacity-100 visible pointer-events-auto z-10"
                    : "opacity-0 invisible pointer-events-none z-0"
                } flex flex-col items-center lg:items-start text-center lg:text-left`}
              >
                {/* Etiqueta (píldora con icono) que se desliza */}
                <motion.div
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: -8, scale: 0.95 }
                  }
                  transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs mb-4 text-xs font-bold text-slate-700"
                >
                  <span className={`w-2 h-2 rounded-full ${slide.dotColor}`} />
                  <SlideIcon className="w-3.5 h-3.5 text-primary" />
                  <span>{slide.badge}</span>
                </motion.div>

                {/* Titular visible: entrada palabra por palabra con stagger enriquecido */}
                <h2
                  aria-hidden="true"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-main leading-[1.12]"
                >
                  {words.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="inline-block overflow-hidden mr-[0.24em] last:mr-0"
                    >
                      <motion.span
                        initial={false}
                        animate={
                          isActive
                            ? { opacity: 1, y: 0, rotateX: 0 }
                            : { opacity: 0, y: 16, rotateX: 8 }
                        }
                        transition={{
                          duration: 0.35,
                          delay: isActive ? Math.min(wIdx * 0.038, 0.32) : 0,
                          ease: EASE_SMOOTH,
                        }}
                        style={{ transformOrigin: "bottom center", display: "inline-block" }}
                        className={`inline-block ${
                          word.toLowerCase().includes("reseña") ||
                          word.toLowerCase().includes("segundos") ||
                          word.toLowerCase().includes("cerca") ||
                          word.toLowerCase().includes("clara") ||
                          word.toLowerCase().includes("presente")
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h2>

                {/* Subtítulo: slide desde abajo con fade */}
                <motion.p
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: isActive ? 0.22 : 0,
                    ease: EASE_SMOOTH,
                  }}
                  className="mt-6 text-lg sm:text-xl text-[#374151] font-medium leading-relaxed max-w-xl"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            );
          })}
        </div>

        {/* Botones de acción */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full sm:w-auto">
          {/* Botón de WhatsApp dinámico con mensaje de la escena activa */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-primary hover:bg-primary/90 transition-[background-color,transform,box-shadow] duration-200 shadow-md hover:shadow-lg active:scale-[0.98] group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Escríbenos por WhatsApp (abre en una nueva pestaña)"
          >
            {/* Brillo dinámico mediante CSS keyframe en el compositor */}
            {!shouldReduceMotion && (
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 pointer-events-none animate-shimmer" />
            )}

            <MessageCircle
              className="w-5 h-5 fill-current shrink-0"
              aria-hidden="true"
            />
            <span>Escríbenos por WhatsApp</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 shrink-0"
              aria-hidden="true"
            />
          </a>

          {/* Botón Ver servicios */}
          <Link
            href="#servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-primary bg-white/80 backdrop-blur-sm border-2 border-primary hover:bg-primary/5 transition-[background-color,transform,box-shadow] duration-200 shadow-sm active:scale-[0.98] group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Ver servicios</span>
            <ArrowRight
              className="w-4 h-4 text-primary transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* 
          BAJO LOS BOTONES:
          Barra de progreso fina ligada a t, 4 puntos pulsables y botón de pausa/reproducir
        */}
        <div className="mt-8 pt-2 w-full max-w-md flex flex-col gap-3">
          {/* Barra de progreso fina ligada a t */}
          <div className="w-full h-1 bg-slate-200/90 rounded-full overflow-hidden">
            <motion.div
              style={{
                scaleX: shouldReduceMotion ? 1 : t,
                transformOrigin: "left",
              }}
              className="h-full bg-gradient-to-r from-primary to-[#0EA5E9]"
            />
          </div>

          {/* Controles de navegación y pausa */}
          <div className="flex items-center justify-between w-full">
            {/* 4 puntos pulsables */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Seleccionar escena del servicio"
            >
              {HERO_SLIDES.map((slide, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`Ir a escena ${idx + 1}: ${slide.badge}`}
                    onClick={() => handleSelectSlide(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isSelected
                        ? "w-7 h-2 bg-primary shadow-xs"
                        : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                );
              })}
            </div>

            {/* Botón Pausa / Reproducir */}
            <button
              type="button"
              onClick={handleTogglePlayPause}
              aria-label={
                isManuallyPaused ? "Reanudar animación" : "Pausar animación"
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200/80 shadow-2xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              {isManuallyPaused ? (
                <>
                  <Play className="w-3 h-3 fill-current text-primary" />
                  <span>Reproducir</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 fill-current text-slate-600" />
                  <span>Pausa</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* 
        COLUMNA DERECHA: CELULAR INTERACTIVO
        Muestra la escena sincronizada con la animación derivada de t
      */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                scale: phoneScrollScale,
                y: phoneScrollY,
              }
        }
        onMouseEnter={() => setIsHoveredPhone(true)}
        onMouseLeave={() => setIsHoveredPhone(false)}
        className="relative flex flex-col items-center justify-center scale-[0.85] sm:scale-95 lg:scale-100 origin-center"
      >
        <span className="sr-only">
          Demostración interactiva en celular de los servicios de Holos
        </span>

        {/* CHIPS DE CRISTAL FLOTANDO ALREDEDOR DEL CELULAR (escritorio) */}
        {/* Chip 1: Estrella */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: chip1X,
                  y: chip1Y,
                }
          }
          className="hidden lg:flex absolute -left-10 top-20 z-20 pointer-events-none select-none"
        >
          <div
            className={`rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-lg shadow-indigo-950/5 px-3 py-2 flex items-center gap-2 ${
              shouldReduceMotion ? "" : "animate-float-1"
            }`}
          >
            <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#F59E0B]">
              <Star className="w-4 h-4 fill-[#F59E0B]" />
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-[#F59E0B]">
                <Star className="w-2.5 h-2.5 fill-current" />
                <Star className="w-2.5 h-2.5 fill-current" />
                <Star className="w-2.5 h-2.5 fill-current" />
                <Star className="w-2.5 h-2.5 fill-current" />
                <Star className="w-2.5 h-2.5 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-slate-700">Reseñas</span>
            </div>
          </div>
        </motion.div>

        {/* Chip 2: Google Maps */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: chip2X,
                  y: chip2Y,
                }
          }
          className="hidden lg:flex absolute -right-10 top-32 z-20 pointer-events-none select-none"
        >
          <div
            className={`rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-lg shadow-indigo-950/5 px-3 py-2 flex items-center gap-2.5 ${
              shouldReduceMotion ? "" : "animate-float-2"
            }`}
          >
            <div className="w-7 h-7 rounded-xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-[#0EA5E9]">
              <MapPin className="w-4 h-4 fill-[#0EA5E9] stroke-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-800 block leading-tight">
                Google Maps
              </span>
              <span className="text-[9px] font-medium text-emerald-600">
                Perfil verificado
              </span>
            </div>
          </div>
        </motion.div>

        {/* Chip 3: Toque NFC */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: chip3X,
                  y: chip3Y,
                }
          }
          className="hidden lg:flex absolute -left-8 bottom-28 z-20 pointer-events-none select-none"
        >
          <div
            className={`rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-lg shadow-indigo-950/5 px-3 py-2 flex items-center gap-2.5 ${
              shouldReduceMotion ? "" : "animate-float-3"
            }`}
          >
            <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-primary">
              <Wifi className="w-4 h-4 rotate-90 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-800 block leading-tight">
                Toque NFC
              </span>
              <span className="text-[9px] font-medium text-slate-500">
                Sin contacto
              </span>
            </div>
          </div>
        </motion.div>

        {/* CONTENEDOR CON PERSPECTIVA 3D Y CELULAR */}
        <div
          style={{ perspective: 1000 }}
          aria-hidden="true"
          className="relative flex flex-col items-center"
        >
          {/* 
            Píldora flotante que indica el servicio sincronizado:
            MOVIdA AL COSTADO DEL CELULAR (top-8 -right-4 sm:-right-8) para no tapar el notch
          */}
          <div className="absolute top-8 -right-4 sm:-right-8 z-20 pointer-events-none select-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.badge}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.9, x: 10 }
                }
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-full bg-white/95 backdrop-blur-md border border-white/95 shadow-md shadow-indigo-950/10 px-3 py-1.5 flex items-center gap-2 text-xs font-bold text-slate-800"
              >
                <span
                  className={`w-2 h-2 rounded-full ${activeSlide.dotColor}`}
                />
                <span>{activeSlide.badge}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MARCO DEL CELULAR CON INCLINACIÓN 3D Y FLOTACIÓN CSS DESACOPLADA */}
          <div className={shouldReduceMotion ? "" : "animate-float-phone"}>
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                      willChange: "transform",
                    }
              }
              className="w-[290px] sm:w-[310px] h-[580px] sm:h-[600px] rounded-[2.75rem] bg-[#111827] p-2.5 sm:p-3 shadow-[0_20px_45px_-12px_rgba(79,70,229,0.25)] border-4 border-slate-800/80 relative flex flex-col justify-between"
            >
              {/* Notch en forma de píldora (ahora completamente visible y despejado) */}
              <div className="w-22 h-4 bg-black rounded-full mx-auto shrink-0 mb-1 z-30" />

              {/* Pantalla blanca del celular con esquinas redondeadas y escena activa */}
              <div className="relative flex-1 w-full rounded-[2.25rem] bg-white overflow-hidden p-2 flex flex-col border border-slate-200/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, x: 24, scale: 0.98 }
                    }
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -24, scale: 0.98 }}
                    transition={{ duration: 0.42, ease: EASE_SMOOTH }}
                    className="h-full w-full"
                  >
                    <ActiveSceneComponent
                      t={t}
                      reducedMotion={shouldReduceMotion}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Barra inferior del marco */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-1 shrink-0" />
            </motion.div>
          </div>
        </div>

        {/* Pie informativo bajo el celular */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <span className="text-[11px] font-medium tracking-wide uppercase text-text-muted/70">
            Ejemplo ilustrativo en tiempo real
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
