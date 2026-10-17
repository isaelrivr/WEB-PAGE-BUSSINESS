"use client";

import { motion } from "motion/react";
import {
  Calendar,
  Check,
  Image as ImageIcon,
  Play,
  Sparkles,
  Heart,
  Bookmark,
} from "lucide-react";

interface ScreenProps {
  reducedMotion?: boolean;
}

const FEED_ICONS = [
  ImageIcon,
  Play,
  Sparkles,
  Heart,
  Bookmark,
  Sparkles,
  Play,
  ImageIcon,
  Sparkles,
];

const FEED_GRADIENTS = [
  "from-[#0EA5E9] to-[#0284C7]",
  "from-primary to-[#4338CA]",
  "from-[#A78BFA] to-primary",
  "from-[#0EA5E9]/90 to-[#A78BFA]",
  "from-primary to-[#0EA5E9]",
  "from-[#A78BFA] to-[#0EA5E9]",
  "from-[#0284C7] to-primary",
  "from-[#A78BFA] to-purple-600",
  "from-[#0EA5E9] to-sky-400",
];

export default function RedesScreen({ reducedMotion = false }: ScreenProps) {
  return (
    <div className="h-full flex flex-col justify-between py-1 px-0.5 select-none">
      {/* 1. Mini calendario con chips 'Lun', 'Mié' y 'Vie' */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-slate-50 rounded-xl p-2 border border-slate-200/70 shrink-0"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1">
            <Calendar className="w-3 h-3 text-primary" />
            <span>Plan semanal</span>
          </span>
          <span className="text-[8px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1 rounded">
            En marcha
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {["Lun", "Mié", "Vie"].map((day, idx) => (
            <motion.div
              key={day}
              initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={
                reducedMotion
                  ? undefined
                  : { delay: 0.15 + idx * 0.12, duration: 0.25 }
              }
              className="py-1 rounded-lg bg-primary text-white flex items-center justify-center gap-0.5 text-[9px] font-bold shadow-2xs"
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
              <span>{day}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 2. Cuadrícula 3x3 estilo feed: aparecen uno a uno con pequeño rebote */}
      <div className="grid grid-cols-3 gap-1.5 pt-2 my-auto">
        {FEED_GRADIENTS.map((gradient, idx) => {
          const Icon = FEED_ICONS[idx];
          return (
            <motion.div
              key={idx}
              initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.15, 1], opacity: 1 }}
              transition={
                reducedMotion
                  ? undefined
                  : { delay: 0.2 + idx * 0.06, duration: 0.3 }
              }
              className={`aspect-square rounded-lg bg-gradient-to-br ${gradient} p-1 flex items-center justify-center shadow-xs relative overflow-hidden`}
            >
              <Icon className="w-4 h-4 text-white/85" />
              <div className="absolute top-0 inset-x-0 h-1.5 bg-white/20" />
            </motion.div>
          );
        })}
      </div>

      {/* Reacciones sutiles abajo */}
      <div className="flex items-center justify-center gap-3 pt-1 text-slate-400">
        <div className="flex items-center gap-1 text-[9px] font-medium text-rose-500">
          <Heart className="w-3 h-3 fill-rose-500" />
          <span>Activo</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="text-[9px] text-slate-500 font-medium">Contenido constante</span>
      </div>
    </div>
  );
}
