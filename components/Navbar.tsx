"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#servicios" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "/contacto" },
];

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div className="max-w-[1200px] mx-auto pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          className={`h-16 px-5 sm:px-6 rounded-full border shadow-lg flex items-center justify-between transition-[background-color,box-shadow,border-color] duration-300 will-change-transform ${
            scrolled
              ? "border-white/30 shadow-indigo-950/20 bg-[#4F46E5]/75 supports-[backdrop-filter]:bg-[#4F46E5]/55 backdrop-blur-xl"
              : "border-white/20 shadow-indigo-950/15 bg-[#4F46E5] supports-[backdrop-filter]:bg-[#4F46E5]/60 backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full py-1 px-2"
              aria-label="Holos - Inicio"
            >
              <Logo
                className="text-2xl transition-transform duration-300 ease-out group-hover:scale-105"
                colorClass="text-white"
              />
            </Link>
          </div>

          {/* Navegación escritorio */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center justify-center gap-7 lg:gap-8"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-semibold text-white/85 hover:text-white transition-colors duration-200 py-1 px-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Botón WhatsApp escritorio */}
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

          {/* Hamburguesa móvil */}
          <div className="md:hidden flex items-center">
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-movil"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "block" }}
                  >
                    <X className="w-6 h-6 text-white" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "block" }}
                  >
                    <Menu className="w-6 h-6 text-white" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Menú móvil con AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="menu-movil"
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: EASE_SMOOTH }}
              className="md:hidden mt-2 p-5 rounded-3xl border border-white/20 shadow-xl shadow-indigo-950/20 bg-[#4F46E5] supports-[backdrop-filter]:bg-[#4F46E5]/90 backdrop-blur-xl will-change-transform"
            >
              <div className="flex flex-col space-y-1">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: idx * 0.05 + 0.05,
                      duration: 0.2,
                      ease: EASE_SMOOTH,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-semibold text-white hover:bg-white/10 px-4 py-2.5 rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: NAV_LINKS.length * 0.05 + 0.08,
                    duration: 0.2,
                    ease: EASE_SMOOTH,
                  }}
                  className="pt-3 mt-1 border-t border-white/20"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between pl-5 pr-2 py-2 rounded-full text-base font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-[background-color,transform] active:scale-[0.98] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Escríbenos por WhatsApp</span>
                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#4F46E5] shadow-xs">
                      <ArrowUpRight className="w-5 h-5 text-[#4F46E5] stroke-[2.5]" aria-hidden="true" />
                    </span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
