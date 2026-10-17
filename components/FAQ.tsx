"use client";

import { useLanguage, type TranslationKey } from "@/components/LanguageProvider";

type FAQQuestion = readonly [TranslationKey, TranslationKey];

const questions: FAQQuestion[] = [
  ["faq.q1", "faq.a1"],
  ["faq.q2", "faq.a2"],
  ["faq.q3", "faq.a3"],
  ["faq.q4", "faq.a4"],
  ["faq.q5", "faq.a5"],
  ["faq.q6", "faq.a6"],
  ["faq.q7", "faq.a7"],
  ["faq.q8", "faq.a8"],
] as const;

export default function FAQ() {
  const { t } = useLanguage();

  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
            {t("faq.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            {t("faq.intro")}
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {questions.map(([questionKey, answerKey]) => (
            <details key={questionKey} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-800 marker:hidden">
                {t(questionKey)}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="max-w-3xl whitespace-pre-line pt-4 pr-10 text-sm leading-relaxed text-slate-600">
                {t(answerKey)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
