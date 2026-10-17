"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const whatsappUrl = phoneNumber
  ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola, me interesa conocer sus servicios.")}`
  : null;

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const className =
    "fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-transform hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";

  if (!whatsappUrl) {
    return (
      <Link
        href="/contacto"
        className={className}
        aria-label={t("whatsapp.contact")}
        title="Configura NEXT_PUBLIC_WHATSAPP_NUMBER para activar WhatsApp"
      >
        <span aria-hidden="true">✉</span>
        <span>{t("whatsapp.contact")}</span>
      </Link>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={t("whatsapp.aria")}
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.9 11.9 0 0 0 5.83 1.49h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.44ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.6-.24-.37a9.88 9.88 0 0 1-1.51-5.28C2.21 6.45 6.65 2 12.09 2a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.44-4.45 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.66-.51h-.57c-.2 0-.52.08-.79.38-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
      </svg>
      <span>{t("whatsapp.label")}</span>
    </a>
  );
}
