import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://holos.mx"),
  title: {
    default: "Holos | Reseñas, redes y páginas web para negocios locales",
    template: "%s | Holos",
  },
  description:
    "Ayudamos a negocios locales a crecer y destacar con optimización de reseñas en Google Maps, gestión de redes sociales y páginas web profesionales.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://holos.mx",
    siteName: "Holos",
    title: "Holos | Reseñas, redes y páginas web para negocios locales",
    description:
      "Ayudamos a negocios locales a crecer y destacar con optimización de reseñas en Google Maps, gestión de redes sociales y páginas web profesionales.",
    // =========================================================================
    // IMAGEN DE VISTA PREVIA OPEN GRAPH:
    // Agrega el archivo 'og-image.jpg' (1200x630 px) en la carpeta public/
    // y descomenta la siguiente línea:
    // images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Holos - Soluciones digitales para negocios locales" }],
    // =========================================================================
  },
  twitter: {
    card: "summary_large_image",
    title: "Holos | Reseñas, redes y páginas web para negocios locales",
    description:
      "Ayudamos a negocios locales a crecer y destacar con optimización de reseñas en Google Maps, gestión de redes sociales y páginas web profesionales.",
    // =========================================================================
    // IMAGEN DE VISTA PREVIA TWITTER CARD:
    // Descomenta la siguiente línea al agregar la imagen en public/og-image.jpg:
    // images: ["/og-image.jpg"],
    // =========================================================================
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-text-main selection:bg-primary selection:text-white font-sans">
        <Navbar />
        <main className="flex-1 pt-20 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
