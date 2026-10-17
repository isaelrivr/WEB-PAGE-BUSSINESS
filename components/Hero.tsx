"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import {
  MessageCircle,
  ArrowRight,
  Star,
  MapPin,
  Globe,
  Share2,
  Wifi,
} from "lucide-react";
import ResenaScreen from "@/components/hero/ResenaScreen";
import GoogleScreen from "@/components/hero/GoogleScreen";
import WebScreen from "@/components/hero/WebScreen";
import RedesScreen from "@/components/hero/RedesScreen";

const SCREENS = [
  {
    component: ResenaScreen,
    label: "Reseñas con NFC",
    icon: Star,
    dotColor: "bg-[#0EA5E9]",
  },
  {
    component: GoogleScreen,
    label: "Perfil de Google",
    icon: MapPin,
    dotColor: "bg-primary",
  },
  {
    component: WebScreen,
    label: "Páginas web",
    icon: Globe,
    dotColor: "bg-[#0EA5E9]",
  },
  {
    component: RedesScreen,
    label: "Redes sociales",
    icon: Share2,
    dotColor: "bg-primary",
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { margin: "0px 0px -150px 0px" });
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [screenIndex, setScreenIndex] = useState(0);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const shouldReduceMotion = mounted && Boolean(prefersReduced);

  // 1. Inclinación 3D del celular con el mouse (solo escritorio, hasta ±6°)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 22, mass: 0.4 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-6, 6]);

  // Parallax ligero contrario al del celular para los 3 chips flotantes
  const chip1X = useTransform(smoothMouseX, [-1, 1], [18, -18]);
  const chip1Y = useTransform(smoothMouseY, [-1, 1], [14, -14]);

  const chip2X = useTransform(smoothMouseX, [-1, 1], [22, -22]);
  const chip2Y = useTransform(smoothMouseY, [-1, 1], [-16, 16]);

  const chip3X = useTransform(smoothMouseX, [-1, 1], [-16, 16]);
  const chip3Y = useTransform(smoothMouseY, [-1, 1], [18, -18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 2. Scroll fuera del hero: texto sube y desvanece, celular se reduce a 0.95 y baja, fondo parallax scale 1.1
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textScrollY = useTransform(scrollYProgress, [0, 0.75], [0, -40]);
  const textScrollOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const phoneScrollScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.95]);
  const phoneScrollY = useTransform(scrollYProgress, [0, 0.75], [0, 25]);

  // 3. Ciclo automático cada 3.6 s: se pausa al ocultar la pestaña o salir de pantalla
  useEffect(() => {
    if (shouldReduceMotion || !isTabVisible || !isHeroInView) return;

    const timer = setInterval(() => {
      setScreenIndex((prev) => (prev + 1) % SCREENS.length);
    }, 3600);

    return () => clearInterval(timer);
  }, [shouldReduceMotion, isTabVisible, isHeroInView]);

  const currentScreen = SCREENS[shouldReduceMotion ? 0 : screenIndex];
  const CurrentScreenComponent = currentScreen.component;

  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate flex items-center justify-center -mt-20 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden bg-background"
    >
      {/* FONDO CON NEXT/IMAGE, PARALLAX (SCALE 1.1) Y DEGRADADOS DE LEGIBILIDAD */}
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? { scale: 1 } : { y: bgY, scale: 1.1 }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] lg:object-[85%_center]"
        />

        {/* Velo en celular (uniforme más suave) */}
        <div className="lg:hidden absolute inset-0 bg-white/75" />

        {/* Degradado horizontal en escritorio (fuerte a la izquierda, desvaneciéndose a la derecha) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />

        {/* Degradado vertical inferior (funde con blanco en la parte baja) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </motion.div>

      {/* LAYOUT DIVIDIDO EN DOS COLUMNAS */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* COLUMNA IZQUIERDA: TEXTO CON FADE Y SUBIDA AL SCROLL */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: textScrollY,
                  opacity: textScrollOpacity,
                }
          }
          className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0"
        >
          {/* Titular fijo (entrada en 0.45s, nunca más de 0.6s) */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-main leading-[1.12]"
          >
            Más <span className="text-primary">reseñas</span> y mejor presencia
            online para tu negocio local
          </motion.h1>

          {/* Subtítulo oscuro (#374151) con peso medio */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-6 text-lg sm:text-xl text-[#374151] font-medium leading-relaxed"
          >
            Ayudamos a pequeños negocios a captar clientes con optimización de
            reseñas en Google, manejo de redes sociales y páginas web
            profesionales.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.24,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            {/* Botón principal con brillo (shimmer) cada 4s y flecha desplazable en hover */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-primary hover:bg-primary/90 transition-[background-color,transform,box-shadow] duration-200 shadow-md hover:shadow-lg active:scale-[0.98] group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Escríbenos por WhatsApp (abre en una nueva pestaña)"
            >
              {/* Brillo (shimmer) que lo cruza cada 4s */}
              {!shouldReduceMotion && (
                <motion.div
                  initial={{ x: "-150%" }}
                  animate={{ x: "250%" }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 2.8,
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 pointer-events-none"
                />
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

            {/* Botón secundario Ver servicios */}
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
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA: CELULAR INTERACTIVO CON INCLINACIÓN 3D Y CHIPS FLOTANTES */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  scale: phoneScrollScale,
                  y: phoneScrollY,
                }
          }
          className="relative flex flex-col items-center justify-center scale-[0.85] sm:scale-95 lg:scale-100 origin-center"
        >
          {/* Texto solo para lectores de pantalla describiendo el mockup */}
          <span className="sr-only">
            Ejemplo de cómo una reseña, un perfil de Google, una página web y un
            feed de redes se ven en un celular
          </span>

          {/* TRES CHIPS DE CRISTAL FLOTANDO ALREDEDOR DEL CELULAR (ocultos en móvil < lg) */}
          {/* Chip 1: Estrella (arriba izquierda) */}
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
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-lg shadow-indigo-950/5 px-3 py-2 flex items-center gap-2"
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
            </motion.div>
          </motion.div>

          {/* Chip 2: Pin de ubicación (arriba derecha) */}
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
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [5, -5, 5] }}
              transition={{
                duration: 5.5,
                delay: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-lg shadow-indigo-950/5 px-3 py-2 flex items-center gap-2.5"
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
            </motion.div>
          </motion.div>

          {/* Chip 3: Toque NFC (abajo izquierda) */}
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
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [-3.5, 3.5, -3.5] }}
              transition={{
                duration: 4.2,
                delay: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-lg shadow-indigo-950/5 px-3 py-2 flex items-center gap-2.5"
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
            </motion.div>
          </motion.div>

          {/* CONTENEDOR CON PERSPECTIVA 3D Y CELULAR */}
          <div
            style={{ perspective: 1000 }}
            aria-hidden="true"
            className="relative flex flex-col items-center"
          >
            {/* Píldora de cristal superior que indica el servicio sincronizado */}
            <div className="absolute -top-3.5 z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen.label}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: -6, scale: 0.95 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-full bg-white/90 backdrop-blur-md border border-white/95 shadow-md shadow-indigo-950/10 px-3.5 py-1.5 flex items-center gap-2 text-xs font-bold text-slate-800"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${currentScreen.dotColor}`}
                  />
                  <span>{currentScreen.label}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* MARCO DEL CELULAR CON INCLINACIÓN 3D (±6°) Y FLOTACIÓN */}
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }
              }
              animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-[290px] sm:w-[310px] h-[580px] sm:h-[600px] rounded-[2.75rem] bg-[#111827] p-2.5 sm:p-3 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.35)] border-4 border-slate-800/80 relative flex flex-col justify-between"
            >
              {/* Notch en forma de píldora */}
              <div className="w-22 h-4 bg-black rounded-full mx-auto shrink-0 mb-1 z-30" />

              {/* Pantalla blanca del celular con esquinas redondeadas */}
              <div className="relative flex-1 w-full rounded-[2.25rem] bg-white overflow-hidden p-2 flex flex-col border border-slate-200/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={shouldReduceMotion ? 0 : screenIndex}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, x: 16 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full"
                  >
                    <CurrentScreenComponent
                      reducedMotion={shouldReduceMotion}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Barra inferior del marco */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-1 shrink-0" />
            </motion.div>
          </div>

          {/* Controles bajo el celular: 4 puntos y etiqueta informativa */}
          <div className="mt-4 flex flex-col items-center gap-2">
            {/* 4 puntos indicadores para saltar a una vista */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Seleccionar vista del celular"
            >
              {SCREENS.map((screen, idx) => (
                <button
                  key={screen.label}
                  type="button"
                  onClick={() => setScreenIndex(idx)}
                  aria-label={`Ver pantalla de ${screen.label}`}
                  aria-selected={screenIndex === idx}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    screenIndex === idx
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Etiqueta Ejemplo ilustrativo */}
            <span className="text-[11px] font-medium tracking-wide uppercase text-text-muted/70">
              Ejemplo ilustrativo
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}