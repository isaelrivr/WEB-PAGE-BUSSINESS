"use client";

import { motion } from "motion/react";
import { Search, MapPin, Phone, Navigation, Globe, CheckCircle2 } from "lucide-react";

interface ScreenProps {
  reducedMotion?: boolean;
}

export default function GoogleScreen({ reducedMotion = false }: ScreenProps) {
  return (
    <div className="h-full flex flex-col justify-between py-2 px-1 select-none">
      {/* 1. Barra de búsqueda */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full bg-white rounded-full border border-slate-200/90 shadow-xs px-3 py-1.5 flex items-center gap-2 shrink-0"
      >
        <Search className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
        <span className="text-xs font-medium text-slate-800 tracking-tight">
          negocio cerca de mí
        </span>
      </motion.div>

      {/* 2. Resultado destacado con pin celeste y botones */}
      <div className="my-auto space-y-2 py-2">
        {/* Tarjeta destacada de 'Tu negocio' */}
        <motion.div
          initial={reducedMotion ? false : { scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full bg-white rounded-2xl border border-[#0EA5E9]/40 shadow-md p-3 flex flex-col gap-2.5"
        >
          {/* Cabecera del negocio */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center shadow-xs">
                <MapPin className="w-3.5 h-3.5 fill-white stroke-[#0EA5E9]" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-900 leading-none">
                    Tu negocio
                  </span>
                  <CheckCircle2 className="w-3 h-3 text-[#0EA5E9] fill-[#0EA5E9]/10" />
                </div>
                <div className="h-1.5 w-16 bg-emerald-500/70 rounded-full mt-1" />
              </div>
            </div>

            <span className="text-[9px] font-semibold text-[#0EA5E9] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200/60">
              Destacado
            </span>
          </div>

          {/* Tres botones: Llamar, Cómo llegar y Sitio web */}
          <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-100">
            {/* Llamar */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.25 }}
              className="py-1 px-1.5 rounded-lg bg-sky-50/70 border border-sky-100 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700"
            >
              <Phone className="w-3 h-3 text-[#0EA5E9]" />
              <span>Llamar</span>
            </motion.div>

            {/* Cómo llegar */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.25 }}
              className="py-1 px-1.5 rounded-lg bg-sky-50/70 border border-sky-100 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700"
            >
              <Navigation className="w-3 h-3 text-[#0EA5E9]" />
              <span>Llegar</span>
            </motion.div>

            {/* Sitio web */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.25 }}
              className="py-1 px-1.5 rounded-lg bg-sky-50/70 border border-sky-100 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700"
            >
              <Globe className="w-3 h-3 text-[#0EA5E9]" />
              <span>Sitio web</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 2 resultados esqueleto secundarios */}
        <div className="space-y-1.5 opacity-40">
          <div className="w-full bg-slate-100 rounded-lg p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-300" />
              <div className="space-y-1">
                <div className="h-1.5 w-16 bg-slate-400 rounded-full" />
                <div className="h-1 w-10 bg-slate-300 rounded-full" />
              </div>
            </div>
            <div className="h-2 w-8 bg-slate-200 rounded-full" />
          </div>

          <div className="w-full bg-slate-100 rounded-lg p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-300" />
              <div className="space-y-1">
                <div className="h-1.5 w-14 bg-slate-400 rounded-full" />
                <div className="h-1 w-8 bg-slate-300 rounded-full" />
              </div>
            </div>
            <div className="h-2 w-8 bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
