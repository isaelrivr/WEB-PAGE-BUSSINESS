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
  title: "Agencia PyME | Reseñas de Google, Redes Sociales y Páginas Web",
  description:
    "Especialistas en impulsar negocios locales y pequeñas empresas mediante la optimización de reseñas en Google Maps, gestión de redes sociales y diseño web profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${plusJakartaSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-text-main selection:bg-primary selection:text-white font-sans">
        <Navbar />
        <main className="flex-1 pt-20 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
