import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import AboutUs from "@/components/AboutUs";

export const metadata: Metadata = {
  title: "Holos | Reseñas, redes y páginas web para negocios locales",
  description:
    "Impulsamos el crecimiento de negocios locales y pymes mediante placas y tarjetas NFC de reseñas, optimización de perfil de Google Business, redes sociales y páginas web.",
  openGraph: {
    title: "Holos | Reseñas, redes y páginas web para negocios locales",
    description:
      "Impulsamos el crecimiento de negocios locales y pymes mediante placas y tarjetas NFC de reseñas, optimización de perfil de Google Business, redes sociales y páginas web.",
    url: "https://holos.mx",
    type: "website",
    // =========================================================================
    // IMAGEN DE VISTA PREVIA OPEN GRAPH (INICIO):
    // Descomenta al colocar la imagen en public/og-home.jpg o public/og-image.jpg:
    // images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Holos - Más reseñas y mejor presencia online" }],
    // =========================================================================
  },
  twitter: {
    card: "summary_large_image",
    title: "Holos | Reseñas, redes y páginas web para negocios locales",
    description:
      "Impulsamos el crecimiento de negocios locales y pymes mediante placas y tarjetas NFC de reseñas, optimización de perfil de Google Business, redes sociales y páginas web.",
    // =========================================================================
    // IMAGEN DE VISTA PREVIA TWITTER (INICIO):
    // Descomenta al colocar la imagen en public/og-image.jpg:
    // images: ["/og-image.jpg"],
    // =========================================================================
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowWeWork />
      <AboutUs />
    </>
  );
}
