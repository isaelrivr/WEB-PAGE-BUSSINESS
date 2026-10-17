import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <Navbar />
        <main className="flex-1 pt-20 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
