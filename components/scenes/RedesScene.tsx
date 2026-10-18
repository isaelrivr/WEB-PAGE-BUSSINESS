"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  Check,
} from "lucide-react";

interface SceneProps {
  t: MotionValue<number>;
  reducedMotion?: boolean;
}

// 1. Historia individual con anillo giratorio y rebote escalonado (0 a 0.20)
function StoryCircle({
  t,
  index,
  gradient,
}: {
  t: MotionValue<number>;
  index: number;
  gradient: string;
}) {
  const startT = 0.02 + index * 0.035;
  const midT = startT + 0.035;
  const endT = startT + 0.065;

  const scale = useTransform(t, [startT, midT, endT], [0, 1.22, 1]);
  const opacity = useTransform(t, [startT, startT + 0.015], [0, 1]);
  const rotate = useTransform(t, [0, 1], [0, 720]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="flex flex-col items-center gap-1 shrink-0"
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Aro con degradado que gira continuamente */}
        <motion.div
          style={{ rotate }}
          className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-primary via-[#0EA5E9] to-pink-500"
        >
          <div className="w-full h-full bg-white rounded-full" />
        </motion.div>

        {/* Círculo interior */}
        <div
          className={`relative z-10 w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xs`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
        </div>
      </div>
      <div className="w-6 h-1 bg-slate-200 rounded-full" />
    </motion.div>
  );
}

// 2. Cuadro individual de la cuadrícula 3x3 con rotación 3D (rotateY 90° -> 0°) y stagger (0.20 a 0.60)
function FeedSquareItem({
  t,
  index,
  type,
  gradient,
  isFeatured,
}: {
  t: MotionValue<number>;
  index: number;
  type: "photo" | "video" | "text" | "carousel";
  gradient: string;
  isFeatured?: boolean;
}) {
  const startT = 0.2 + index * 0.04;
  const endT = startT + 0.06;

  // Rotación en 3D de 90° a 0°
  const rotateY = useTransform(t, [startT, endT], [90, 0]);
  const scale = useTransform(t, [startT, startT + 0.035, endT], [0.75, 1.08, 1]);
  const opacity = useTransform(t, [startT, startT + 0.015], [0, 1]);

  // Corazón latiendo sobre el cuadro destacado (0.60 a 0.80)
  const heartScale = useTransform(
    t,
    [0.6, 0.64, 0.68, 0.72, 0.76, 0.8],
    [1, 1.35, 1, 1.35, 1, 1]
  );
  const heartOpacity = useTransform(t, [0.6, 0.63, 0.78, 0.82], [0, 1, 1, 0.85]);

  return (
    <motion.div
      style={{
        rotateY,
        scale,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className={`relative aspect-square rounded-xl bg-gradient-to-br ${gradient} p-2 flex flex-col justify-between overflow-hidden shadow-xs border border-white/20 select-none`}
    >
      {/* Contenido según el tipo de publicación */}
      {type === "video" && (
        <>
          <div className="flex justify-end">
            <span className="p-1 rounded-full bg-black/35 backdrop-blur-xs text-white">
              <Play className="w-2.5 h-2.5 fill-white stroke-none" />
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <div className="h-1 w-6 bg-white/70 rounded-full" />
          </div>
        </>
      )}

      {type === "carousel" && (
        <>
          <div className="flex justify-end">
            <span className="p-1 rounded-full bg-black/35 backdrop-blur-xs text-white">
              <Layers className="w-2.5 h-2.5" />
            </span>
          </div>
          <div className="flex items-center justify-between">
            {/* Puntos de carrusel */}
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span className="w-1 h-1 rounded-full bg-white/60" />
              <span className="w-1 h-1 rounded-full bg-white/40" />
            </div>
            <Sparkles className="w-2.5 h-2.5 text-white/80" />
          </div>
        </>
      )}

      {type === "text" && (
        <div className="h-full flex flex-col justify-between py-0.5">
          <div className="w-5 h-1 bg-white/90 rounded-full" />
          <div className="space-y-1 my-auto">
            <div className="w-full h-1.5 bg-white/90 rounded-full" />
            <div className="w-4/5 h-1.5 bg-white/80 rounded-full" />
            <div className="w-3/5 h-1 bg-white/60 rounded-full" />
          </div>
          <div className="w-4 h-1 bg-white/70 rounded-full" />
        </div>
      )}

      {type === "photo" && (
        <>
          <div className="flex justify-between items-center">
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span className="w-1 h-1 rounded-full bg-white/80" />
          </div>
          <div className="space-y-1">
            <div className="w-8 h-1.5 bg-white/85 rounded-full" />
            <div className="w-5 h-1 bg-white/60 rounded-full" />
          </div>
        </>
      )}

      {/* Corazón que late sobre el cuadro destacado */}
      {isFeatured && (
        <motion.div
          style={{
            scale: heartScale,
            opacity: heartOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <div className="p-1.5 rounded-full bg-white/90 shadow-md text-rose-500 flex items-center justify-center">
            <Heart className="w-4 h-4 fill-rose-500 stroke-none" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// 3. Reacciones flotantes (corazón, comentario, compartir) con vaivén lateral y desvanecimiento (0.60 a 0.80)
function FloatingReactionsOverlay({ t }: { t: MotionValue<number> }) {
  // Reacción 1: Corazón (sube de y:40 a y:-60 con vaivén en x)
  const heartY = useTransform(t, [0.6, 0.78], [50, -70]);
  const heartX = useTransform(
    t,
    [0.6, 0.65, 0.7, 0.75, 0.78],
    [0, -12, 10, -8, 4]
  );
  const heartOpacity = useTransform(t, [0.6, 0.64, 0.74, 0.78], [0, 1, 1, 0]);
  const heartScale = useTransform(t, [0.6, 0.65, 0.78], [0.6, 1.25, 0.9]);

  // Reacción 2: Comentario
  const commentY = useTransform(t, [0.63, 0.8], [60, -60]);
  const commentX = useTransform(
    t,
    [0.63, 0.68, 0.73, 0.78, 0.8],
    [0, 14, -10, 8, -4]
  );
  const commentOpacity = useTransform(t, [0.63, 0.67, 0.76, 0.8], [0, 1, 1, 0]);
  const commentScale = useTransform(t, [0.63, 0.68, 0.8], [0.6, 1.15, 0.85]);

  // Reacción 3: Compartir
  const shareY = useTransform(t, [0.65, 0.82], [70, -50]);
  const shareX = useTransform(
    t,
    [0.65, 0.7, 0.75, 0.8, 0.82],
    [0, -10, 12, -6, 2]
  );
  const shareOpacity = useTransform(t, [0.65, 0.69, 0.78, 0.82], [0, 1, 1, 0]);
  const shareScale = useTransform(t, [0.65, 0.7, 0.82], [0.6, 1.2, 0.9]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
      {/* Burbuja Corazón */}
      <motion.div
        style={{
          x: heartX,
          y: heartY,
          opacity: heartOpacity,
          scale: heartScale,
          left: "32%",
          top: "45%",
        }}
        className="absolute p-2 rounded-full bg-rose-50 text-rose-500 shadow-lg border border-rose-200/80"
      >
        <Heart className="w-4 h-4 fill-rose-500 stroke-none" />
      </motion.div>

      {/* Burbuja Comentario */}
      <motion.div
        style={{
          x: commentX,
          y: commentY,
          opacity: commentOpacity,
          scale: commentScale,
          left: "60%",
          top: "50%",
        }}
        className="absolute p-2 rounded-full bg-sky-50 text-[#0EA5E9] shadow-lg border border-sky-200/80"
      >
        <MessageCircle className="w-4 h-4 fill-[#0EA5E9] stroke-none" />
      </motion.div>

      {/* Burbuja Compartir */}
      <motion.div
        style={{
          x: shareX,
          y: shareY,
          opacity: shareOpacity,
          scale: shareScale,
          left: "45%",
          top: "58%",
        }}
        className="absolute p-2 rounded-full bg-indigo-50 text-primary shadow-lg border border-indigo-200/80"
      >
        <Share2 className="w-4 h-4 stroke-[2.5]" />
      </motion.div>
    </div>
  );
}

// 4. Chip del calendario con deslizamiento y palomita dibujada (0.80 a 1.0)
function CalendarDayChip({
  t,
  day,
  checkStart,
}: {
  t: MotionValue<number>;
  day: string;
  checkStart: number;
}) {
  const checkEnd = checkStart + 0.05;
  const pathLength = useTransform(t, [checkStart, checkEnd], [0, 1]);
  const scale = useTransform(
    t,
    [checkStart, checkStart + 0.025, checkEnd],
    [1, 1.15, 1]
  );

  return (
    <motion.div
      style={{ scale }}
      className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold shadow-2xs"
    >
      <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none">
        <motion.path
          d="M3 8.5 L6.5 12 L13 4"
          stroke="#059669"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
        />
      </svg>
      <span>{day}</span>
    </motion.div>
  );
}

// Configuración de los 9 cuadros
const FEED_ITEMS: Array<{
  type: "photo" | "video" | "text" | "carousel";
  gradient: string;
  isFeatured?: boolean;
}> = [
  { type: "photo", gradient: "from-[#0EA5E9] to-[#0284C7]" },
  { type: "video", gradient: "from-primary to-[#4338CA]", isFeatured: true },
  { type: "text", gradient: "from-[#A78BFA] to-primary" },
  { type: "carousel", gradient: "from-[#0EA5E9]/90 to-[#A78BFA]" },
  { type: "photo", gradient: "from-primary to-[#0EA5E9]" },
  { type: "video", gradient: "from-[#A78BFA] to-purple-600" },
  { type: "text", gradient: "from-[#0284C7] to-primary" },
  { type: "photo", gradient: "from-[#A78BFA] to-[#0EA5E9]" },
  { type: "carousel", gradient: "from-[#0EA5E9] to-sky-400" },
];

export default function RedesScene({ t, reducedMotion = false }: SceneProps) {
  // Animación del contenedor de calendario inferior (0.80 a 1.0)
  const calY = useTransform(t, [0.8, 0.88], [24, 0]);
  const calOpacity = useTransform(t, [0.8, 0.86], [0, 1]);

  const programmedScale = useTransform(t, [0.9, 0.95, 1], [0.8, 1.15, 1]);
  const programmedOpacity = useTransform(t, [0.9, 0.94], [0, 1]);

  // Si reducen movimiento: render directo en su estado final ordenado y completo
  if (reducedMotion) {
    return (
      <div className="h-full flex flex-col justify-between py-1 px-0.5 select-none bg-slate-50">
        {/* Historias estáticas */}
        <div className="flex items-center gap-2 overflow-x-hidden py-1 px-1 border-b border-slate-200/60">
          {[
            "from-primary to-[#0EA5E9]",
            "from-[#A78BFA] to-primary",
            "from-[#0EA5E9] to-sky-400",
            "from-primary to-[#4338CA]",
          ].map((grad, i) => (
            <div key={i} className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-primary via-[#0EA5E9] to-pink-500">
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-br ${grad} flex items-center justify-center`}
                >
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                </div>
              </div>
              <div className="w-6 h-1 bg-slate-200 rounded-full" />
            </div>
          ))}
        </div>

        {/* Cuadrícula 3x3 */}
        <div className="grid grid-cols-3 gap-1.5 my-auto py-1">
          {FEED_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-xl bg-gradient-to-br ${item.gradient} p-2 flex items-end justify-between text-white shadow-xs`}
            >
              {item.type === "video" && <Play className="w-3 h-3 fill-white" />}
              {item.type === "carousel" && <Layers className="w-3 h-3" />}
              {item.type === "text" && <Sparkles className="w-3 h-3" />}
              {item.type === "photo" && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              )}
            </div>
          ))}
        </div>

        {/* Tira de calendario con chips y píldora 'Programado' */}
        <div className="bg-white rounded-xl p-2 border border-slate-200/80 shadow-xs flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
              <Calendar className="w-3 h-3 text-primary" />
              <span>Calendario de contenido</span>
            </span>
            <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
              Programado
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {["Lun", "Mié", "Vie"].map((d) => (
              <div
                key={d}
                className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold"
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex flex-col justify-between py-1 px-0.5 select-none bg-slate-50 overflow-hidden">
      {/* Capa de reacciones flotantes (0.60 a 0.80) */}
      <FloatingReactionsOverlay t={t} />

      {/* 
        1. FILA DE 4 CÍRCULOS TIPO HISTORIAS (0 a 0.20)
        Aparecen con rebote escalonado y aros giratorios
      */}
      <div className="flex items-center gap-2.5 overflow-x-hidden py-1 px-1 border-b border-slate-200/60 bg-white/50 backdrop-blur-xs rounded-xl shrink-0">
        {[
          "from-primary to-[#0EA5E9]",
          "from-[#A78BFA] to-primary",
          "from-[#0EA5E9] to-sky-400",
          "from-primary to-[#4338CA]",
        ].map((grad, i) => (
          <StoryCircle key={i} t={t} index={i} gradient={grad} />
        ))}
      </div>

      {/* 
        2. CUADRÍCULA 3X3 CON GIRO EN 3D (0.20 a 0.60)
        Cada cuadro gira en rotateY de 90° a 0° con stagger.
        Variedad: foto, video (play), texto y carrusel (puntos).
      */}
      <div
        style={{ perspective: 700 }}
        className="grid grid-cols-3 gap-1.5 my-auto py-1 relative z-10"
      >
        {FEED_ITEMS.map((item, idx) => (
          <FeedSquareItem
            key={idx}
            t={t}
            index={idx}
            type={item.type}
            gradient={item.gradient}
            isFeatured={item.isFeatured}
          />
        ))}
      </div>

      {/* 
        4. TIRA DE CALENDARIO INFERIOR (0.80 a 1.0)
        Chips 'Lun', 'Mié' y 'Vie' que se deslizan y se marcan con palomita dibujada,
        más una píldora 'Programado'
      */}
      <motion.div
        style={{
          y: calY,
          opacity: calOpacity,
        }}
        className="bg-white rounded-xl p-2 border border-slate-200/80 shadow-xs flex flex-col gap-1.5 shrink-0 z-20"
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
            <Calendar className="w-3 h-3 text-primary" />
            <span>Calendario de contenido</span>
          </span>

          {/* Píldora 'Programado' */}
          <motion.span
            style={{
              scale: programmedScale,
              opacity: programmedOpacity,
            }}
            className="text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs"
          >
            ✓ Programado
          </motion.span>
        </div>

        {/* Chips 'Lun', 'Mié' y 'Vie' con palomitas dibujadas */}
        <div className="flex items-center gap-1.5">
          <CalendarDayChip t={t} day="Lun" checkStart={0.84} />
          <CalendarDayChip t={t} day="Mié" checkStart={0.88} />
          <CalendarDayChip t={t} day="Vie" checkStart={0.92} />
        </div>
      </motion.div>
    </div>
  );
}
