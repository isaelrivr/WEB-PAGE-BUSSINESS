"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { QrCode, Wifi, Star } from "lucide-react";

interface SceneProps {
  t: MotionValue<number>;
  reducedMotion?: boolean;
}

// Direcciones fijas para los 6 destellos de cada estrella (sin Math.random)
const SPARKLE_DIRECTIONS = [
  { dx: -14, dy: -12 },
  { dx: 0, dy: -16 },
  { dx: 14, dy: -12 },
  { dx: -12, dy: 12 },
  { dx: 0, dy: 14 },
  { dx: 12, dy: 12 },
];

// 12 posiciones y colores fijos para el confeti
const CONFETTI_PIECES = [
  { x: -44, startY: -20, endY: 48, color: "bg-[#0EA5E9]", size: "w-1.5 h-1.5" },
  { x: -28, startY: -30, endY: 56, color: "bg-[#A78BFA]", size: "w-2 h-1" },
  { x: -14, startY: -22, endY: 62, color: "bg-[#F59E0B]", size: "w-1.5 h-1.5" },
  { x: 0, startY: -35, endY: 52, color: "bg-primary", size: "w-2 h-2" },
  { x: 14, startY: -25, endY: 65, color: "bg-[#10B981]", size: "w-1.5 h-1" },
  { x: 32, startY: -18, endY: 50, color: "bg-[#0EA5E9]", size: "w-2 h-1.5" },
  { x: -36, startY: -15, endY: 54, color: "bg-[#F59E0B]", size: "w-1 h-2" },
  { x: -20, startY: -32, endY: 60, color: "bg-primary", size: "w-1.5 h-1.5" },
  { x: -4, startY: -18, endY: 64, color: "bg-[#A78BFA]", size: "w-2 h-1" },
  { x: 18, startY: -28, endY: 58, color: "bg-[#10B981]", size: "w-1.5 h-1.5" },
  { x: 28, startY: -16, endY: 46, color: "bg-[#0EA5E9]", size: "w-2 h-2" },
  { x: 42, startY: -24, endY: 62, color: "bg-[#F59E0B]", size: "w-1.5 h-1" },
];

// Subcomponente para un destello de estrella (regla de hooks de React)
function SparkleDot({
  progress,
  opacity,
  dx,
  dy,
}: {
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
  dx: number;
  dy: number;
}) {
  const x = useTransform(progress, [0, 1], [0, dx]);
  const y = useTransform(progress, [0, 1], [0, dy]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.4, 1.2, 0.2]);

  return (
    <motion.div
      style={{ x, y, opacity, scale }}
      className="absolute w-1 h-1 rounded-full bg-[#F59E0B] pointer-events-none z-10"
    />
  );
}

