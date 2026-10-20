"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import HeroSlides from "@/components/hero/HeroSlides";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { margin: "0px 0px -150px 0px" });
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const isFinePointerRef = useRef(false);
  const mouseRafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      isFinePointerRef.current = window.matchMedia("(pointer: fine)").matches;
    }
    return () => {
      if (mouseRafRef.current !== null) {
        cancelAnimationFrame(mouseRafRef.current);
      }
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

  const heroRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !isFinePointerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    heroRectRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !isFinePointerRef.current) return;
    if (!heroRectRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      heroRectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    }
    const { left, top, width, height } = heroRectRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (mouseRafRef.current !== null) return;

    mouseRafRef.current = requestAnimationFrame(() => {
      const x = ((clientX - left) / width) * 2 - 1;
      const y = ((clientY - top) / height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
      mouseRafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (mouseRafRef.current !== null) {
      cancelAnimationFrame(mouseRafRef.current);
      mouseRafRef.current = null;
    }
    heroRectRef.current = null;
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

  return (
    <section
      ref={heroRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate flex items-center justify-center -mt-20 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden bg-background"
    >
      {/* FONDO CON NEXT/IMAGE, PARALLAX (SCALE 1.1) Y DEGRADADOS DE LEGIBILIDAD */}
      <motion.div
        aria-hidden="true"
        style={
          shouldReduceMotion
            ? { scale: 1 }
            : { y: bgY, scale: 1.1, willChange: "transform" }
        }
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

      {/* COMPONENTE CLIENTE HEROSLIDES SINCRONIZADO */}
      <HeroSlides
        isHeroInView={isHeroInView}
        shouldReduceMotion={shouldReduceMotion}
        textScrollY={textScrollY}
        textScrollOpacity={textScrollOpacity}
        phoneScrollScale={phoneScrollScale}
        phoneScrollY={phoneScrollY}
        rotateX={rotateX}
        rotateY={rotateY}
        chip1X={chip1X}
        chip1Y={chip1Y}
        chip2X={chip2X}
        chip2Y={chip2Y}
        chip3X={chip3X}
        chip3Y={chip3Y}
      />

      {/* INDICADOR DE SCROLL ANIMADO */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none select-none"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase text-text-muted/50">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-text-muted/25 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-primary/60"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}