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
  title: "Holos | Reseñas, redes y páginas web para negocios locales",
  description:
    "Ayudamos a negocios locales a crecer y destacar con optimización de reseñas en Google Maps, gestión de redes sociales y páginas web profesionales.",
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
