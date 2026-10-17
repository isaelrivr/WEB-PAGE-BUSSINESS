"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function NFCDemo() {
  const { t } = useLanguage();

  return (
    <section id="nfc-demo" className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
            {t("nfc.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t("nfc.title")}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            {t("nfc.description")}
          </p>
          <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700" aria-hidden="true">✓</span>
              {t("nfc.feature1")}
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700" aria-hidden="true">✓</span>
              {t("nfc.feature2")}
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700" aria-hidden="true">✓</span>
              {t("nfc.feature3")}
            </li>
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-sm font-bold text-slate-900">{t("nfc.demo")}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">NFC</span>
          </div>
          <div className="mt-5 rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-extrabold text-indigo-600 shadow-xs">G</div>
              <div>
                <p className="font-bold text-slate-900">{t("nfc.googleProfile")}</p>
                <p className="text-sm text-slate-500">{t("nfc.maps")}</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-white p-4 text-center shadow-xs">
              <p className="text-sm font-semibold text-slate-700">{t("nfc.tap")}</p>
              <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <p className="mt-3 text-xs text-slate-500">{t("nfc.link")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
