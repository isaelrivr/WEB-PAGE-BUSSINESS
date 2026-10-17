"use client";

import Link from "next/link";
import FAQ from "@/components/FAQ";
import ProjectShowcase from "@/components/ProjectShowcase";
import VideoShowcase from "@/components/VideoShowcase";
import { useLanguage } from "@/components/LanguageProvider";

const solutions = [
  { number: "01", title: "home.service1", description: "home.service1Text", icon: "◎" },
  { number: "02", title: "home.service2", description: "home.service2Text", icon: "</>" },
  { number: "03", title: "home.service3", description: "home.service3Text", icon: "↗" },
] as const;

const steps = [
  { number: "01", title: "home.step1", description: "home.step1Text" },
  { number: "02", title: "home.step2", description: "home.step2Text" },
  { number: "03", title: "home.step3", description: "home.step3Text" },
] as const;

export default function HomeSections() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
              {t("home.digitalEyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {t("home.digitalTitle")}
            </h2>
          </div>
          <div className="flex flex-col items-start justify-center gap-5">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              {t("home.digitalText")}
            </p>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              {t("home.aboutLink")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
                {t("home.offerEyebrow")}
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {t("home.offerTitle")}
              </h2>
            </div>
            <Link
              href="/servicios"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              {t("home.allServices")} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {solutions.map((solution) => (
              <article
                key={solution.number}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-extrabold text-indigo-600">
                    {solution.icon}
                  </span>
                  <span className="text-xs font-bold tracking-[0.15em] text-slate-400">
                    {solution.number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-extrabold text-slate-900">
                  {t(solution.title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t(solution.description)}
                </p>
                <Link
                  href="/servicios"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-colors group-hover:text-indigo-800"
                >
                  {t("home.learnMore")} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
              {t("home.processEyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t("home.processTitle")}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              {t("home.processText")}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="relative border-t border-slate-300 pt-5">
                <span className="text-xs font-extrabold tracking-[0.16em] text-indigo-600">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-slate-900">{t(step.title)}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                  {t(step.description)}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              {t("home.fullProcess")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <ProjectShowcase />

      <VideoShowcase />

      <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
              {t("coverage.eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t("coverage.title")}
            </h2>
          </div>
          <div>
            <p className="leading-relaxed text-slate-600">
              {t("coverage.text")}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {[
                "Torreón",
                "Gómez Palacio",
                "Lerdo",
                "Matamoros",
                "San Pedro de las Colonias",
                "Francisco I. Madero",
                "Viesca",
                "Tlahualilo",
                "Comunidades cercanas",
              ].map((city) => (
                <li
                  key={city}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              {t("coverage.note")}
            </p>
          </div>
        </div>
      </section>

      <FAQ />

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">
              {t("home.ctaEyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t("home.ctaTitle")}
            </h2>
            <p className="mt-3 leading-relaxed text-slate-300">
              {t("home.ctaText")}
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-orange-600 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-700 lg:self-center"
          >
            {t("home.contactHolos")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
