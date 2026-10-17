"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { QrCode } from "lucide-react";

interface VisualProps {
  foco: MotionValue<number>;
  reducedMotion?: boolean;
}

export default function ResenasVisual({ foco, reducedMotion = false }: VisualProps) {
  // 1. Tarjeta NFC (0 a 0.4: se acerca al celular inclinándose)
  const cardX = useTransform(foco, [0, 0.4], [-30, 24]);
  const cardRotate = useTransform(foco, [0, 0.4], [0, -15]);
  const cardScale = useTransform(foco, [0, 0.35, 0.4], [1, 1.05, 1]);

  // 2. Ondas concéntricas tipo ripple en 0.4 (al hacer contacto)
  const ripple1Scale = useTransform(foco, [0.38, 0.52, 0.68], [0.2, 1.3, 1.9]);
  const ripple1Opacity = useTransform(foco, [0.38, 0.43, 0.66], [0, 0.85, 0]);

  const ripple2Scale = useTransform(foco, [0.41, 0.57, 0.74], [0.2, 1.5, 2.3]);
  const ripple2Opacity = useTransform(foco, [0.41, 0.47, 0.72], [0, 0.7, 0]);

  const ripple3Scale = useTransform(foco, [0.44, 0.63, 0.81], [0.2, 1.7, 2.7]);
  const ripple3Opacity = useTransform(foco, [0.44, 0.51, 0.78], [0, 0.5, 0]);

  // 3. Ventana tipo reseña de Google que sube de 0.4 a 1 dentro del celular
  const modalY = useTransform(foco, [0.4, 0.62], ["110%", "0%"]);
  const modalOpacity = useTransform(foco, [0.4, 0.48], [0, 1]);

  // 4. 5 estrellas que se llenan una por una en ámbar (#F59E0B)
  const star0Scale = useTransform(foco, [0.6, 0.64, 0.68], [0.3, 1.35, 1]);
  const star0Opacity = useTransform(foco, [0.6, 0.64], [0, 1]);

  const star1Scale = useTransform(foco, [0.66, 0.7, 0.74], [0.3, 1.35, 1]);
  const star1Opacity = useTransform(foco, [0.66, 0.7], [0, 1]);

  const star2Scale = useTransform(foco, [0.72, 0.76, 0.8], [0.3, 1.35, 1]);
  const star2Opacity = useTransform(foco, [0.72, 0.76], [0, 1]);

  const star3Scale = useTransform(foco, [0.78, 0.82, 0.86], [0.3, 1.35, 1]);
  const star3Opacity = useTransform(foco, [0.78, 0.82], [0, 1]);

  const star4Scale = useTransform(foco, [0.84, 0.88, 0.92], [0.3, 1.35, 1]);
  const star4Opacity = useTransform(foco, [0.84, 0.88], [0, 1]);

  // 5. Línea gris de texto de relleno
  const textLineOpacity = useTransform(foco, [0.88, 0.96], [0, 1]);
  const textLineWidth = useTransform(foco, [0.88, 0.98], ["0%", "100%"]);

  const stars = [
    { scale: star0Scale, opacity: star0Opacity },
    { scale: star1Scale, opacity: star1Opacity },
    { scale: star2Scale, opacity: star2Opacity },
    { scale: star3Scale, opacity: star3Opacity },
    { scale: star4Scale, opacity: star4Opacity },
  ];

  return (
    <div className="relative w-full h-44 sm:h-48 rounded-2xl bg-slate-50/80 border border-slate-200/60 shadow-inner flex items-center justify-center overflow-hidden p-3 select-none">
      {/* Etiqueta pequeña: Ejemplo ilustrativo */}
      <span className="absolute top-2.5 right-3 text-[10px] font-medium tracking-wider uppercase text-text-muted/70 bg-white/80 border border-slate-200/50 px-2 py-0.5 rounded-md backdrop-blur-xs z-20">
        Ejemplo ilustrativo
      </span>

      {/* Escenario central */}
      <div className="relative flex items-center justify-center w-full max-w-xs h-full">
        {/* 3 Ondas concéntricas tipo ripple (en el punto de contacto) */}
        {!reducedMotion && (
          <div className="absolute left-[38%] top-[34%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <motion.div
              style={{ scale: ripple1Scale, opacity: ripple1Opacity }}
              className="absolute -top-6 -left-6 w-12 h-12 rounded-full border-2 border-[#0EA5E9]"
            />
            <motion.div
              style={{ scale: ripple2Scale, opacity: ripple2Opacity }}
              className="absolute -top-6 -left-6 w-12 h-12 rounded-full border-2 border-[#0EA5E9]"
            />
            <motion.div
              style={{ scale: ripple3Scale, opacity: ripple3Opacity }}
              className="absolute -top-6 -left-6 w-12 h-12 rounded-full border-2 border-[#0EA5E9]"
            />
          </div>
        )}

        {/* Tarjeta NFC a la izquierda */}
        <motion.div
          style={
            reducedMotion
              ? { x: 24, rotate: -15, scale: 1 }
              : { x: cardX, rotate: cardRotate, scale: cardScale }
          }
          className="absolute left-4 sm:left-6 z-20 w-24 h-16 sm:w-28 sm:h-18 rounded-xl bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0369A1] text-white shadow-lg shadow-sky-500/25 p-2 flex flex-col justify-between border border-white/20 origin-center"
        >
          <div className="flex items-center justify-between">
            {/* Icono de señal Contactless/NFC */}
            <svg
              className="w-4 h-4 text-white/90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0" />
              <path d="M8.5 10.5a3 3 0 0 1 7 0" />
              <path d="M11 13a1 1 0 0 1 2 0" />
            </svg>
            <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-white/80">
              NFC
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/20">
            <span className="text-[9px] font-bold tracking-tight text-white/95">
              HOLOS
            </span>
            <QrCode className="w-3.5 h-3.5 text-white/90" />
          </div>
        </motion.div>

        {/* Mockup de celular a la derecha */}
        <div className="relative ml-auto right-4 sm:right-6 w-28 sm:w-32 h-38 sm:h-42 rounded-2xl bg-slate-900 border-2 border-slate-700/80 shadow-xl shadow-slate-900/20 p-1.5 flex flex-col z-0">
          {/* Dynamic Island / Bocina */}
          <div className="w-9 h-1.5 bg-slate-700 rounded-full mx-auto mb-1 shrink-0" />

          {/* Pantalla del celular */}
          <div className="relative flex-1 w-full rounded-xl bg-slate-100 overflow-hidden flex flex-col justify-end p-1.5 border border-slate-300/40">
            {/* Fondo decorativo sutil de la pantalla */}
            <div className="absolute inset-0 p-2 opacity-25 flex flex-col gap-1.5 pointer-events-none">
              <div className="w-12 h-2 bg-slate-400 rounded-full" />
              <div className="w-16 h-2 bg-slate-300 rounded-full" />
              <div className="w-10 h-2 bg-slate-300 rounded-full" />
            </div>

            {/* Ventana emergente tipo reseña de Google */}
            <motion.div
              style={
                reducedMotion
                  ? { y: "0%", opacity: 1 }
                  : { y: modalY, opacity: modalOpacity }
              }
              className="relative w-full rounded-lg bg-white shadow-md border border-slate-200/90 p-2 flex flex-col gap-1.5 z-10"
            >
              {/* Cabecera Google */}
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-[9px] font-semibold text-slate-800 tracking-tight leading-none">
                  Google Reseñas
                </span>
              </div>

              {/* 5 estrellas que se llenan secuencialmente en ámbar (#F59E0B) */}
              <div className="flex items-center gap-0.5 justify-center py-0.5">
                {stars.map((star, idx) => (
                  <div key={idx} className="relative w-3.5 h-3.5 flex items-center justify-center">
                    {/* Estrella vacía de fondo */}
                    <svg
                      className="w-3.5 h-3.5 text-slate-200 absolute inset-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>

                    {/* Estrella dorada en ámbar con animación */}
                    <motion.div
                      style={
                        reducedMotion
                          ? { scale: 1, opacity: 1 }
                          : { scale: star.scale, opacity: star.opacity }
                      }
                      className="w-3.5 h-3.5 text-[#F59E0B] absolute inset-0"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Línea gris de texto de relleno */}
              <div className="space-y-1 pt-0.5">
                <motion.div
                  style={
                    reducedMotion
                      ? { width: "100%", opacity: 1 }
                      : { width: textLineWidth, opacity: textLineOpacity }
                  }
                  className="h-1.5 bg-slate-200 rounded-full"
                />
                <motion.div
                  style={
                    reducedMotion
                      ? { width: "70%", opacity: 1 }
                      : { opacity: textLineOpacity }
                  }
                  className="h-1.5 bg-slate-200/70 rounded-full w-[70%]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
