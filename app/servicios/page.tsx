import type { Metadata } from "next";
import NFCDemo from "@/components/NFCDemo";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Servicios digitales para negocios locales",
  description:
    "Conoce los servicios de Holos: tarjetas NFC para reseñas, menús digitales, páginas web, redes sociales y sistemas a medida.",
};

export default function ServicesPage() {
  return (
    <>
      <Services />
      <NFCDemo />
    </>
  );
}
