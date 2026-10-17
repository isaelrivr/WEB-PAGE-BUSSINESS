"use client";

import { motion } from "motion/react";
import { Lock, Zap, Sparkles, Shield } from "lucide-react";

interface ScreenProps {
  reducedMotion?: boolean;
}

export default function WebScreen({ reducedMotion = false }: ScreenProps) {
  return (
    <div className="h-full flex flex-col justify-between py-1 px-0.5 select-none">
      {/* Ventana de navegador en miniatura */}
      <div className="w-full h-full rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col overflow-hidden">
        {/* Barra superior de navegador con tres puntos, URL y barra de carga */}
        <div className="h-7 bg-slate-100/90 border-b border-slate-200 px-2.5 flex items-center justify-between gap-2 shrink-0 relative">
          {/* Tres puntos de ventana */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Barra de URL 'tunegocio.mx' */}
          <div className="h-4.5 px-2 bg-white rounded-md border border-slate-200/80 flex items-center gap-1 text-[8px] font-mono text-slate-600 shadow-2xs">
            <Lock className="w-2 h-2 text-emerald-500 shrink-0" />
            <span>tunegocio.mx</span>
          </div>

          {/* Badge rápido */}
          <span className="text-[7px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1 rounded-full shrink-0">
            ✓ 100%
          </span>

          {/* Barra de carga que se llena */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-slate-200/60 overflow-hidden">
            <motion.div
              initial={reducedMotion ? false : { width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary to-[#0EA5E9]"
            />
          </div>
        </div>

        {/* Contenido interior de la web */}
        <div className="flex-1 p-2 bg-slate-50/70 flex flex-col justify-between overflow-hidden">
          {/* Hero con degradado índigo-celeste */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-20 sm:h-22 rounded-xl bg-gradient-to-r from-primary via-[#4338CA] to-[#0EA5E9] p-2.5 text-white shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="h-2.5 w-24 bg-white/95 rounded-full" />
              <div className="h-1.5 w-16 bg-white/70 rounded-full" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="px-2 py-0.5 rounded-md bg-white text-primary text-[8px] font-bold shadow-xs">
                Ver más →
              </div>
              <div className="w-4 h-4 rounded-full bg-white/20" />
            </div>
          </motion.div>

          {/* Tres bloques que entran uno tras otro */}
          <div className="grid grid-cols-3 gap-1.5 pt-2">
            {/* Bloque 1 */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="bg-white rounded-lg border border-slate-200/80 p-1.5 flex flex-col items-center justify-center gap-1 shadow-2xs h-12"
            >
              <Zap className="w-3.5 h-3.5 text-primary" />
              <div className="h-1.5 w-8 bg-slate-200 rounded-full" />
            </motion.div>

            {/* Bloque 2 */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.3 }}
              className="bg-white rounded-lg border border-slate-200/80 p-1.5 flex flex-col items-center justify-center gap-1 shadow-2xs h-12"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <div className="h-1.5 w-8 bg-slate-200 rounded-full" />
            </motion.div>

            {/* Bloque 3 */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.61, duration: 0.3 }}
              className="bg-white rounded-lg border border-slate-200/80 p-1.5 flex flex-col items-center justify-center gap-1 shadow-2xs h-12"
            >
              <Shield className="w-3.5 h-3.5 text-[#A78BFA]" />
              <div className="h-1.5 w-8 bg-slate-200 rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
