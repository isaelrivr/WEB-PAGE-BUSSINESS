"use client";

import { useLanguage } from "@/components/LanguageProvider";

const values = [
  ["about.card1", "about.card1Text", "text-indigo-600"],
  ["about.card2", "about.card2Text", "text-sky-600"],
  ["about.card3", "about.card3Text", "text-emerald-600"],
  ["about.card4", "about.card4Text", "text-amber-600"],
] as const;

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
          <div className="animate-fade-in-up rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-10 lg:p-12">
            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
              {t("about.eyebrow")}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              {t("about.title")}
            </h1>
            <p className="mt-5 leading-relaxed text-slate-600">{t("about.text1")}</p>
            <p className="mt-4 leading-relaxed text-slate-600">{t("about.text2")}</p>
          </div>

          <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-3xl border border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-8 text-center lg:aspect-auto">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-3xl font-light text-indigo-500 shadow-sm" aria-hidden="true">
              +
            </span>
            <p className="mt-4 font-bold text-slate-700">{t("about.visual")}</p>
            <code className="mt-2 rounded bg-white/80 px-3 py-1.5 text-xs text-slate-500">
              {t("about.visualPath")}
            </code>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([title, description, color], index) => (
            <article
              key={title}
              className="animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className={`text-sm font-extrabold ${color}`}>{t(title)}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {t(description)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
