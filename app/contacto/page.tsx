import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Agencia PyME",
  description:
    "Cuéntanos sobre tu negocio. Te ayudamos a potenciar tus reseñas en Google Maps, tus redes sociales y tu página web.",
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
