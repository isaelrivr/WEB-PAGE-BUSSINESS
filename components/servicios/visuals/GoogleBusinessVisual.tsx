"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { Search, MapPin, Phone, Navigation, Globe, CheckCircle2 } from "lucide-react";

interface VisualProps {
  foco: MotionValue<number>;
  reducedMotion?: boolean;
}

const FULL_TEXT = "negocio cerca de mí";

export default function GoogleBusinessVisual({
  foco,
  reducedMotion = false,
}: VisualProps) {
  const [typedText, setTypedText] = useState(reducedMotion ? FULL_TEXT : "");

  useEffect(() => {
    if (reducedMotion) {
      setTypedText(FULL_TEXT);
    }
  }, [reducedMotion]);

  // 1. Efecto máquina de escribir de 0 a 0.35 para 'negocio cerca de mí'
  useMotionValueEvent(foco, "change", (latest) => {
    if (reducedMotion) return;
    if (latest <= 0.02) {
      setTypedText("");
    } else if (latest >= 0.32) {
      setTypedText(FULL_TEXT);
    } else {
      const progress = (latest - 0.02) / (0.32 - 0.02);
      const chars = Math.round(progress * FULL_TEXT.length);
      setTypedText(FULL_TEXT.slice(0, chars));
    }
  });

  const cursorOpacity = useTransform(foco, [0.02, 0.32, 0.36], [1, 1, 0]);

  // 2. Lista de 3 resultados como esqueletos (aparece de 0.35 a 0.42)
  const listOpacity = useTransform(foco, [0.34, 0.42], [0, 1]);
  const listY = useTransform(foco, [0.34, 0.42], [8, 0]);

  // 'Tu negocio' sube al primer lugar (-30px) y el competidor 1 baja (+30px) entre 0.42 y 0.58
  const tuNegocioY = useTransform(foco, [0.42, 0.58], [0, -30]);
  const comp1Y = useTransform(foco, [0.42, 0.58], [0, 30]);
  const comp1Opacity = useTransform(foco, [0.42, 0.58], [0.8, 0.45]);
  const comp2Opacity = useTransform(foco, [0.42, 0.58], [0.7, 0.35]);

  // Pin celeste de mapa (#0EA5E9) que cae con pequeño rebote (0.48 a 0.70)
  const pinY = useTransform(
    foco,
    [0.48, 0.58, 0.63, 0.67, 0.7],
    [-28, 0, -7, 0, 0]
  );
  const pinScale = useTransform(
    foco,
    [0.48, 0.58, 0.63, 0.67, 0.7],
    [0.5, 1.25, 0.92, 1.05, 1]
  );
  const pinOpacity = useTransform(foco, [0.47, 0.51], [0, 1]);

  // 3. De 0.7 a 1 aparecen, uno tras otro, tres botones: Llamar, Cómo llegar y Sitio web
  const btn1Opacity = useTransform(foco, [0.7, 0.78], [0, 1]);
  const btn1Scale = useTransform(foco, [0.7, 0.78, 0.83], [0.5, 1.15, 1]);
  const btn1Y = useTransform(foco, [0.7, 0.78], [6, 0]);

  const btn2Opacity = useTransform(foco, [0.78, 0.86], [0, 1]);
  const btn2Scale = useTransform(foco, [0.78, 0.86, 0.91], [0.5, 1.15, 1]);
  const btn2Y = useTransform(foco, [0.78, 0.86], [6, 0]);

  const btn3Opacity = useTransform(foco, [0.86, 0.94], [0, 1]);
  const btn3Scale = useTransform(foco, [0.86, 0.94, 0.98], [0.5, 1.15, 1]);
  const btn3Y = useTransform(foco, [0.86, 0.94], [6, 0]);

  return (
    <div className="relative w-full h-44 sm:h-48 rounded-2xl bg-indigo-50/40 border border-indigo-100/60 shadow-inner flex flex-col justify-between overflow-hidden p-2.5 sm:p-3 select-none">
      {/* Etiqueta pequeña: Ejemplo ilustrativo */}
      <span className="absolute top-2 right-2.5 text-[9px] font-medium tracking-wider uppercase text-text-muted/70 bg-white/80 border border-slate-200/50 px-2 py-0.5 rounded-md backdrop-blur-xs z-30">
        Ejemplo ilustrativo
      </span>

      {/* 1. Barra de búsqueda con efecto máquina de escribir */}
      <div className="w-full max-w-[230px] sm:max-w-[250px] mx-auto bg-white rounded-full border border-slate-200/90 shadow-xs px-2.5 py-1 flex items-center gap-2 shrink-0 z-20">
        <Search className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
        <div className="flex-1 flex items-center overflow-hidden">
          <span className="text-xs font-medium text-slate-800 tracking-tight whitespace-nowrap">
            {reducedMotion ? FULL_TEXT : typedText}
          </span>
          {!reducedMotion && (
            <motion.span
              style={{ opacity: cursorOpacity }}
              className="inline-block w-0.5 h-3.5 bg-[#0EA5E9] ml-0.5 shrink-0"
            />
          )}
        </div>
      </div>

      {/* 2. Lista de 3 resultados: Tu negocio sube a la 1ra posición */}
      <motion.div
        style={
          reducedMotion ? { opacity: 1, y: 0 } : { opacity: listOpacity, y: listY }
        }
        className="relative flex-1 flex flex-col justify-center gap-1.5 my-1"
      >
        {/* Posición 1 inicial: Competidor 1 (baja al 2do lugar al adelantarlo Tu negocio) */}
        <motion.div
          style={
            reducedMotion
              ? { y: 30, opacity: 0.45 }
              : { y: comp1Y, opacity: comp1Opacity }
          }
          className="w-full bg-white/60 border border-slate-200/60 rounded-lg p-1.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-200/70 shrink-0" />
            <div className="space-y-1">
              <div className="h-2 w-20 bg-slate-300/80 rounded-full" />
              <div className="h-1.5 w-12 bg-slate-200/70 rounded-full" />
            </div>
          </div>
          <div className="h-2 w-10 bg-slate-200/50 rounded-full" />
        </motion.div>

        {/* Posición 2 inicial: 'Tu negocio' (sube al 1er lugar) */}
        <motion.div
          style={reducedMotion ? { y: -30 } : { y: tuNegocioY }}
          className="w-full bg-white border border-[#0EA5E9]/40 shadow-sm rounded-lg p-1.5 flex items-center justify-between z-10"
        >
          <div className="flex items-center gap-2">
            {/* Pin celeste que cae con rebote */}
            <div className="relative w-4 h-4 flex items-center justify-center">
              <motion.div
                style={
                  reducedMotion
                    ? { scale: 1, y: 0, opacity: 1 }
                    : { scale: pinScale, y: pinY, opacity: pinOpacity }
                }
                className="w-4 h-4 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center shadow-sm shadow-sky-500/40"
              >
                <MapPin className="w-2.5 h-2.5 fill-white stroke-[#0EA5E9]" />
              </motion.div>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 tracking-tight leading-none">
                  Tu negocio
                </span>
                <CheckCircle2 className="w-3 h-3 text-[#0EA5E9] shrink-0 fill-[#0EA5E9]/10" />
              </div>
              <div className="h-1.5 w-14 bg-emerald-500/70 rounded-full mt-1" />
            </div>
          </div>

          <span className="text-[9px] font-semibold text-[#0EA5E9] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200/60">
            #1 Local
          </span>
        </motion.div>

        {/* Posición 3: Competidor 2 (permanece al fondo como esqueleto atenuado) */}
        <motion.div
          style={reducedMotion ? { opacity: 0.35 } : { opacity: comp2Opacity }}
          className="w-full bg-white/40 border border-slate-200/40 rounded-lg p-1.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-200/50 shrink-0" />
            <div className="space-y-1">
              <div className="h-2 w-16 bg-slate-300/60 rounded-full" />
              <div className="h-1.5 w-10 bg-slate-200/50 rounded-full" />
            </div>
          </div>
          <div className="h-2 w-8 bg-slate-200/40 rounded-full" />
        </motion.div>
      </motion.div>

      {/* 3. Tres botones de acción que aparecen de 0.7 a 1: Llamar, Cómo llegar y Sitio web */}
      <div className="pt-1 border-t border-indigo-100/50 flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 z-20">
        {/* Botón 1: Llamar */}
        <motion.div
          style={
            reducedMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: btn1Opacity, scale: btn1Scale, y: btn1Y }
          }
          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[10px] sm:text-[11px] font-semibold text-slate-700 flex items-center gap-1 shrink-0"
        >
          <Phone className="w-3 h-3 text-[#0EA5E9] shrink-0" />
          <span>Llamar</span>
        </motion.div>

        {/* Botón 2: Cómo llegar */}
        <motion.div
          style={
            reducedMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: btn2Opacity, scale: btn2Scale, y: btn2Y }
          }
          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[10px] sm:text-[11px] font-semibold text-slate-700 flex items-center gap-1 shrink-0"
        >
          <Navigation className="w-3 h-3 text-[#0EA5E9] shrink-0" />
          <span>Cómo llegar</span>
        </motion.div>

        {/* Botón 3: Sitio web */}
        <motion.div
          style={
            reducedMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: btn3Opacity, scale: btn3Scale, y: btn3Y }
          }
          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[10px] sm:text-[11px] font-semibold text-slate-700 flex items-center gap-1 shrink-0"
        >
          <Globe className="w-3 h-3 text-[#0EA5E9] shrink-0" />
          <span>Sitio web</span>
        </motion.div>
      </div>
    </div>
  );
}
