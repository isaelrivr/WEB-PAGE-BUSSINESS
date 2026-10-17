"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const services = [
  {
    badge: "services.badge1",
    title: "services.title1",
    description: "services.description1",
    features: ["services.feature1a", "services.feature1b", "services.feature1c"],
    image: "services.serviceImage1",
    price: "services.price1",
  },
  {
    badge: "services.badge2",
    title: "services.title2",
    description: "services.description2",
    features: ["services.feature2a", "services.feature2b", "services.feature2c"],
    image: "services.serviceImage2",
    price: "services.price2",
  },
  {
    badge: "services.badge3",
    title: "services.title3",
    description: "services.description3",
    features: ["services.feature3a", "services.feature3b", "services.feature3c"],
    image: "services.serviceImage3",
    price: "services.price3",
  },
  {
    badge: "services.badge4",
    title: "services.title4",
    description: "services.description4",
    features: ["services.feature4a", "services.feature4b", "services.feature4c"],
    image: "services.serviceImage4",
    price: "services.price4",
  },
  {
    badge: "services.badge5",
    title: "services.title5",
    description: "services.description5",
    features: ["services.feature5a", "services.feature5b", "services.feature5c"],
    image: "services.serviceImage5",
    price: "services.price5",
  },
] as const;

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600">
            {t("services.eyebrow")}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {t("services.title")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("services.intro")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="animate-fade-in-up flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-900/5"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex aspect-[16/9] flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-5 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-xl text-indigo-500 shadow-sm" aria-hidden="true">
                  +
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  {t("services.visual")}
                </p>
                <code className="mt-2 rounded bg-white/80 px-2 py-1 text-[11px] text-slate-500">
                  {t("services.visualPath")}{t(service.image)}
                </code>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="self-start rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                  {t(service.badge)}
                </span>
                <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {t(service.title)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t(service.description)}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-slate-700">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="mb-3 text-xs font-semibold text-slate-500">
                    {t(service.price)}
                  </p>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 transition-colors hover:text-indigo-800"
                  >
                    {t("services.quote")} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
