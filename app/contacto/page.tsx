import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Asesoría digital para tu negocio local",
  description:
    "Ponte en contacto con el equipo de Holos. Cuéntanos sobre tu negocio y recibe asesoría personalizada para mejorar tus reseñas de Google, redes sociales y página web.",
  openGraph: {
    title: "Contacto | Asesoría digital para tu negocio local - Holos",
    description:
      "Ponte en contacto con el equipo de Holos. Cuéntanos sobre tu negocio y recibe asesoría personalizada para mejorar tus reseñas de Google, redes sociales y página web.",
    url: "https://holos.mx/contacto",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Asesoría digital para tu negocio local - Holos",
    description:
      "Ponte en contacto con el equipo de Holos. Cuéntanos sobre tu negocio y recibe asesoría personalizada para mejorar tus reseñas de Google, redes sociales y página web.",
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado con animación de entrada */}
        <div
          className="max-w-2xl mb-12 sm:mb-16 animate-fade-in-up"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4 animate-fade-in-up animation-delay-75">
            Contacto
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-main leading-tight mb-4 animate-fade-in-up animation-delay-150">
            Cuéntanos sobre tu negocio
          </h1>
          <p className="text-base sm:text-lg text-text-muted font-normal leading-relaxed animate-fade-in-up animation-delay-300">
            Estamos listos para impulsar la presencia digital de tu negocio.
            Completa el formulario o contáctanos por nuestros canales directos.
          </p>
        </div>

        {/* Formulario y canales de contacto */}
        <div className="animate-fade-in-up animation-delay-400">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}


export const metadata: Metadata = {
  title: "Contacto | Asesoría digital para tu negocio local",
  description:
    "Ponte en contacto con el equipo de Holos. Cuéntanos sobre tu negocio y recibe asesoría personalizada para mejorar tus reseñas de Google, redes sociales y página web.",
  openGraph: {
    title: "Contacto | Asesoría digital para tu negocio local - Holos",
    description:
      "Ponte en contacto con el equipo de Holos. Cuéntanos sobre tu negocio y recibe asesoría personalizada para mejorar tus reseñas de Google, redes sociales y página web.",
    url: "https://holos.mx/contacto",
    type: "website",
    // =========================================================================
    // IMAGEN DE VISTA PREVIA OPEN GRAPH (CONTACTO):
    // Descomenta al colocar la imagen en public/og-contacto.jpg o public/og-image.jpg:
    // images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contacto Holos - Asesoría para negocios locales" }],
    // =========================================================================
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Asesoría digital para tu negocio local - Holos",
    description:
      "Ponte en contacto con el equipo de Holos. Cuéntanos sobre tu negocio y recibe asesoría personalizada para mejorar tus reseñas de Google, redes sociales y página web.",
    // =========================================================================
    // IMAGEN DE VISTA PREVIA TWITTER (CONTACTO):
    // Descomenta al colocar la imagen en public/og-image.jpg:
    // images: ["/og-image.jpg"],
    // =========================================================================
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-main leading-tight mb-4">
            Cuéntanos sobre tu negocio
          </h1>
          <p className="text-base sm:text-lg text-text-muted font-normal leading-relaxed">
            Estamos listos para impulsar la presencia digital de tu negocio. Completa el formulario o contáctanos por nuestros canales directos.
          </p>
        </div>

        {/* Formulario y canales de contacto */}
        <ContactForm />
      </div>
    </div>
  );
}
