"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import {
  Lock,
  Zap,
  Sparkles,
  Shield,
  ArrowRight,
  MousePointer2,
  Check,
  Smartphone,
} from "lucide-react";

interface SceneProps {
  t: MotionValue<number>;
  reducedMotion?: boolean;
}

const URL_TEXT = "tunegocio.mx";

// Cursor interactivo que recorre una curva y hace clic en el botón del hero con transform GPU (0.75 a 0.88)
function WebCursor({ t }: { t: MotionValue<number> }) {
  // Trayectoria curva hacia el botón del hero mediante x e y (GPU compositor)
  const cursorX = useTransform(t, [0.75, 0.81, 0.85], [210, 125, 48]);
  const cursorY = useTransform(t, [0.75, 0.8, 0.85], [240, 115, 84]);
  const cursorOpacity = useTransform(t, [0.74, 0.77, 0.88, 0.91], [0, 1, 1, 0]);
  const cursorScale = useTransform(t, [0.83, 0.85, 0.87], [1, 0.85, 1]);

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        opacity: cursorOpacity,
        scale: cursorScale,
      }}
      className="absolute top-0 left-0 z-40 pointer-events-none drop-shadow-md"
    >
      <MousePointer2 className="w-4 h-4 fill-slate-900 text-white" />
    </motion.div>
  );
}

