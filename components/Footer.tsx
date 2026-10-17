"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-200">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-xs text-slate-500 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/servicios" className="hover:text-indigo-600 transition-colors">
              {t("nav.services")}
            </Link>
            <Link href="/nosotros" className="hover:text-indigo-600 transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/contacto" className="hover:text-indigo-600 transition-colors">
              {t("nav.contact")}
            </Link>
            <Link href="/privacidad" className="hover:text-indigo-600 transition-colors">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}