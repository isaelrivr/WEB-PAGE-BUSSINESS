"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#servicios" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enlace directo a WhatsApp configurado para atención en México
  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/20 shadow-sm shadow-indigo-950/10 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
        isScrolled
          ? "bg-[#4F46E5] supports-[backdrop-filter]:bg-[#4F46E5]/90 backdrop-blur-xl backdrop-saturate-150"
          : "bg-[#4F46E5] supports-[backdrop-filter]:bg-[#4F46E5]/75 backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        {/* Logo Holos en blanco */}
        <Link
          href="/"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4F46E5] rounded-lg py-1 px-1.5"
          aria-label="Holos - Inicio"
        >
          <Logo
            className="text-2xl transition-transform duration-200 group-hover:scale-105"
            colorClass="text-white"
          />
        </Link>

        {/* Enlaces de escritorio en blanco con alta legibilidad */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors duration-200 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4F46E5] rounded-md px-1.5"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Escritorio: Escríbenos por WhatsApp (Botón blanco con texto índigo para alto contraste) */}
        <div className="hidden md:flex items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-[#4F46E5] bg-white hover:bg-white/95 transition-[background-color,transform,box-shadow] duration-200 shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4F46E5]"
            aria-label="Escríbenos por WhatsApp (abre en nueva pestaña)"
          >
            <MessageCircle className="w-4 h-4 fill-current text-[#4F46E5]" aria-hidden="true" />
            <span>Escríbenos por WhatsApp</span>
          </a>
        </div>

        {/* Botón menú móvil en blanco */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4F46E5]"
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
      </nav>

      {/* Menú móvil desplegable con el mismo estilo glass índigo */}
      {mobileMenuOpen && (
        <div
          id="menu-movil"
          className="md:hidden border-b border-white/20 bg-[#4F46E5] supports-[backdrop-filter]:bg-[#4F46E5]/85 backdrop-blur-xl backdrop-saturate-150 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-white hover:bg-white/10 px-3 py-2.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-white/20">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-bold text-[#4F46E5] bg-white hover:bg-white/95 transition-[background-color,transform] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircle className="w-5 h-5 fill-current text-[#4F46E5]" aria-hidden="true" />
                <span>Escríbenos por WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 opacity-80" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
