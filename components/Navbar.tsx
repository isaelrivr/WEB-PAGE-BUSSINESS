"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#servicios" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Enlace directo a WhatsApp configurado para atención en México
  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  // Cerrar menú móvil al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
      {/* Contenedor de la pastilla flotante */}
      <div className="max-w-[1200px] mx-auto pointer-events-auto">
        {/* Pastilla flotante estilo GoCanopy */}
        <div
          className="h-16 px-5 sm:px-6 rounded-full border border-white/20 shadow-lg shadow-indigo-950/15 bg-[#4F46E5] supports-[backdrop-filter]:bg-[#4F46E5]/60 backdrop-blur-xl flex items-center justify-between transition-[background-color,box-shadow] duration-300"
        >
          {/* 1. Izquierda: Logo holos en blanco */}
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full py-1 px-2"
              aria-label="Holos - Inicio"
            >
              <Logo
                className="text-2xl transition-transform duration-200 group-hover:scale-105"
                colorClass="text-white"
              />
            </Link>
          </div>

          {/* 2. Centro: Enlaces de navegación centrados (Escritorio) */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center justify-center gap-7 lg:gap-8"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-white/90 hover:text-white transition-colors duration-200 py-1 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. Derecha: Botón Escríbenos por WhatsApp con texto blanco y círculo con flecha índigo */}
          <div className="flex-1 hidden md:flex items-center justify-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-[background-color,transform,box-shadow] duration-200 shadow-xs active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Escríbenos por WhatsApp (abre en nueva pestaña)"
            >
              <span>Escríbenos por WhatsApp</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#4F46E5] shadow-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4 text-[#4F46E5] stroke-[2.5]" aria-hidden="true" />
              </span>
            </a>
          </div>

          {/* Botón menú móvil (hamburguesa) en blanco */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-movil"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-white" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Panel desplegable móvil con el mismo estilo glass y esquinas redondeadas */}
        {mobileMenuOpen && (
          <div
            id="menu-movil"
            className="md:hidden mt-2 p-5 rounded-3xl border border-white/20 shadow-xl shadow-indigo-950/20 bg-[#4F46E5] supports-[backdrop-filter]:bg-[#4F46E5]/85 backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-200"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-white hover:bg-white/10 px-4 py-2.5 rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 mt-1 border-t border-white/20">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between pl-5 pr-2 py-2 rounded-full text-base font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-[background-color,transform] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Escríbenos por WhatsApp</span>
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#4F46E5] shadow-xs">
                    <ArrowUpRight className="w-5 h-5 text-[#4F46E5] stroke-[2.5]" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
