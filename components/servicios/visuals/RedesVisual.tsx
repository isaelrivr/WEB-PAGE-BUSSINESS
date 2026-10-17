"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import {
  Calendar,
  Check,
  Heart,
  MessageCircle,
  Send,
  Image as ImageIcon,
  Play,
  Sparkles,
  Bookmark,
} from "lucide-react";

interface VisualProps {
  foco: MotionValue<number>;
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

export default function RedesVisual({
  foco,
  reducedMotion = false,
}: VisualProps) {
  // 1. Mini calendario: chips 'Lun', 'Mié', 'Vie' que se van marcando (0.05 a 0.38)
  const chip1Active = useTransform(foco, [0.08, 0.14], [0, 1]);
  const chip1Scale = useTransform(foco, [0.08, 0.13, 0.18], [1, 1.2, 1]);

  const chip2Active = useTransform(foco, [0.18, 0.24], [0, 1]);
  const chip2Scale = useTransform(foco, [0.18, 0.23, 0.28], [1, 1.2, 1]);

  const chip3Active = useTransform(foco, [0.28, 0.34], [0, 1]);
  const chip3Scale = useTransform(foco, [0.28, 0.33, 0.38], [1, 1.2, 1]);

  // 2. Cuadros 3x3 estilo feed: aparecen uno a uno con escala y pequeño rebote (0.24 a 0.74)
  const sq0Scale = useTransform(foco, [0.24, 0.29, 0.33], [0, 1.2, 1]);
  const sq0Opacity = useTransform(foco, [0.24, 0.28], [0, 1]);

  const sq1Scale = useTransform(foco, [0.29, 0.34, 0.38], [0, 1.2, 1]);
  const sq1Opacity = useTransform(foco, [0.29, 0.33], [0, 1]);

  const sq2Scale = useTransform(foco, [0.34, 0.39, 0.43], [0, 1.2, 1]);
  const sq2Opacity = useTransform(foco, [0.34, 0.38], [0, 1]);

  const sq3Scale = useTransform(foco, [0.39, 0.44, 0.48], [0, 1.2, 1]);
  const sq3Opacity = useTransform(foco, [0.39, 0.43], [0, 1]);

  const sq4Scale = useTransform(foco, [0.44, 0.49, 0.53], [0, 1.2, 1]);
  const sq4Opacity = useTransform(foco, [0.44, 0.48], [0, 1]);

  const sq5Scale = useTransform(foco, [0.49, 0.54, 0.58], [0, 1.2, 1]);
  const sq5Opacity = useTransform(foco, [0.49, 0.53], [0, 1]);

  const sq6Scale = useTransform(foco, [0.54, 0.59, 0.63], [0, 1.2, 1]);
  const sq6Opacity = useTransform(foco, [0.54, 0.58], [0, 1]);

  const sq7Scale = useTransform(foco, [0.59, 0.64, 0.68], [0, 1.2, 1]);
  const sq7Opacity = useTransform(foco, [0.59, 0.63], [0, 1]);

  const sq8Scale = useTransform(foco, [0.64, 0.69, 0.73], [0, 1.2, 1]);
  const sq8Opacity = useTransform(foco, [0.64, 0.68], [0, 1]);

  const squares = [
    { scale: sq0Scale, opacity: sq0Opacity },
    { scale: sq1Scale, opacity: sq1Opacity },
    { scale: sq2Scale, opacity: sq2Opacity },
    { scale: sq3Scale, opacity: sq3Opacity },
    { scale: sq4Scale, opacity: sq4Opacity },
    { scale: sq5Scale, opacity: sq5Opacity },
    { scale: sq6Scale, opacity: sq6Opacity },
    { scale: sq7Scale, opacity: sq7Opacity },
    { scale: sq8Scale, opacity: sq8Opacity },
  ];

  // 3. Burbujas flotantes (corazón, comentario, compartir) suben y se desvanecen
  const b1Y = useTransform(foco, [0.58, 0.85], [16, -46]);
  const b1X = useTransform(foco, [0.58, 0.85], [0, 6]);
  const b1Opacity = useTransform(foco, [0.58, 0.66, 0.78, 0.86], [0, 1, 1, 0]);
  const b1Scale = useTransform(foco, [0.58, 0.66, 0.85], [0.4, 1.15, 0.9]);

  const b2Y = useTransform(foco, [0.66, 0.92], [20, -50]);
  const b2X = useTransform(foco, [0.66, 0.92], [0, -6]);
  const b2Opacity = useTransform(foco, [0.66, 0.74, 0.84, 0.93], [0, 1, 1, 0]);
  const b2Scale = useTransform(foco, [0.66, 0.74, 0.92], [0.4, 1.15, 0.9]);

  const b3Y = useTransform(foco, [0.74, 0.98], [24, -54]);
  const b3X = useTransform(foco, [0.74, 0.98], [0, 8]);
  const b3Opacity = useTransform(foco, [0.74, 0.82, 0.91, 0.99], [0, 1, 1, 0]);
  const b3Scale = useTransform(foco, [0.74, 0.82, 0.98], [0.4, 1.15, 0.9]);

  return (
    <div className="relative w-full h-44 sm:h-48 rounded-2xl bg-gradient-to-br from-sky-50/40 via-purple-50/30 to-white border border-indigo-100/60 shadow-inner flex items-center justify-center overflow-hidden p-2.5 sm:p-3 select-none">
      {/* Etiqueta pequeña: Ejemplo ilustrativo */}
      <span className="absolute top-2 right-2.5 text-[9px] font-medium tracking-wider uppercase text-text-muted/70 bg-white/80 border border-slate-200/50 px-2 py-0.5 rounded-md backdrop-blur-xs z-30">
        Ejemplo ilustrativo
      </span>

      {/* Mockup de celular con feed */}
      <div className="relative w-44 sm:w-48 h-[152px] sm:h-[160px] rounded-2xl bg-slate-900 border-2 border-slate-700/80 shadow-xl shadow-indigo-950/20 p-1.5 flex flex-col z-10">
        {/* Dynamic Island / Bocina */}
        <div className="w-8 h-1.5 bg-slate-700 rounded-full mx-auto mb-1 shrink-0" />

        {/* Pantalla del celular */}
        <div className="flex-1 w-full bg-white rounded-xl p-1.5 flex flex-col justify-between overflow-hidden border border-slate-200/60">
          {/* Mini Calendario con chips 'Lun', 'Mié', 'Vie' que se van marcando */}
          <div className="bg-slate-50/90 rounded-lg p-1 border border-slate-200/60 shrink-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-0.5">
                <Calendar className="w-2.5 h-2.5 text-primary" />
                <span>Publicaciones</span>
              </span>
              <span className="text-[7px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1 rounded">
                Activo
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {/* Chip 1: Lun */}
              <div className="relative h-4 flex items-center justify-center">
                {/* Estado inactivo base */}
                <div className="w-full h-full rounded bg-slate-100 border border-slate-200/80 flex items-center justify-center text-[8px] font-semibold text-slate-500">
                  Lun
                </div>
                {/* Estado activo marcado */}
                <motion.div
                  style={
                    reducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: chip1Active, scale: chip1Scale }
                  }
                  className="absolute inset-0 rounded bg-primary text-white border border-primary flex items-center justify-center gap-0.5 text-[8px] font-bold shadow-2xs"
                >
                  <Check className="w-2 h-2 stroke-[3]" />
                  <span>Lun</span>
                </motion.div>
              </div>

              {/* Chip 2: Mié */}
              <div className="relative h-4 flex items-center justify-center">
                <div className="w-full h-full rounded bg-slate-100 border border-slate-200/80 flex items-center justify-center text-[8px] font-semibold text-slate-500">
                  Mié
                </div>
                <motion.div
                  style={
                    reducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: chip2Active, scale: chip2Scale }
                  }
                  className="absolute inset-0 rounded bg-primary text-white border border-primary flex items-center justify-center gap-0.5 text-[8px] font-bold shadow-2xs"
                >
                  <Check className="w-2 h-2 stroke-[3]" />
                  <span>Mié</span>
                </motion.div>
              </div>

