"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Lock, Sparkles, Zap, Shield } from "lucide-react";

interface VisualProps {
  foco: MotionValue<number>;
  reducedMotion?: boolean;
}

export default function WebVisual({ foco, reducedMotion = false }: VisualProps) {
  // 1. Barra de carga que se llena hasta el 100% (de 0.05 a 0.45)
  const loadProgress = useTransform(foco, [0.05, 0.45], ["0%", "100%"]);

  // Al llegar al 100% aparece el check con la palabra 'Rápido' (0.45 a 0.56)
  const rapidoOpacity = useTransform(foco, [0.45, 0.52], [0, 1]);
  const rapidoScale = useTransform(foco, [0.45, 0.52, 0.57], [0.6, 1.15, 1]);

  // 2. Elementos que se construyen con desfase:
  // a) Barra de navegación (0.15 a 0.30)
  const navOpacity = useTransform(foco, [0.15, 0.28], [0, 1]);
  const navY = useTransform(foco, [0.15, 0.28], [-8, 0]);

  // b) Hero con degradado índigo (#4F46E5) y celeste (#0EA5E9) (0.28 a 0.48)
  const heroOpacity = useTransform(foco, [0.28, 0.44], [0, 1]);
  const heroScale = useTransform(foco, [0.28, 0.44], [0.92, 1]);
  const heroY = useTransform(foco, [0.28, 0.44], [8, 0]);

  // c) Tres tarjetas pequeñas que entran escalonadas (0.46 a 0.68)
  const card1Opacity = useTransform(foco, [0.46, 0.56], [0, 1]);
  const card1Y = useTransform(foco, [0.46, 0.56], [8, 0]);

  const card2Opacity = useTransform(foco, [0.52, 0.62], [0, 1]);
  const card2Y = useTransform(foco, [0.52, 0.62], [8, 0]);

  const card3Opacity = useTransform(foco, [0.58, 0.68], [0, 1]);
  const card3Y = useTransform(foco, [0.58, 0.68], [8, 0]);

  // 3. Cursor que se mueve hacia el botón del hero y hace clic (0.68 a 1.0)
  const cursorOpacity = useTransform(foco, [0.66, 0.72], [0, 1]);
  const cursorX = useTransform(foco, [0.7, 0.85], [50, 0]);
  const cursorY = useTransform(foco, [0.7, 0.85], [40, 0]);
  const cursorScale = useTransform(
    foco,
    [0.85, 0.89, 0.94],
    [1, 0.8, 1]
  );

  // Reacción de clic en el botón del hero (pequeña compresión y onda)
  const btnScale = useTransform(
    foco,
    [0.86, 0.9, 0.95],
    [1, 0.92, 1]
  );
  const clickRippleScale = useTransform(foco, [0.87, 0.96], [0.6, 1.8]);
  const clickRippleOpacity = useTransform(
    foco,
    [0.87, 0.9, 0.97],
    [0, 0.75, 0]
  );

  return (
    <div className="relative w-full h-44 sm:h-48 rounded-2xl bg-purple-50/30 border border-purple-100/60 shadow-inner flex flex-col justify-center items-center overflow-hidden p-2.5 sm:p-3 select-none">
      {/* Etiqueta pequeña: Ejemplo ilustrativo */}
      <span className="absolute top-2 right-2.5 text-[9px] font-medium tracking-wider uppercase text-text-muted/70 bg-white/80 border border-slate-200/50 px-2 py-0.5 rounded-md backdrop-blur-xs z-30">
        Ejemplo ilustrativo
      </span>

      {/* Ventana de navegador */}
      <div className="relative w-full max-w-[280px] sm:max-w-[310px] h-[150px] sm:h-[158px] rounded-xl bg-white border border-slate-200/90 shadow-md flex flex-col overflow-hidden">
        {/* Barra superior de navegador con tres puntos y barra de URL */}
        <div className="h-6 bg-slate-100/90 border-b border-slate-200 px-2 flex items-center justify-between gap-1.5 shrink-0 relative">
          {/* Tres puntos de ventana */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Barra de URL con 'tunegocio.mx' */}
          <div className="h-4 px-2 bg-white rounded-md border border-slate-200/80 flex items-center gap-1 text-[8px] font-mono text-slate-600 shadow-2xs">
            <Lock className="w-2 h-2 text-emerald-500 shrink-0" />
            <span>tunegocio.mx</span>
          </div>

          {/* Check con la palabra 'Rápido' que aparece cuando la barra llega a 100% */}
          <motion.div
            style={
              reducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: rapidoOpacity, scale: rapidoScale }
            }
            className="flex items-center gap-0.5 text-[8px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full shrink-0"
          >
            <span className="text-[9px]">✓</span>
            <span>Rápido</span>
          </motion.div>

          {/* Barra de carga sobre la ventana que se llena al 100% */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-slate-200/70 overflow-hidden">
            <motion.div
              style={
                reducedMotion
                  ? { width: "100%" }
                  : { width: loadProgress }
              }
              className="h-full bg-gradient-to-r from-primary to-[#0EA5E9]"
            />
          </div>
        </div>

        {/* Cuerpo del sitio web construido con desfase */}
        <div className="flex-1 p-1.5 sm:p-2 bg-slate-50/70 flex flex-col justify-between overflow-hidden relative">
          {/* 1. Barra de navegación interior */}
          <motion.div
            style={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: navOpacity, y: navY }
            }
            className="h-3.5 flex items-center justify-between px-1 bg-white/90 rounded border border-slate-200/60 shadow-2xs"
          >
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-primary" />
              <div className="h-1.5 w-8 bg-slate-300 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1 w-5 bg-slate-200 rounded-full" />
              <div className="h-1 w-5 bg-slate-200 rounded-full" />
              <div className="h-2 w-7 bg-primary/20 rounded-full" />
            </div>
          </motion.div>

          {/* 2. Hero con degradado índigo (#4F46E5) y celeste (#0EA5E9) */}
          <motion.div
            style={
              reducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: heroOpacity, scale: heroScale, y: heroY }
            }
            className="h-14 sm:h-15 rounded-lg bg-gradient-to-r from-primary via-[#4338CA] to-[#0EA5E9] p-2 text-white shadow-xs flex items-center justify-between relative overflow-hidden"
          >
            {/* Texto y encabezado del Hero */}
            <div className="space-y-1 z-10">
              <div className="h-2 w-20 sm:w-24 bg-white/95 rounded-full" />
              <div className="h-1.5 w-14 sm:w-16 bg-white/70 rounded-full" />
            </div>

            {/* Botón CTA del Hero (donde el cursor hace clic) */}
            <div className="relative z-10">
              <motion.div
                style={reducedMotion ? { scale: 1 } : { scale: btnScale }}
                className="px-2 py-1 rounded-md bg-white text-primary text-[8px] font-bold shadow-xs flex items-center gap-0.5"
              >
                <span>Ver más</span>
                <span className="text-[7px]">→</span>
              </motion.div>

              {/* Ondas al hacer clic */}
              {!reducedMotion && (
                <motion.div
                  style={{
                    scale: clickRippleScale,
                    opacity: clickRippleOpacity,
                  }}
                  className="absolute inset-0 rounded-md border border-white pointer-events-none"
                />
              )}
            </div>

            {/* Efecto de luz suave de fondo del hero */}
            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/10 blur-xs pointer-events-none" />
          </motion.div>

          {/* 3. Tres tarjetas pequeñas escalonadas debajo del hero */}
          <div className="grid grid-cols-3 gap-1.5">
            {/* Tarjeta 1 */}
            <motion.div
              style={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: card1Opacity, y: card1Y }
              }
              className="bg-white rounded-md border border-slate-200/80 p-1 flex flex-col items-center justify-center gap-0.5 shadow-2xs h-7"
            >
              <Zap className="w-2.5 h-2.5 text-primary" />
              <div className="h-1 w-8 bg-slate-200 rounded-full" />
            </motion.div>

            {/* Tarjeta 2 */}
            <motion.div
              style={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: card2Opacity, y: card2Y }
              }
              className="bg-white rounded-md border border-slate-200/80 p-1 flex flex-col items-center justify-center gap-0.5 shadow-2xs h-7"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#0EA5E9]" />
              <div className="h-1 w-8 bg-slate-200 rounded-full" />
            </motion.div>

            {/* Tarjeta 3 */}
            <motion.div
              style={
                reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: card3Opacity, y: card3Y }
              }
              className="bg-white rounded-md border border-slate-200/80 p-1 flex flex-col items-center justify-center gap-0.5 shadow-2xs h-7"
            >
              <Shield className="w-2.5 h-2.5 text-[#A78BFA]" />
              <div className="h-1 w-8 bg-slate-200 rounded-full" />
            </motion.div>
          </div>

          {/* Cursor que se mueve hacia el botón y hace clic */}
          {!reducedMotion && (
            <motion.div
              style={{
                x: cursorX,
                y: cursorY,
                opacity: cursorOpacity,
                scale: cursorScale,
              }}
              className="absolute top-[40px] right-[20px] pointer-events-none z-30"
            >
              <svg
                className="w-4 h-4 text-slate-800 drop-shadow-md"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.879z" />
              </svg>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
