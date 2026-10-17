"use client";

import { motion } from "motion/react";
import { QrCode, Wifi } from "lucide-react";

interface ScreenProps {
  reducedMotion?: boolean;
}

export default function ResenaScreen({ reducedMotion = false }: ScreenProps) {
  return (
    <div className="h-full flex flex-col justify-between py-2 px-1 select-none">
      {/* 1. Notificación 'Nueva reseña' */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-2xl bg-white border border-slate-200/80 shadow-md p-3.5 flex flex-col gap-2.5"
      >
        {/* Cabecera de la notificación con icono de Google */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span className="text-xs font-bold text-slate-800">
              Nueva reseña
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            Ahora
          </span>
        </div>

        {/* 5 estrellas que se llenan una por una en ámbar (#F59E0B) */}
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((idx) => (
            <motion.div
              key={idx}
              initial={reducedMotion ? false : { scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.3, 1], opacity: 1 }}
              transition={
                reducedMotion
                  ? undefined
                  : { delay: 0.2 + idx * 0.12, duration: 0.3 }
              }
              className="text-[#F59E0B]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Dos líneas grises de texto de relleno */}
        <div className="space-y-1.5 pt-1">
          <motion.div
            initial={reducedMotion ? false : { width: "0%", opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="h-2 bg-slate-200 rounded-full"
          />
          <motion.div
            initial={reducedMotion ? false : { width: "0%", opacity: 0 }}
            animate={{ width: "75%", opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.4 }}
            className="h-2 bg-slate-200/70 rounded-full"
          />
        </div>
      </motion.div>

      {/* 2. Tarjeta NFC pequeña con ondas */}
      <div className="relative flex flex-col items-center justify-center my-auto pt-4">
        {/* Ondas tipo ripple alrededor de la tarjeta */}
        {!reducedMotion && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [0.8, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
              className="w-36 h-24 rounded-2xl border-2 border-[#0EA5E9]"
            />
            <motion.div
              animate={{ scale: [0.8, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                delay: 0.7,
                ease: "easeOut",
              }}
              className="w-36 h-24 rounded-2xl border-2 border-[#0EA5E9]"
            />
          </div>
        )}

        {/* Tarjeta NFC */}
        <motion.div
          initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative z-10 w-40 h-24 rounded-xl bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0369A1] text-white p-3 flex flex-col justify-between shadow-lg shadow-sky-500/25 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <Wifi className="w-4 h-4 text-white rotate-90" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-white/80">
              NFC
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/20">
            <span className="text-[10px] font-bold tracking-tight text-white">
              HOLOS
            </span>
            <QrCode className="w-4 h-4 text-white/90" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
