import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio";

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 text-zinc-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Columna 1: Identidad provisional */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-base tracking-wider">
                AP
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-zinc-900 tracking-tight leading-tight">
                  Agencia PyME
                </span>
                <span className="text-xs text-zinc-500">Logo Provisional</span>
              </div>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">
              Impulsamos a negocios pequeños y locales con soluciones prácticas:
              posicionamiento con reseñas de Google, gestión de redes sociales y
              diseño web enfocado en resultados.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-zinc-950 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#servicios"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="#nosotros"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#contacto"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enfoque y Servicios */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
              Especialidades
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                <span>Optimización de Reseñas en Google</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                <span>Gestión de Redes Sociales para PyMEs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                <span>Páginas Web Rápidas y Modernas</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
              Atención directa
            </h3>
            <div className="space-y-3.5 text-sm">
              <p className="text-zinc-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>México · Atención remota y local</span>
              </p>
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/90 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chatea por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador y parte inferior */}
        <div className="mt-14 pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2025 Agencia PyME. Todos los derechos reservados.</p>
          <p className="text-zinc-400">
            Enfocados en el crecimiento real de los negocios pequeños.
          </p>
        </div>
      </div>
    </footer>
  );
}
