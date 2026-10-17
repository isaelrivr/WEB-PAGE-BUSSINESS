"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#servicios" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Enlace directo a WhatsApp configurado para atención en México
  const whatsappUrl = "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-200/80 transition-all duration-300">
      <nav 
        aria-label="Navegación principal" 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        {/* Logo provisional */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-lg tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105">
            AP
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-zinc-900 tracking-tight leading-tight flex items-center gap-1.5">
              Agencia PyME
              <span className="text-[10px] font-normal uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 border border-zinc-200">
                Logo Provisional
              </span>
            </span>
            <span className="text-xs text-zinc-500 font-normal">
              Estrategia & Crecimiento Local
            </span>
          </div>
        </Link>

        {/* Enlaces de escritorio */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors duration-200 py-1"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Escritorio: Escríbenos por WhatsApp */}
        <div className="hidden md:flex items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 shadow-sm active:scale-95"
            aria-label="Escríbenos por WhatsApp (abre en nueva pestaña)"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Escríbenos por WhatsApp</span>
          </a>
        </div>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 px-3 py-2 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-zinc-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Escríbenos por WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
