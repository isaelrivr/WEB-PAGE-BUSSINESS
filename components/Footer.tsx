import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  return (
    <footer className="bg-surface border-t border-border text-text-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Columna 1: Identidad provisional */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base tracking-wider">
                AP
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-text-main tracking-tight leading-tight">
                  Agencia PyME
                </span>
                <span className="text-xs text-text-muted">Logo Provisional</span>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              Impulsamos a negocios pequeños y locales con soluciones prácticas:
              posicionamiento con reseñas de Google, gestión de redes sociales y
              diseño web enfocado en resultados.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-text-muted hover:text-text-main transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#servicios"
                  className="text-text-muted hover:text-text-main transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="#nosotros"
                  className="text-text-muted hover:text-text-main transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#contacto"
                  className="text-text-muted hover:text-text-main transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enfoque y Servicios */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">
              Especialidades
            </h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Optimización de Reseñas en Google</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Gestión de Redes Sociales para PyMEs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Páginas Web Rápidas y Modernas</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">
              Atención directa
            </h3>
            <div className="space-y-3.5 text-sm">
              <p className="text-text-muted flex items-center gap-2">
                <MapPin className="w-4 h-4 text-text-muted shrink-0" />
                <span>México · Atención remota y local</span>
              </p>
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-primary bg-background border border-primary hover:bg-primary/5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chatea por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador y parte inferior */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2025 Agencia PyME. Todos los derechos reservados.</p>
          <p className="text-text-muted">
            Enfocados en el crecimiento real de los negocios pequeños.
          </p>
        </div>
      </div>
    </footer>
  );
}