// Subcomponente para una estrella animada con sus 6 destellos
function StarAnimItem({
  t,
  range,
}: {
  t: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;
  const mid = start + (end - start) * 0.5;

  const fill = useTransform(t, [start, start + 0.01], [0, 1]);
  const scale = useTransform(t, [start, mid, end], [1, 1.35, 1]);
  const spProgress = useTransform(t, [start + 0.01, end], [0, 1]);
  const spOpacity = useTransform(t, [start + 0.01, mid, end], [0, 1, 0]);
  const starColor = useTransform(fill, [0, 1], ["#CBD5E1", "#F59E0B"]);

  return (
    <div className="relative flex items-center justify-center">
      {SPARKLE_DIRECTIONS.map((dir, sIdx) => (
        <SparkleDot
          key={sIdx}
          progress={spProgress}
          opacity={spOpacity}
          dx={dir.dx}
          dy={dir.dy}
        />
      ))}
      <motion.div
        style={{ scale, color: starColor }}
        className="w-4 h-4 flex items-center justify-center"
      >
        <Star className="w-4 h-4 fill-current stroke-current" />
      </motion.div>
    </div>
  );
}

// Subcomponente para una partícula de confeti
function ConfettiDot({
  progress,
  x,
  startY,
  endY,
  color,
  size,
}: {
  progress: MotionValue<number>;
  x: number;
  startY: number;
  endY: number;
  color: string;
  size: string;
}) {
  const y = useTransform(progress, [0, 1], [startY, endY]);
  const opacity = useTransform(progress, [0, 0.25, 0.85, 1], [0, 1, 1, 0.85]);

  return (
    <motion.div
      style={{ x, y, opacity }}
      className={`absolute ${color} ${size} rounded-full`}
    />
  );
}

export default function ResenasScene({ t, reducedMotion = false }: SceneProps) {
  // 1. Tarjeta NFC entra de 0 a 0.2 (degradado índigo->celeste, rotación -12° a -4°)
  const cardX = useTransform(t, [0, 0.2, 0.35, 0.45], [-120, 20, 20, 160]);
  const cardY = useTransform(t, [0, 0.2, 0.35, 0.45], [260, 16, 16, 260]);
  const cardRotate = useTransform(t, [0, 0.2], [-12, -4]);
  const cardOpacity = useTransform(t, [0, 0.06, 0.35, 0.44], [0, 1, 1, 0]);
  const cardScale = useTransform(t, [0.18, 0.22, 0.35], [1, 0.95, 0.95]);

  // Brillo que cruza la tarjeta de 0 a 0.2
  const cardShimmerX = useTransform(t, [0.03, 0.18], ["-120%", "220%"]);

  // 2. En 0.2 a 0.35: celular vibra (x ±2px) y salen 3 anillos concéntricos
  const phoneVibrateX = useTransform(
    t,
    [0.2, 0.22, 0.25, 0.28, 0.31, 0.35],
    [0, -2, 2, -2, 2, 0]
  );

  const ring1Scale = useTransform(t, [0.2, 0.32], [0.2, 1.8]);
  const ring1Opacity = useTransform(t, [0.2, 0.23, 0.32], [0, 0.9, 0]);

  const ring2Scale = useTransform(t, [0.22, 0.34], [0.2, 2.2]);
  const ring2Opacity = useTransform(t, [0.22, 0.25, 0.34], [0, 0.7, 0]);

  const ring3Scale = useTransform(t, [0.24, 0.35], [0.2, 2.6]);
  const ring3Opacity = useTransform(t, [0.24, 0.27, 0.35], [0, 0.5, 0]);

  // 3. De 0.35 a 0.5: fondo atenuado y sube hoja 'Deja tu reseña' (cubre 65%)
  const backdropOpacity = useTransform(t, [0.35, 0.46, 0.9, 0.95], [0, 0.45, 0.45, 0]);
  const sheetY = useTransform(t, [0.35, 0.48], ["100%", "0%"]);
  const sheetScale = useTransform(t, [0.9, 0.96], [1, 0.75]);
  const sheetOpacity = useTransform(t, [0.35, 0.42, 0.91, 0.95], [0, 1, 1, 0]);

  // Rangos de animación para las 5 estrellas (0.50 a 0.78)
  const starRanges: [number, number][] = [
    [0.5, 0.55],
    [0.55, 0.6],
    [0.6, 0.65],
    [0.65, 0.7],
    [0.7, 0.75],
  ];

  // 5. De 0.78 a 0.9: 3 líneas de texto crecen en ancho y botón 'Publicar' se presiona con ondulación
  const lineWidth1 = useTransform(t, [0.78, 0.82], ["0%", "100%"]);
  const lineWidth2 = useTransform(t, [0.81, 0.85], ["0%", "88%"]);
  const lineWidth3 = useTransform(t, [0.84, 0.88], ["0%", "65%"]);

  const btnScale = useTransform(t, [0.86, 0.885, 0.91], [1, 0.95, 1]);
  const btnRippleScale = useTransform(t, [0.87, 0.92], [0.6, 1.4]);
  const btnRippleOpacity = useTransform(t, [0.87, 0.89, 0.92], [0, 0.75, 0]);

  // 6. De 0.9 a 1.0: Insignia final con círculo y palomita (pathLength), ¡Gracias por tu reseña! y confeti
  const successOpacity = useTransform(t, [0.91, 0.95], [0, 1]);
  const successScale = useTransform(t, [0.91, 0.96, 1.0], [0.75, 1.05, 1]);
  const circlePathLength = useTransform(t, [0.91, 0.96], [0, 1]);
  const checkPathLength = useTransform(t, [0.94, 0.99], [0, 1]);
  const confettiProgress = useTransform(t, [0.92, 1.0], [0, 1]);

  // Si reducen movimiento: mostrar estado final ordenado y completo
  if (reducedMotion) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 text-center select-none relative">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mb-3 text-emerald-600 shadow-md">
          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
            <path
              d="M14 24l7 7 14-14"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center gap-1 text-[#F59E0B] mb-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">
          ¡Gracias por tu reseña!
        </h4>
        <p className="text-xs text-slate-500">
          Proceso completado en segundos con NFC.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      style={{ x: phoneVibrateX }}
      className="relative h-full w-full flex flex-col justify-between overflow-hidden select-none bg-slate-50/50"
    >
      {/* 2. Anillos concéntricos en punto de contacto (0.2 a 0.35) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <motion.div
          style={{ scale: ring1Scale, opacity: ring1Opacity }}
          className="absolute -top-7 -left-7 w-14 h-14 rounded-full border-2 border-[#0EA5E9]"
        />
        <motion.div
          style={{ scale: ring2Scale, opacity: ring2Opacity }}
          className="absolute -top-7 -left-7 w-14 h-14 rounded-full border-2 border-[#0EA5E9]"
        />
        <motion.div
          style={{ scale: ring3Scale, opacity: ring3Opacity }}
          className="absolute -top-7 -left-7 w-14 h-14 rounded-full border-2 border-[#0EA5E9]"
        />
      </div>

      {/* 1. Tarjeta NFC que entra, toca y sale (0 a 0.45) */}
      <motion.div
        style={{
          x: cardX,
          y: cardY,
          rotate: cardRotate,
          opacity: cardOpacity,
          scale: cardScale,
        }}
        className="absolute top-2 left-4 z-30 w-36 h-22 rounded-xl bg-gradient-to-br from-primary via-[#4338CA] to-[#0EA5E9] text-white p-2.5 flex flex-col justify-between shadow-xl border border-white/20 origin-center overflow-hidden"
      >
        {/* Brillo dinámico de la tarjeta */}
        <motion.div
          style={{ x: cardShimmerX }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
        />

        <div className="flex items-center justify-between z-10">
          <Wifi className="w-4 h-4 text-white rotate-90" />
          <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-white/80">
            NFC
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/20 z-10">
          <span className="text-[10px] font-bold tracking-tight text-white">
            HOLOS
          </span>
          <QrCode className="w-3.5 h-3.5 text-white/90" />
        </div>
      </motion.div>

      {/* Contenido sutil de fondo de la pantalla antes de la hoja */}
      <div className="p-3 opacity-25 flex flex-col gap-2">
        <div className="w-16 h-2 bg-slate-400 rounded-full" />
        <div className="w-full h-12 bg-slate-200 rounded-xl" />
        <div className="w-3/4 h-2 bg-slate-300 rounded-full" />
      </div>

      {/* Velo atenuado de fondo cuando sube la hoja */}
      <motion.div
        style={{ opacity: backdropOpacity }}
        className="absolute inset-0 bg-slate-900 pointer-events-none z-10"
      />

      {/* 3. Hoja 'Deja tu reseña' que cubre un 65% de la pantalla (0.35 a 0.90) */}
      <motion.div
        style={{
          y: sheetY,
          scale: sheetScale,
          opacity: sheetOpacity,
        }}
        className="absolute bottom-0 inset-x-0 h-[68%] rounded-t-3xl bg-white shadow-2xl p-3.5 flex flex-col justify-between border-t border-slate-200/90 z-20"
      >
        <div>
          {/* Barra de agarre de la hoja modal */}
          <div className="w-9 h-1 bg-slate-300 rounded-full mx-auto mb-2 shrink-0" />

          {/* Título */}
          <div className="text-center mb-2">
            <h5 className="text-xs font-bold text-slate-800">
              Deja tu reseña
            </h5>
            <p className="text-[10px] text-slate-400">
              Comparte tu experiencia en Google
            </p>
          </div>

          {/* 4. 5 Estrellas con pop (1->1.35->1) y 6 destellos fijos */}
          <div className="flex items-center justify-center gap-1.5 py-1 mb-2">
            {starRanges.map((range, idx) => (
              <StarAnimItem key={idx} t={t} range={range} />
            ))}
          </div>

          {/* 5. 3 Líneas de texto que crecen como escribiéndose */}
          <div className="space-y-1.5 px-1 py-1">
            <motion.div
              style={{ width: lineWidth1 }}
              className="h-1.5 bg-slate-200 rounded-full"
            />
            <motion.div
              style={{ width: lineWidth2 }}
              className="h-1.5 bg-slate-200 rounded-full"
            />
            <motion.div
              style={{ width: lineWidth3 }}
              className="h-1.5 bg-slate-200/80 rounded-full"
            />
          </div>
        </div>

        {/* Botón Publicar con compresión a 0.95 y onda */}
        <div className="relative pt-1">
          <motion.button
            type="button"
            style={{ scale: btnScale }}
            className="w-full py-1.5 rounded-xl bg-primary text-white text-[11px] font-bold shadow-md shadow-primary/20 flex items-center justify-center relative overflow-hidden"
          >
            {/* Ondulación al presionar */}
            <motion.div
              style={{ scale: btnRippleScale, opacity: btnRippleOpacity }}
              className="absolute inset-0 rounded-xl bg-white/40 pointer-events-none"
            />
            <span>Publicar</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 6. Insignia final con círculo y palomita (pathLength), '¡Gracias por tu reseña!' y 12 confetis (0.9 a 1.0) */}
      <motion.div
        style={{
          opacity: successOpacity,
          scale: successScale,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-30 pointer-events-none"
      >
        {/* 12 Puntos de confeti cayendo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {CONFETTI_PIECES.map((c, i) => (
            <ConfettiDot
              key={i}
              progress={confettiProgress}
              x={c.x}
              startY={c.startY}
              endY={c.endY}
              color={c.color}
              size={c.size}
            />
          ))}
        </div>

        {/* Círculo y palomita dibujándose con pathLength */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500/20 flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/10">
          <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: circlePathLength }}
            />
            <motion.path
              d="M15 24l6 6 12-12"
              stroke="#10B981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ pathLength: checkPathLength }}
            />
          </svg>
        </div>

        {/* 5 estrellas doradas de confirmación */}
        <div className="flex items-center gap-1 text-[#F59E0B] mb-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>

        <h4 className="text-xs font-bold text-slate-900 tracking-tight mb-0.5">
          ¡Gracias por tu reseña!
        </h4>
        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          Reseña publicada
        </span>
      </motion.div>
    </motion.div>
  );
}
