"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import {
  MessageCircle,
  ArrowRight,
  MapPin,
  Star,
  Wifi,
  Sparkles,
} from "lucide-react";

const ROTATING_WORDS = ["reseñas", "redes", "páginas web"];
const WORDS_AFTER = [
  "y",
  "mejor",
  "presencia",
  "online",
  "para",
  "tu",
  "negocio",
  "local",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldReduceMotion = mounted && Boolean(prefersReduced);

  // 1. Rotación de la palabra en índigo cada 2.5 s con transición vertical
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // 2. Parallax de scroll del hero (imagen más lenta, salida con fade y subida)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, -45]);

  // 3. Parallax con el mouse para los chips flotantes en escritorio
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });

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

  // Desplazamiento parallax diferenciado para cada chip
  const chip1X = useTransform(smoothMouseX, [-1, 1], [-18, 18]);
  const chip1Y = useTransform(smoothMouseY, [-1, 1], [-14, 14]);

  const chip2X = useTransform(smoothMouseX, [-1, 1], [16, -16]);
  const chip2Y = useTransform(smoothMouseY, [-1, 1], [-12, 12]);

  const chip3X = useTransform(smoothMouseX, [-1, 1], [-14, 14]);
  const chip3Y = useTransform(smoothMouseY, [-1, 1], [16, -16]);

  const chip4X = useTransform(smoothMouseX, [-1, 1], [20, -20]);
  const chip4Y = useTransform(smoothMouseY, [-1, 1], [14, -14]);

  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate flex-1 flex items-center justify-center -mt-20 pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-28 md:pb-36 min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden bg-background"
    >
      {/* FONDO DEL HERO CON PARALLAX Y SCALE 1.1 */}
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
          className="object-cover object-center"
        />

        {/* Solo se funde con blanco en la parte baja; el resto del fondo queda con todo su color */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white" />
      </motion.div>

      {/* Contenedor relativo para posicionar los chips flotantes alrededor de la tarjeta */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* 4 CHIPS DE CRISTAL FLOTANDO ALREDEDOR DE LA TARJETA */}
        {/* 1. Estrellas de reseña (arriba izquierda) */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: chip1X,
                  y: chip1Y,
                }
          }
          className="hidden sm:flex absolute -top-4 -left-3 md:-top-7 md:-left-8 z-20 pointer-events-none select-none"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_8px_20px_rgba(79,70,229,0.12)] px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-800"
          >
            <div className="flex items-center text-[#F59E0B]">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Reseñas</span>
          </motion.div>
        </motion.div>

        {/* 2. Pin de Google (arriba derecha) */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: chip2X,
                  y: chip2Y,
                }
          }
          className="hidden sm:flex absolute -top-4 -right-3 md:-top-7 md:-right-8 z-20 pointer-events-none select-none"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [4, -4, 4] }}
            transition={{
              duration: 5.2,
              delay: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_8px_20px_rgba(79,70,229,0.12)] px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-800"
          >
            <div className="w-5 h-5 rounded-full bg-sky-50 flex items-center justify-center">
              <MapPin className="w-3 h-3 text-[#0EA5E9]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Google Maps</span>
          </motion.div>
        </motion.div>

        {/* 3. Toque NFC (abajo izquierda) */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: chip3X,
                  y: chip3Y,
                }
          }
          className="hidden sm:flex absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 z-20 pointer-events-none select-none"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
            transition={{
              duration: 4.8,
              delay: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_8px_20px_rgba(79,70,229,0.12)] px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-800"
          >
            <div className="w-5 h-5 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
              <Wifi className="w-3 h-3 text-[#0EA5E9] rotate-90" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Toque NFC</span>
          </motion.div>
        </motion.div>

        {/* 4. Nuevo post (abajo derecha) */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: chip4X,
                  y: chip4Y,
                }
          }
          className="hidden sm:flex absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 z-20 pointer-events-none select-none"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [4, -4, 4] }}
            transition={{
              duration: 5.6,
              delay: 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_8px_20px_rgba(79,70,229,0.12)] px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-800"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#A78BFA] flex items-center justify-center text-white">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Nuevo post</span>
          </motion.div>
        </motion.div>

        {/* TARJETA DE CRISTAL CON EL CONTENIDO (FADE Y SUBIDA AL SALIR CON SCROLL) */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: contentOpacity,
                  y: contentY,
                }
          }
          className="w-full text-center flex flex-col items-center rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/70 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.25)] px-6 py-10 sm:px-12 sm:py-14"
        >
          {/* Titular con entrada palabra por palabra y palabra rotativa sin CLS */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-main leading-[1.14] text-balance">
            {/* Texto estático accesible para lectores de pantalla */}
            <span className="sr-only">
              Más reseñas, redes y páginas web y mejor presencia online para tu negocio local
            </span>

            {/* Versión visual animada palabra por palabra (stagger total < 0.6s) */}
            <span aria-hidden="true" className="inline">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0 }}
                className="inline-block mr-2 sm:mr-3"
              >
                Más
              </motion.span>

              {/* Contenedor de palabra rotativa: reserva el ancho de 'páginas web' */}
              <span className="relative inline-flex items-center justify-center align-baseline text-primary overflow-hidden mx-1">
                {/* Elemento fantasma invisible para evitar cualquier salto de layout (CLS = 0) */}
                <span
                  className="invisible select-none pointer-events-none px-1"
                  aria-hidden="true"
                >
                  páginas web
                </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={shouldReduceMotion ? "static" : wordIndex}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center text-primary font-bold whitespace-nowrap"
                  >
                    {shouldReduceMotion ? "reseñas" : ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>

              {/* Palabras posteriores animadas con stagger corto */}
              {WORDS_AFTER.map((word, idx) => (
                <motion.span
                  key={word + idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 + idx * 0.035 }}
                  className="inline-block mr-2 sm:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-[#374151] max-w-2xl leading-relaxed font-medium text-pretty"
          >
            Ayudamos a pequeños negocios a captar clientes con optimización de reseñas en Google, manejo de redes sociales y páginas web profesionales.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            {/* Botón principal WhatsApp con brillo (shimmer) cada 4s y flecha desplazable */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium text-white bg-primary hover:bg-primary/90 transition-[background-color,transform,box-shadow] duration-200 shadow-md hover:shadow-lg active:scale-[0.98] group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Escríbenos por WhatsApp (abre en una nueva pestaña)"
            >
              {/* Brillo (shimmer) que lo cruza cada 4 s */}
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

              <MessageCircle className="w-5 h-5 fill-current shrink-0" aria-hidden="true" />
              <span>Escríbenos por WhatsApp</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 shrink-0"
                aria-hidden="true"
              />
            </a>

            {/* Botón secundario Ver servicios */}
            <Link
              href="#servicios"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-medium text-primary bg-white/80 backdrop-blur-sm border-2 border-primary hover:bg-primary/5 transition-[background-color,transform,box-shadow] duration-200 shadow-sm active:scale-[0.98] group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span>Ver servicios</span>
              <ArrowRight
                className="w-4 h-4 text-primary transition-transform duration-200 group-hover/link:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}