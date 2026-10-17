"use client";

import { useLanguage } from "@/components/LanguageProvider";

const steps = [
  ["01", "process.step1", "process.step1Text"],
  ["02", "process.step2", "process.step2Text"],
  ["03", "process.step3", "process.step3Text"],
  ["04", "process.step4", "process.step4Text"],
] as const;

export default function HowWeWork() {
  const { t } = useLanguage();

  return (
    <section id="proceso" className="border-y border-slate-200/80 bg-slate-50 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-block rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
            {t("process.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t("process.title")}
          </h2>
          <p className="mt-3 text-slate-600">{t("process.intro")}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, description], index) => (
            <article
              key={number}
              className="animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-7 shadow-xs transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-extrabold text-indigo-600">
                {number}
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                {t(title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(description)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
