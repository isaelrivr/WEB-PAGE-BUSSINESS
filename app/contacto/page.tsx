import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactIntro from "@/components/ContactIntro";

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
        <div className="mb-12 sm:mb-16">
          <ContactIntro />
        </div>

        {/* Formulario y canales de contacto */}
        <ContactForm />
      </div>
    </div>
  );
}
