"use client";

import { useRef } from "react";
import Link from "next/link";
import { MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const isInView = useInView(footerRef, { margin: "0px 0px -60px 0px", once: true });
  const shouldAnimate = isInView && !prefersReduced;

  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  return (
    <footer ref={footerRef} className="bg-surface border-t border-border text-text-muted mt-auto overflow-hidden section-content-visibility">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Columna 1: Identidad */}
          <motion.div variants={colVariants} className="space-y-4">
            <Link href="/" className="inline-block group" aria-label="Holos - Inicio">
              <Logo className="text-2xl transition-transform duration-200 group-hover:scale-105" />
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              Impulsamos a negocios pequeños y locales con soluciones prácticas:
              posicionamiento con reseñas de Google, gestión de redes sociales y
              diseño web enfocado en resultados.
            </p>
          </motion.div>

          {/* Columna 2: Navegación */}
          <motion.div variants={colVariants}>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Inicio", href: "/" },
                { label: "Servicios", href: "#servicios" },
                { label: "Nosotros", href: "#nosotros" },
                { label: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text-muted hover:text-text-main transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3: Especialidades */}
          <motion.div variants={colVariants}>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">
              Especialidades
            </h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {[
                "Optimización de Reseñas en Google",
                "Gestión de Redes Sociales para PyMEs",
                "Páginas Web Rápidas y Modernas",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 4: Contacto */}
          <motion.div variants={colVariants}>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">
              Atención directa
            </h3>
            <div className="space-y-3.5 text-sm">
              <p className="text-text-muted flex items-center gap-2">
                <MapPin className="w-4 h-4 text-text-muted shrink-0" />
                <span>México · Atención remota y local</span>
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-primary bg-background border border-primary hover:bg-primary hover:text-white transition-[background-color,color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <MessageCircle className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" />
                <span>Chatea por WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Parte inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted"
        >
          <p>© 2026 Holos. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacidad"
              className="hover:text-text-main transition-colors underline-offset-4 hover:underline"
            >
              Aviso de privacidad
            </Link>
            <p className="text-text-muted">
              Enfocados en el crecimiento real de los negocios pequeños.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
