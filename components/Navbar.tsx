"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/nosotros" },
    { name: t("nav.services"), href: "/servicios" },
    { name: t("nav.contact"), href: "/contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 transition-all duration-300">
      <nav
        aria-label={t("nav.label")}
        className={`relative mx-auto max-w-7xl rounded-2xl border px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-md"
            : "border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-sm"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 lg:flex-nowrap">
          <Link href="/" aria-label="Inicio Holos Digital" className="shrink-0">
            <Logo />
          </Link>

          <div className="order-3 flex w-full items-center justify-between border-t border-slate-200 pt-2 lg:order-2 lg:w-auto lg:flex-1 lg:justify-center lg:gap-5 lg:border-0 lg:pt-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-2 py-2 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 lg:bg-transparent"
                      : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600 lg:hover:bg-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="order-2 flex items-center gap-2 lg:order-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-200 px-3 text-xs font-extrabold text-slate-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:min-h-11 sm:px-4 sm:text-sm"
              aria-label={language === "es" ? "Switch language to English" : "Cambiar idioma a español"}
            >
              {t("language.switch")}
            </button>
            <Link
              href="/contacto"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-orange-600 px-3 py-2 text-xs font-bold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700 sm:min-h-11 sm:px-5 sm:text-sm"
            >
              <span>{t("nav.cta")}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}