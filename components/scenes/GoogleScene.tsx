"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Search, MapPin, Phone, Navigation, Globe, CheckCircle2 } from "lucide-react";

interface SceneProps {
  t: MotionValue<number>;
  reducedMotion?: boolean;
}

const QUERY_TEXT = "negocio cerca de mí";

// 1. Letra individual para el efecto de máquina de escribir derivado de t (0 a 0.20)
function TypingChar({
  t,
  index,
  char,
}: {
  t: MotionValue<number>;
  index: number;
  char: string;
}) {
  const start = 0.01 + (index / QUERY_TEXT.length) * 0.18;
  const opacity = useTransform(t, [start, start + 0.005], [0, 1]);
  return <motion.span style={{ opacity }}>{char === " " ? "\u00A0" : char}</motion.span>;
}

// Cursor parpadeante que acompaña el tipeo y luego desaparece
function BlinkingCursor({ t }: { t: MotionValue<number> }) {
  const opacity = useTransform(t, (v) => {
    if (v > 0.22) return 0;
    return Math.floor(v * 28) % 2 === 0 ? 1 : 0;
  });
  return (
    <motion.span
      style={{ opacity }}
      className="inline-block w-[2px] h-3.5 bg-[#0EA5E9] ml-0.5 align-middle rounded-full"
    />
  );
}

// 2. Pin gris secundario con caída y rebote escalonado (0.20 a 0.40) y atenuación posterior
function GreyMapPin({
  t,
  x,
  y,
  startT,
}: {
  t: MotionValue<number>;
  x: number;
  y: number;
  startT: number;
}) {
  const endT = startT + 0.06;
  const midT = startT + 0.035;

  // Caída con rebote
  const pinY = useTransform(t, [startT, midT, endT - 0.01, endT], [-30, 0, -4, 0]);
  const scale = useTransform(t, [startT, midT, endT], [0.3, 1.15, 1]);
  const opacity = useTransform(
    t,
    [startT, startT + 0.01, 0.42, 0.55],
    [0, 0.75, 0.75, 0.25]
  );

  return (
    <motion.div
      style={{
        left: x,
        top: y,
        y: pinY,
        scale,
        opacity,
      }}
      className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-10"
    >
      <div className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center shadow-xs border border-white">
        <MapPin className="w-3 h-3 fill-white stroke-slate-400" />
      </div>
      <div className="w-1.5 h-0.5 bg-slate-900/20 rounded-full mx-auto mt-0.5" />
    </motion.div>
  );
}

