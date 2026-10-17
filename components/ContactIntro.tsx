"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ContactIntro() {
  const { t } = useLanguage();

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.75fr]">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
          {t("contact.pageEyebrow")}
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-text-main sm:text-4xl lg:text-5xl">
          {t("contact.title")}
        </h1>
        <p className="mt-4 text-base font-normal leading-relaxed text-text-muted sm:text-lg">
          {t("contact.pageIntro")}
        </p>
        <p className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm leading-relaxed text-slate-700">
          {t("contact.coverage")}
        </p>
      </div>
      <div className="flex aspect-[16/9] flex-col items-center justify-center rounded-3xl border border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 text-center lg:aspect-[4/3]">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-2xl font-light text-indigo-500 shadow-sm" aria-hidden="true">
          +
        </span>
        <p className="mt-4 text-sm font-bold text-slate-700">{t("contact.visual")}</p>
        <code className="mt-2 rounded bg-white/80 px-2 py-1 text-xs text-slate-500">
          {t("contact.visualPath")}
        </code>
      </div>
    </div>
  );
}
