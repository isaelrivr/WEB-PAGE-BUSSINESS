"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const capabilities = [
  { key: "cap.google", mark: "G", color: "text-indigo-600" },
  { key: "cap.web", mark: "</>", color: "text-sky-600" },
  { key: "cap.social", mark: "↗", color: "text-violet-600" },
] as const;

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-white px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="pointer-events-none absolute -right-32 top-12 -z-10 h-[30rem] w-[30rem] rounded-full bg-indigo-50 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-orange-50 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="animate-fade-in-up">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
            <span className="h-0.5 w-8 bg-orange-600" />
            {t("hero.eyebrow")}
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {t("hero.title")}{" "}
            <span className="text-indigo-600">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:-translate-y-0.5 hover:bg-orange-700"
            >
              {t("hero.contact")} <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/servicios"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-bold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
            >
              {t("hero.services")}
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600" aria-hidden="true">✳</span>
            <span>{t("hero.support")}</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-fade-in-up animation-delay-150">
          <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-orange-200 sm:-right-8 sm:-top-8 sm:h-40 sm:w-40" />
          <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-indigo-100/70 sm:-bottom-8 sm:-left-8 sm:h-32 sm:w-32" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                  Holos Digital
                </p>
                <p className="mt-1 text-lg font-extrabold text-slate-900">
                  {t("hero.connected")}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                <svg className="h-6 w-6" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                  <path d="M18 3C9.7 3 3 9.7 3 18s6.7 15 15 15 15-6.7 15-15c0-3.3-1.1-6.4-2.9-8.9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M13.5 16.5a6.4 6.4 0 019 0M11 13.5a9.9 9.9 0 0114 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="18" cy="21" r="2.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 sm:p-5">
              <p className="text-sm font-bold text-slate-800">{t("hero.combined")}</p>
              <div className="mt-4 space-y-3">
                {capabilities.map((item) => (
                  <div key={item.key} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-sm font-extrabold ${item.color}`} aria-hidden="true">
                      {item.mark}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-slate-700">{t(item.key)}</span>
                    <span className="h-2 w-2 rounded-full bg-indigo-500" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-4 text-white sm:px-5">
              <div>
                <p className="text-xs font-medium text-slate-300">{t("hero.cardFooter")}</p>
                <p className="mt-1 text-sm font-bold">{t("hero.moveForward")}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-lg" aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