              {/* Chip 3: Vie */}
              <div className="relative h-4 flex items-center justify-center">
                <div className="w-full h-full rounded bg-slate-100 border border-slate-200/80 flex items-center justify-center text-[8px] font-semibold text-slate-500">
                  Vie
                </div>
                <motion.div
                  style={
                    reducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: chip3Active, scale: chip3Scale }
                  }
                  className="absolute inset-0 rounded bg-primary text-white border border-primary flex items-center justify-center gap-0.5 text-[8px] font-bold shadow-2xs"
                >
                  <Check className="w-2 h-2 stroke-[3]" />
                  <span>Vie</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Cuadrícula 3x3 estilo feed con degradados de la paleta */}
          <div className="grid grid-cols-3 gap-1 pt-1">
            {squares.map((sq, idx) => {
              const Icon = FEED_ICONS[idx];
              const gradient = FEED_GRADIENTS[idx];

              return (
                <motion.div
                  key={idx}
                  style={
                    reducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: sq.opacity, scale: sq.scale }
                  }
                  className={`h-7 sm:h-8 rounded-md bg-gradient-to-br ${gradient} p-0.5 flex items-center justify-center shadow-2xs relative overflow-hidden`}
                >
                  <Icon className="w-3 h-3 text-white/80" />
                  {/* Brillo sutil superior */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/20" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Burbujas flotantes (corazón, comentario, compartir) que suben y se desvanecen */}
      {/* Burbuja 1: Corazón (Rosa) */}
      <motion.div
        style={
          reducedMotion
            ? { opacity: 1, scale: 1 }
            : {
                x: b1X,
                y: b1Y,
                opacity: b1Opacity,
                scale: b1Scale,
              }
        }
        className="absolute right-4 sm:right-7 bottom-8 w-7 h-7 rounded-full bg-rose-50 border border-rose-200 text-rose-500 shadow-md flex items-center justify-center z-20 pointer-events-none"
      >
        <Heart className="w-3.5 h-3.5 fill-rose-500 stroke-rose-500" />
      </motion.div>

      {/* Burbuja 2: Comentario (Índigo) */}
      <motion.div
        style={
          reducedMotion
            ? { opacity: 1, scale: 1 }
            : {
                x: b2X,
                y: b2Y,
                opacity: b2Opacity,
                scale: b2Scale,
              }
        }
        className="absolute left-4 sm:left-7 bottom-10 w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 text-primary shadow-md flex items-center justify-center z-20 pointer-events-none"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-primary/20 stroke-primary" />
      </motion.div>

      {/* Burbuja 3: Compartir (Celeste) */}
      <motion.div
        style={
          reducedMotion
            ? { opacity: 1, scale: 1 }
            : {
                x: b3X,
                y: b3Y,
                opacity: b3Opacity,
                scale: b3Scale,
              }
        }
        className="absolute right-8 sm:right-12 bottom-6 w-7 h-7 rounded-full bg-sky-50 border border-sky-200 text-[#0EA5E9] shadow-md flex items-center justify-center z-20 pointer-events-none"
      >
        <Send className="w-3 h-3 fill-[#0EA5E9]/20 stroke-[#0EA5E9]" />
      </motion.div>
    </div>
  );
}