// 3. Pin principal de 'Tu negocio' (0.40 a 0.60): más grande, celeste/índigo, con pulso
function FeaturedMapPin({ t }: { t: MotionValue<number> }) {
  // Caída con rebote entre 0.40 y 0.50
  const pinY = useTransform(t, [0.4, 0.46, 0.48, 0.52], [-45, 0, -6, 0]);
  const pinScale = useTransform(t, [0.4, 0.46, 0.48, 0.52], [0.3, 1.25, 0.95, 1.15]);
  const pinOpacity = useTransform(t, [0.4, 0.42], [0, 1]);

  // Anillo de pulso expandiéndose desde la base (0.46 a 0.62)
  const pulseScale = useTransform(t, [0.46, 0.6], [0.4, 2.6]);
  const pulseOpacity = useTransform(t, [0.46, 0.49, 0.6], [0, 0.75, 0]);

  return (
    <motion.div
      style={{
        left: 142,
        top: 135,
        y: pinY,
        scale: pinScale,
        opacity: pinOpacity,
      }}
      className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-20 flex flex-col items-center"
    >
      {/* Anillo de pulso */}
      <motion.div
        style={{
          scale: pulseScale,
          opacity: pulseOpacity,
        }}
        className="absolute top-7 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0EA5E9] bg-[#0EA5E9]/15 pointer-events-none"
      />

      {/* Pin celeste/índigo con sombra pronunciada */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-[#4338CA] to-[#0EA5E9] text-white flex items-center justify-center shadow-lg shadow-indigo-950/25 border-2 border-white relative z-10">
        <MapPin className="w-4 h-4 fill-white stroke-transparent" />
      </div>

      {/* Etiqueta flotante 'Tu negocio' */}
      <div className="mt-1 px-1.5 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-white text-[8px] font-bold tracking-tight shadow-md whitespace-nowrap">
        Tu negocio
      </div>
    </motion.div>
  );
}

// 5. Botones interactivos con rebote secuencial y timbre oscilante en 'Llamar' (0.76 a 1.0)
function ActionButtons({ t }: { t: MotionValue<number> }) {
  // Botón 1: Llamar (0.76 a 0.84)
  const btn1Scale = useTransform(t, [0.76, 0.8, 0.84], [0.6, 1.15, 1]);
  const btn1Opacity = useTransform(t, [0.76, 0.79], [0, 1]);

  // Timbre oscilante del icono de teléfono (0.84 a 1.0)
  const phoneOscillation = useTransform(
    t,
    [0.84, 0.86, 0.88, 0.9, 0.92, 0.94, 0.96, 0.98, 1.0],
    [0, -18, 18, -14, 14, -8, 8, -4, 0]
  );

  // Botón 2: Llegar (0.80 a 0.88)
  const btn2Scale = useTransform(t, [0.8, 0.84, 0.88], [0.6, 1.15, 1]);
  const btn2Opacity = useTransform(t, [0.8, 0.83], [0, 1]);

  // Botón 3: Sitio web (0.84 a 0.92)
  const btn3Scale = useTransform(t, [0.84, 0.88, 0.92], [0.6, 1.15, 1]);
  const btn3Opacity = useTransform(t, [0.84, 0.87], [0, 1]);

  return (
    <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-100">
      {/* Botón Llamar con timbre */}
      <motion.div
        style={{ scale: btn1Scale, opacity: btn1Opacity }}
        className="py-1 px-1 rounded-xl bg-sky-50/80 border border-sky-100/90 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700 shadow-2xs"
      >
        <motion.div style={{ rotate: phoneOscillation }}>
          <Phone className="w-3.5 h-3.5 text-[#0EA5E9]" />
        </motion.div>
        <span>Llamar</span>
      </motion.div>

      {/* Botón Cómo llegar */}
      <motion.div
        style={{ scale: btn2Scale, opacity: btn2Opacity }}
        className="py-1 px-1 rounded-xl bg-sky-50/80 border border-sky-100/90 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700 shadow-2xs"
      >
        <Navigation className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>Llegar</span>
      </motion.div>

      {/* Botón Sitio web */}
      <motion.div
        style={{ scale: btn3Scale, opacity: btn3Opacity }}
        className="py-1 px-1 rounded-xl bg-sky-50/80 border border-sky-100/90 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700 shadow-2xs"
      >
        <Globe className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>Sitio web</span>
      </motion.div>
    </div>
  );
}

export default function GoogleScene({ t, reducedMotion = false }: SceneProps) {
  // Mapa estilizado: dibujo de calles con pathLength (0.1 a 0.35)
  const streetsPathLength = useTransform(t, [0.1, 0.35], [0.3, 1]);

  // Zoom lento del mapa de 1 a 1.15 (0.2 a 0.55)
  const mapZoom = useTransform(t, [0.2, 0.55], [1, 1.15]);

  // Desplazamiento del mapa para centrar el pin de 'Tu negocio' (0.40 a 0.55)
  const mapPanX = useTransform(t, [0.4, 0.55], [0, -10]);
  const mapPanY = useTransform(t, [0.4, 0.55], [0, -14]);

  // Hoja / tarjeta que sube desde abajo (0.60 a 0.76)
  const sheetY = useTransform(t, [0.6, 0.74], ["100%", "0%"]);
  const sheetOpacity = useTransform(t, [0.6, 0.65], [0, 1]);

  // Palomita de verificado dibujándose con pathLength (0.68 a 0.76)
  const checkPathLength = useTransform(t, [0.68, 0.76], [0, 1]);

  // Dos resultados de relleno que aparecen y bajan (0.64 a 0.76)
  const fillerY = useTransform(t, [0.66, 0.76], [0, 14]);
  const fillerOpacity = useTransform(t, [0.64, 0.72], [0, 0.45]);

  // Vista estática para usuarios con preferencia de movimiento reducido
  if (reducedMotion) {
    return (
      <div className="relative h-full w-full flex flex-col justify-between overflow-hidden select-none bg-slate-50">
        {/* Barra de búsqueda fija */}
        <div className="w-full bg-white rounded-full border border-slate-200/90 shadow-xs px-3 py-1.5 flex items-center gap-2 shrink-0 z-30 mb-2">
          <Search className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
          <span className="text-xs font-medium text-slate-800 tracking-tight">
            negocio cerca de mí
          </span>
        </div>

        {/* Mapa con pin */}
        <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-200/60 bg-slate-100 flex flex-col justify-between">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[#0EA5E9] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-4 h-4 fill-white" />
            </div>
          </div>

          {/* Tarjeta inferior completa */}
          <div className="mt-auto w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#0EA5E9]/40 shadow-xl p-3 flex flex-col gap-2 z-20">
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

            <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-100">
              <div className="py-1 px-1.5 rounded-lg bg-sky-50/70 border border-sky-100 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700">
                <Phone className="w-3 h-3 text-[#0EA5E9]" />
                <span>Llamar</span>
              </div>
              <div className="py-1 px-1.5 rounded-lg bg-sky-50/70 border border-sky-100 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700">
                <Navigation className="w-3 h-3 text-[#0EA5E9]" />
                <span>Llegar</span>
              </div>
              <div className="py-1 px-1.5 rounded-lg bg-sky-50/70 border border-sky-100 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold text-slate-700">
                <Globe className="w-3 h-3 text-[#0EA5E9]" />
                <span>Sitio web</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden select-none bg-slate-50">
      {/* 
        1. BARRA DE BÚSQUEDA (0 a 0.20)
        Escribe 'negocio cerca de mí' carácter por carácter con cursor parpadeante
      */}
      <div className="w-full bg-white rounded-full border border-slate-200/90 shadow-xs px-3 py-1.5 flex items-center gap-2 shrink-0 z-30 mb-1.5">
        <Search className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
        <div className="text-xs font-medium text-slate-800 tracking-tight flex items-center">
          {QUERY_TEXT.split("").map((char, idx) => (
            <TypingChar key={idx} t={t} index={idx} char={char} />
          ))}
          <BlinkingCursor t={t} />
        </div>
      </div>

      {/* 
        2. MAPA ESTILIZADO DE FONDO (siempre visible, sin huecos vacíos)
        Calles dibujadas con pathLength, zoom lento de 1 a 1.15 y desplazamiento para centrar
      */}
      <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-slate-200/70 bg-[#F8FAFC] shadow-inner">
        {/* Capa de mapa animada con scale y pan */}
        <motion.div
          style={{
            scale: mapZoom,
            x: mapPanX,
            y: mapPanY,
          }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          {/* SVG con calles, bloques de edificios y zonas verdes suaves */}
          <svg
            className="w-full h-full"
            viewBox="0 0 280 380"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Parque con tono verde pastel muy suave */}
            <rect
              x="20"
              y="30"
              width="68"
              height="80"
              rx="12"
              fill="#ECFDF5"
              stroke="#D1FAE5"
              strokeWidth="1"
            />
            <rect
              x="195"
              y="220"
              width="68"
              height="75"
              rx="12"
              fill="#ECFDF5"
              stroke="#D1FAE5"
              strokeWidth="1"
            />

            {/* Manzanas urbanas estilizadas (bloques grises muy suaves) */}
            <rect x="105" y="32" width="75" height="42" rx="8" fill="#F1F5F9" />
            <rect x="195" y="32" width="68" height="75" rx="8" fill="#F1F5F9" />
            <rect x="20" y="125" width="68" height="65" rx="8" fill="#F1F5F9" />
            <rect x="105" y="88" width="75" height="50" rx="8" fill="#F1F5F9" />
            <rect x="195" y="122" width="68" height="82" rx="8" fill="#F1F5F9" />
            <rect x="20" y="205" width="68" height="85" rx="8" fill="#F1F5F9" />
            <rect x="105" y="152" width="75" height="68" rx="8" fill="#F1F5F9" />
            <rect x="20" y="305" width="78" height="60" rx="8" fill="#F1F5F9" />
            <rect x="115" y="235" width="65" height="70" rx="8" fill="#F1F5F9" />
            <rect x="195" y="310" width="68" height="55" rx="8" fill="#F1F5F9" />

            {/* Red de calles que se dibuja con pathLength */}
            {/* Calles principales horizontales */}
            <motion.path
              d="M 0 80 L 280 80"
              stroke="#E2E8F0"
              strokeWidth="7"
              strokeLinecap="round"
              style={{ pathLength: streetsPathLength }}
            />
            <motion.path
              d="M 0 145 L 280 145"
              stroke="#E2E8F0"
              strokeWidth="8"
              strokeLinecap="round"
              style={{ pathLength: streetsPathLength }}
            />
            <motion.path
              d="M 0 225 L 280 225"
              stroke="#E2E8F0"
              strokeWidth="7"
              strokeLinecap="round"
              style={{ pathLength: streetsPathLength }}
            />
            <motion.path
              d="M 0 300 L 280 300"
              stroke="#E2E8F0"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ pathLength: streetsPathLength }}
            />

            {/* Calles principales verticales */}
            <motion.path
              d="M 96 0 L 96 380"
              stroke="#E2E8F0"
              strokeWidth="7"
              strokeLinecap="round"
              style={{ pathLength: streetsPathLength }}
            />
            <motion.path
              d="M 186 0 L 186 380"
              stroke="#E2E8F0"
              strokeWidth="7"
              strokeLinecap="round"
              style={{ pathLength: streetsPathLength }}
            />

            {/* Avenida en diagonal suave */}
            <motion.path
              d="M 0 50 Q 140 135 280 160"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: streetsPathLength }}
            />
          </svg>

          {/* 4 Pines grises que caen con rebote escalonado (0.20 a 0.40) */}
          <GreyMapPin t={t} x={54} y={75} startT={0.2} />
          <GreyMapPin t={t} x={230} y={70} startT={0.25} />
          <GreyMapPin t={t} x={58} y={160} startT={0.3} />
          <GreyMapPin t={t} x={235} y={155} startT={0.35} />

          {/* Pin de 'Tu negocio' (0.40 a 0.60): más grande, celeste/índigo con pulso */}
          <FeaturedMapPin t={t} />
        </motion.div>

        {/* 
          4. HOJA Y TARJETA DEL NEGOCIO QUE SUBE DESDE ABAJO (0.60 a 0.78)
          Toma el primer lugar mientras 2 resultados de relleno bajan
        */}
        <motion.div
          style={{
            y: sheetY,
            opacity: sheetOpacity,
          }}
          className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md rounded-t-3xl border-t border-slate-200/90 shadow-2xl p-3 z-30 flex flex-col gap-2"
        >
          {/* Manija de arrastre */}
          <div className="w-8 h-1 bg-slate-300 rounded-full mx-auto mb-1 shrink-0" />

          {/* Tarjeta principal destacada */}
          <div className="w-full bg-white rounded-2xl border border-[#0EA5E9]/40 shadow-sm p-2.5 flex flex-col gap-2">
            {/* Cabecera del negocio */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center shadow-xs">
                  <MapPin className="w-4 h-4 fill-white stroke-[#0EA5E9]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 leading-none">
                      Tu negocio
                    </span>

                    {/* Palomita de verificado dibujándose con pathLength */}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                      <circle
                        cx="10"
                        cy="10"
                        r="8.5"
                        fill="#E0F2FE"
                        stroke="#0EA5E9"
                        strokeWidth="1.2"
                      />
                      <motion.path
                        d="M6.5 10.2 L8.8 12.5 L13.5 7.5"
                        stroke="#0EA5E9"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ pathLength: checkPathLength }}
                      />
                    </svg>
                  </div>
                  <div className="h-1.5 w-16 bg-emerald-500/70 rounded-full mt-1" />
                </div>
              </div>

              {/* Insignia 'Destacado' solicitada */}
              <span className="text-[9px] font-semibold text-[#0EA5E9] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/60 shadow-2xs">
                Destacado
              </span>
            </div>

            {/* 5. Tres botones: Llamar, Cómo llegar y Sitio web (0.78 a 1.0) */}
            <ActionButtons t={t} />
          </div>

          {/* Dos resultados secundarios de relleno que bajan mientras la tarjeta toma el 1er lugar */}
          <motion.div
            style={{
              y: fillerY,
              opacity: fillerOpacity,
            }}
            className="space-y-1.5 pt-0.5"
          >
            <div className="w-full bg-slate-50/80 rounded-xl p-2 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-200" />
                <div className="space-y-1">
                  <div className="h-1.5 w-20 bg-slate-300 rounded-full" />
                  <div className="h-1 w-12 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>

            <div className="w-full bg-slate-50/80 rounded-xl p-2 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-200" />
                <div className="space-y-1">
                  <div className="h-1.5 w-16 bg-slate-300 rounded-full" />
                  <div className="h-1 w-10 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
