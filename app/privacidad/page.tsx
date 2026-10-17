import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Holos",
  description: "Aviso de privacidad y tratamiento de datos personales de Holos.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/15 text-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main">
              Aviso de privacidad
            </h1>
          </div>
          <p className="text-base text-text-muted leading-relaxed font-normal">
            Página provisional de aviso de privacidad y protección de datos personales.
          </p>
        </div>

        <div className="prose prose-zinc max-w-none space-y-6 text-sm text-text-muted leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-main">
              1. Identidad y responsabilidad
            </h2>
            <p>
              Holos es responsable del uso y protección de los datos personales que nos proporciones a través de nuestro sitio web y canales de mensajería.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-main">
              2. Datos que recabamos
            </h2>
            <p>
              Para fines de contacto, cotización y asesoría, recabamos únicamente los datos necesarios que proporcionas de forma voluntaria: nombre, correo electrónico, teléfono y nombre de tu negocio.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-main">
              3. Finalidad del tratamiento
            </h2>
            <p>
              Los datos recabados son utilizados exclusivamente para responder a tus solicitudes de información, coordinar asesorías y dar seguimiento a los servicios de reseñas, redes sociales o páginas web solicitados. No vendemos ni compartimos tus datos con terceros para fines comerciales o publicitarios.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-main">
              4. Carácter provisional
            </h2>
            <p>
              Este texto es un documento provisional para fines de desarrollo y demostración técnica. El aviso de privacidad definitivo se publicará con los datos de registro formal del negocio.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
