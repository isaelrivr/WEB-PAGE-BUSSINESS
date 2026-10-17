import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  darkText?: boolean;
}

export default function Logo({
  className = "h-10 w-10",
  showText = true,
  darkText = true,
}: LogoProps) {
  return (
    <div className="inline-flex items-center gap-3 group select-none">
      <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 p-2 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
        >
          {/* Anillo exterior Holos (El Todo) */}
          <path
            d="M18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33C26.2843 33 33 26.2843 33 18C33 14.7 31.9 11.6 30.1 9.1"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Ondas de conexión NFC */}
          <path
            d="M13.5 16.5C16 14 20 14 22.5 16.5"
            stroke="#BAE6FD"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M11 13.5C14.9 9.6 21.1 9.6 25 13.5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Nodo central */}
          <circle cx="18" cy="20.5" r="2.8" fill="#FFFFFF" />
          <circle cx="28.5" cy="6.5" r="2.2" fill="#38BDF8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xl font-extrabold tracking-tight ${
                darkText ? "text-slate-900" : "text-white"
              }`}
            >
              HOLOS
            </span>
            <span className="rounded-md bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-indigo-600 uppercase">
              Digital
            </span>
          </div>
          <span
            className={`text-[10px] font-medium tracking-widest uppercase mt-0.5 ${
              darkText ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Web • NFC • Redes
          </span>
        </div>
      )}
    </div>
  );
}