export default function WebScene({ t, reducedMotion = false }: SceneProps) {
  // Escritura de URL optimizada con clipPath (0 a 0.14)
  const urlClip = useTransform(
    t,
    [0.01, 0.14],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const urlCursorOpacity = useTransform(t, (v) => {
    if (v > 0.16) return 0;
    return Math.floor(v * 35) % 2 === 0 ? 1 : 0;
  });

  // 1. Barra de carga: se llena paulatinamente hasta el 100% mediante scaleX (GPU) (0 a 0.94)
  const loadScaleX = useTransform(
    t,
    [0, 0.15, 0.45, 0.75, 0.88, 0.94],
    [0, 0.35, 0.65, 0.85, 0.95, 1]
  );

  // Palomita y badge 'Rápido' (0.88 a 1.0)
  const speedBadgeOpacity = useTransform(t, [0.88, 0.93], [0, 1]);
  const speedBadgeScale = useTransform(t, [0.88, 0.93, 0.97], [0.7, 1.15, 1]);
  const checkPathLength = useTransform(t, [0.89, 0.96], [0, 1]);

  // 2. Entrada escalonada de bloques esqueleto (0.15 a 0.45)
  const navSkelOpacity = useTransform(t, [0.15, 0.22], [0, 1]);
  const heroSkelOpacity = useTransform(t, [0.2, 0.28], [0, 1]);
  const cardsSkelOpacity = useTransform(t, [0.28, 0.36], [0, 1]);
  const footerSkelOpacity = useTransform(t, [0.35, 0.44], [0, 1]);

  // 3. Cortina de color que 'pinta' de izquierda a derecha (0.45 a 0.75)
  // clipPath de 'inset(0 100% 0 0)' (oculto) a 'inset(0 0% 0 0)' (completamente pintado)
  const paintNavClip = useTransform(
    t,
    [0.45, 0.54],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const paintHeroClip = useTransform(
    t,
    [0.48, 0.62],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const paintCardsClip = useTransform(
    t,
    [0.58, 0.72],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const paintFooterClip = useTransform(
    t,
    [0.65, 0.76],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  // Botón del hero: compresión y onda de clic (0.84 a 0.88)
  const heroBtnScale = useTransform(t, [0.84, 0.86, 0.88], [1, 0.92, 1]);
  const rippleScale = useTransform(t, [0.85, 0.89], [0.4, 2.0]);
  const rippleOpacity = useTransform(t, [0.85, 0.86, 0.89], [0, 0.7, 0]);

  // 5. Efecto responsivo: las 3 tarjetas se reacomodan en una sola columna (0.88 a 1.0)
  const rowCardsOpacity = useTransform(t, [0.88, 0.93], [1, 0]);
  const rowCardsDisplay = useTransform(t, (v) => (v >= 0.93 ? "none" : "grid"));

  const colCardsOpacity = useTransform(t, [0.91, 0.97], [0, 1]);
  const colCardsY = useTransform(t, [0.91, 0.97], [10, 0]);
  const colCardsDisplay = useTransform(t, (v) => (v < 0.91 ? "none" : "flex"));

  // Modo movimiento reducido: vista estática final completa y bien compuesta
  if (reducedMotion) {
    return (
      <div className="h-full flex flex-col justify-between py-1 px-0.5 select-none">
        <div className="w-full h-full rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col overflow-hidden">
          {/* Barra superior con URL y 100% Rápido */}
          <div className="h-7 bg-slate-100/90 border-b border-slate-200 px-2.5 flex items-center justify-between gap-2 shrink-0 relative">
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <div className="h-4.5 px-2 bg-white rounded-md border border-slate-200/80 flex items-center gap-1 text-[8px] font-mono text-slate-700 shadow-2xs">
              <Lock className="w-2 h-2 text-emerald-500 shrink-0" />
              <span>tunegocio.mx</span>
            </div>

            <span className="inline-flex items-center gap-0.5 text-[7px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full shrink-0 shadow-2xs">
              <Check className="w-2 h-2 stroke-[3]" />
              <span>Rápido</span>
            </span>

            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary to-[#0EA5E9]" />
          </div>

          {/* Contenido interior terminado */}
          <div className="flex-1 p-2 bg-slate-50/70 flex flex-col justify-between overflow-hidden gap-1.5">
            {/* Barra de navegación interior */}
            <div className="flex items-center justify-between px-1 py-0.5">
              <span className="text-[9px] font-bold tracking-tight text-slate-800">
                HOLOS
              </span>
              <div className="flex items-center gap-2 text-[7px] font-medium text-slate-500">
                <span>Inicio</span>
                <span>Servicios</span>
                <span>Contacto</span>
              </div>
            </div>

            {/* Hero con degradado índigo-celeste y tipografía sólida */}
            <div className="rounded-xl bg-gradient-to-r from-primary via-[#4338CA] to-[#0EA5E9] p-2.5 text-white shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-[11px] font-bold tracking-tight leading-tight">
                  Tu negocio en internet
                </h4>
                <p className="text-[8px] text-white/80 font-medium mt-0.5">
                  Rápida, clara y hecha a la medida.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-bold bg-white text-primary px-2.5 py-1 rounded-md shadow-xs">
                  Ver catálogo
                </span>
                <span className="text-[7px] font-mono text-white/85">
                  99/100 Rendimiento
                </span>
              </div>
            </div>

            {/* Reacomodo responsivo en 1 columna */}
            <div className="flex flex-col gap-1 my-auto">
              <div className="bg-white rounded-lg px-2 py-1 border border-slate-200/70 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-md bg-sky-50 text-[#0EA5E9] flex items-center justify-center">
                    <Zap className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[8px] font-bold text-slate-700">
                    Carga ultrarrápida
                  </span>
                </div>
                <span className="text-[7px] font-mono text-emerald-600 font-bold">
                  ✓ Listo
                </span>
              </div>

              <div className="bg-white rounded-lg px-2 py-1 border border-slate-200/70 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-md bg-indigo-50 text-primary flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[8px] font-bold text-slate-700">
                    Diseño a la medida
                  </span>
                </div>
                <span className="text-[7px] font-mono text-emerald-600 font-bold">
                  ✓ Listo
                </span>
              </div>

              <div className="bg-white rounded-lg px-2 py-1 border border-slate-200/70 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Shield className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[8px] font-bold text-slate-700">
                    Seguridad SSL incluida
                  </span>
                </div>
                <span className="text-[7px] font-mono text-emerald-600 font-bold">
                  ✓ Listo
                </span>
              </div>
            </div>

            {/* Pie de página web */}
            <div className="h-6 rounded-lg bg-white border border-slate-200/60 px-2 flex items-center justify-between">
              <span className="text-[7px] text-slate-400 font-medium">
                © Tu Negocio · Todos los derechos reservados
              </span>
              <span className="text-primary text-[8px] font-bold">→</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex flex-col justify-between py-1 px-0.5 select-none overflow-hidden">
      {/* Cursor que recorre curva y hace clic (0.75 a 0.88) */}
      <WebCursor t={t} />

      <div className="w-full h-full rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col overflow-hidden relative">
        {/* 
          1. BARRA SUPERIOR DE NAVEGADOR (0 a 0.15)
          URL se escribe y barra de carga avanza
        */}
        <div className="h-7 bg-slate-100/90 border-b border-slate-200 px-2.5 flex items-center justify-between gap-2 shrink-0 relative z-30">
          {/* Tres puntos de ventana */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Barra de URL con escritura progresiva de 'tunegocio.mx' con clipPath */}
          <div className="h-4.5 px-2 bg-white rounded-md border border-slate-200/80 flex items-center gap-1 text-[8px] font-mono text-slate-700 shadow-2xs overflow-hidden">
            <Lock className="w-2 h-2 text-emerald-500 shrink-0" />
            <div className="relative flex items-center overflow-hidden">
              <motion.span style={{ clipPath: urlClip }} className="whitespace-nowrap inline-block">
                {URL_TEXT}
              </motion.span>
              <motion.span
                style={{ opacity: urlCursorOpacity }}
                className="inline-block w-[1.5px] h-2.5 bg-emerald-500 ml-0.5 align-middle rounded-full shrink-0"
              />
            </div>
          </div>

          {/* Badge con palomita dibujada y texto 'Rápido' (0.88 a 1.0) */}
          <motion.div
            style={{
              opacity: speedBadgeOpacity,
              scale: speedBadgeScale,
            }}
            className="inline-flex items-center gap-0.5 text-[7px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full shrink-0 shadow-2xs"
          >
            <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none">
              <motion.path
                d="M3 8.5 L6.5 12 L13 4"
                stroke="#059669"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: checkPathLength }}
              />
            </svg>
            <span>Rápido</span>
          </motion.div>

          {/* Barra de carga fina animada sobre el borde inferior mediante scaleX */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-slate-200/60 overflow-hidden">
            <motion.div
              style={{ scaleX: loadScaleX, transformOrigin: "left" }}
              className="w-full h-full bg-gradient-to-r from-primary via-[#4338CA] to-[#0EA5E9]"
            />
          </div>
        </div>

        {/* CONTENIDO INTERIOR DE LA WEB */}
        <div className="flex-1 p-2 bg-slate-50/70 flex flex-col justify-between overflow-hidden relative gap-1.5">
          {/* ========================================================
              CAPA 1: ESQUELETO GRIS (Entrada escalonada 0.15 a 0.45)
             ======================================================== */}
          <div className="absolute inset-0 p-2 flex flex-col justify-between pointer-events-none z-10">
            {/* Nav esqueleto */}
            <motion.div
              style={{ opacity: navSkelOpacity }}
              className="flex items-center justify-between px-1 py-0.5"
            >
              <div className="w-12 h-2.5 bg-slate-300 rounded-full" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-2 bg-slate-200 rounded-full" />
                <div className="w-7 h-2 bg-slate-200 rounded-full" />
                <div className="w-7 h-2 bg-slate-200 rounded-full" />
              </div>
            </motion.div>

            {/* Hero esqueleto */}
            <motion.div
              style={{ opacity: heroSkelOpacity }}
              className="rounded-xl bg-slate-200/80 p-2.5 flex flex-col justify-between h-22"
            >
              <div className="space-y-1.5">
                <div className="w-28 h-2.5 bg-slate-300 rounded-full" />
                <div className="w-18 h-1.5 bg-slate-300/70 rounded-full" />
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="w-16 h-4 bg-slate-300 rounded-md" />
                <div className="w-12 h-2 bg-slate-300/60 rounded-full" />
              </div>
            </motion.div>

            {/* 3 Tarjetas esqueleto */}
            <motion.div
              style={{ opacity: cardsSkelOpacity }}
              className="grid grid-cols-3 gap-1.5 my-auto"
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-slate-200/70 rounded-lg p-2 flex flex-col items-center gap-1.5 h-12 justify-center"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-300" />
                  <div className="w-10 h-1.5 bg-slate-300 rounded-full" />
                </div>
              ))}
            </motion.div>

            {/* Footer esqueleto */}
            <motion.div
              style={{ opacity: footerSkelOpacity }}
              className="h-6 rounded-lg bg-slate-200/60 px-2 flex items-center justify-between"
            >
              <div className="w-24 h-1.5 bg-slate-300 rounded-full" />
              <div className="w-3 h-3 bg-slate-300 rounded-md" />
            </motion.div>
          </div>

          {/* ========================================================
              CAPA 2: PINTADA CON CORTINA DE COLOR (0.45 a 0.75)
             ======================================================== */}
          <div className="flex-1 flex flex-col justify-between relative z-20 overflow-hidden">
            {/* Barra de navegación pintada */}
            <motion.div
              style={{ clipPath: paintNavClip }}
              className="flex items-center justify-between px-1 py-0.5 bg-white/95 rounded-md shadow-2xs border border-slate-100"
            >
              <span className="text-[9px] font-bold tracking-tight text-primary">
                HOLOS
              </span>
              <div className="flex items-center gap-2 text-[7px] font-semibold text-slate-600">
                <span>Inicio</span>
                <span>Servicios</span>
                <span>Contacto</span>
              </div>
            </motion.div>

            {/* Hero pintado con degradado índigo-celeste y titulares sólidos */}
            <motion.div
              style={{ clipPath: paintHeroClip }}
              className="rounded-xl bg-gradient-to-r from-primary via-[#4338CA] to-[#0EA5E9] p-2.5 text-white shadow-xs flex flex-col justify-between h-22 relative overflow-hidden"
            >
              <div>
                <h4 className="text-[11px] font-bold tracking-tight leading-tight">
                  Tu negocio en internet
                </h4>
                <p className="text-[8px] text-white/85 font-medium mt-0.5">
                  Rápida, clara y hecha a la medida.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                {/* Botón que recibe el clic del cursor (0.84 a 0.88) */}
                <motion.div
                  style={{ scale: heroBtnScale }}
                  className="relative overflow-hidden text-[8px] font-bold bg-white text-primary px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1"
                >
                  {/* Onda de clic */}
                  <motion.div
                    style={{
                      scale: rippleScale,
                      opacity: rippleOpacity,
                    }}
                    className="absolute inset-0 bg-primary/25 rounded-md pointer-events-none"
                  />
                  <span>Ver catálogo</span>
                  <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                </motion.div>

                <span className="text-[7px] font-mono text-white/90">
                  99/100 Rendimiento
                </span>
              </div>
            </motion.div>

            {/* 
              3 TARJETAS:
              - Antes de 0.88: cuadrícula horizontal 3 columnas pintada
              - De 0.88 a 1.0: reacomodo responsivo a columna única
            */}
            <div className="relative my-auto">
              {/* Formato 1: 3 Columnas pintadas con iconos (0.45 a 0.88) */}
              <motion.div
                style={{
                  clipPath: paintCardsClip,
                  opacity: rowCardsOpacity,
                  display: rowCardsDisplay,
                }}
                className="grid grid-cols-3 gap-1.5"
              >
                <div className="bg-white rounded-lg p-1.5 border border-slate-200/70 shadow-2xs flex flex-col items-center gap-1 text-center">
                  <div className="w-5 h-5 rounded-md bg-sky-50 text-[#0EA5E9] flex items-center justify-center">
                    <Zap className="w-3 h-3" />
                  </div>
                  <span className="text-[8px] font-bold text-slate-800">Rápida</span>
                </div>

                <div className="bg-white rounded-lg p-1.5 border border-slate-200/70 shadow-2xs flex flex-col items-center gap-1 text-center">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 text-primary flex items-center justify-center">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="text-[8px] font-bold text-slate-800">Moderna</span>
                </div>

                <div className="bg-white rounded-lg p-1.5 border border-slate-200/70 shadow-2xs flex flex-col items-center gap-1 text-center">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Shield className="w-3 h-3" />
                  </div>
                  <span className="text-[8px] font-bold text-slate-800">Segura</span>
                </div>
              </motion.div>

              {/* Formato 2: Reacomodo responsivo en columna única con palomitas (0.88 a 1.0) */}
              <motion.div
                style={{
                  opacity: colCardsOpacity,
                  y: colCardsY,
                  display: colCardsDisplay,
                }}
                className="flex flex-col gap-1"
              >
                <div className="bg-white rounded-lg px-2 py-1 border border-slate-200/70 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-sky-50 text-[#0EA5E9] flex items-center justify-center">
                      <Zap className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-800">
                      Carga ultrarrápida
                    </span>
                  </div>
                  <span className="text-[7px] font-mono text-emerald-600 font-bold">
                    ✓ 99/100
                  </span>
                </div>

                <div className="bg-white rounded-lg px-2 py-1 border border-slate-200/70 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-indigo-50 text-primary flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-800">
                      Diseño a la medida
                    </span>
                  </div>
                  <span className="text-[7px] font-mono text-emerald-600 font-bold">
                    ✓ Móvil
                  </span>
                </div>

                <div className="bg-white rounded-lg px-2 py-1 border border-slate-200/70 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Shield className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-800">
                      Seguridad SSL
                    </span>
                  </div>
                  <span className="text-[7px] font-mono text-emerald-600 font-bold">
                    ✓ Activa
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Pie de página pintado */}
            <motion.div
              style={{ clipPath: paintFooterClip }}
              className="h-6 rounded-lg bg-white border border-slate-200/70 px-2 flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-1">
                <Smartphone className="w-2.5 h-2.5 text-primary" />
                <span className="text-[7px] text-slate-600 font-medium">
                  Diseño 100% responsivo
                </span>
              </div>
              <span className="text-primary text-[8px] font-bold">→</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
