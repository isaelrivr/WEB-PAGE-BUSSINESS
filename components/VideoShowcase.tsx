"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function VideoShowcase() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
            {t("video.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t("video.title")}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            {t("video.description")}
          </p>
          <p className="mt-4 text-sm text-slate-500">
            {t("video.format")}
          </p>
        </div>

        <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-indigo-300 bg-slate-900 px-6 text-center text-white shadow-xl shadow-slate-900/10">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl" aria-hidden="true">
            ▶
          </span>
          <p className="mt-5 font-bold">{t("video.pending")}</p>
          <code className="mt-2 rounded bg-white/10 px-3 py-1.5 text-xs text-slate-200">
            public/videos/demo-nfc.mp4
          </code>
          <p className="mt-3 text-xs text-slate-300">
            {t("video.activate")}
          </p>
        </div>
      </div>
    </section>
  );
}
