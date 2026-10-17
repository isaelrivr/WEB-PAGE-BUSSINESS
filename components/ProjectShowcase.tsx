"use client";

import { useLanguage } from "@/components/LanguageProvider";

const projects = [
  { number: "01", title: "projects.title1", file: "caso-01.webp" },
  { number: "02", title: "projects.title2", file: "caso-02.webp" },
  { number: "03", title: "projects.title3", file: "caso-03.webp" },
] as const;

export default function ProjectShowcase() {
  const { t } = useLanguage();

  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
            {t("projects.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t("projects.title")}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            {t("projects.description")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.number}
              className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50"
            >
              <div className="flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-2xl font-light text-indigo-500 shadow-sm" aria-hidden="true">
                  +
                </span>
                <p className="mt-4 text-sm font-bold text-slate-700">
                  {t("projects.image")}
                </p>
                <code className="mt-2 rounded bg-white/80 px-2 py-1 text-xs text-slate-500">
                  public/images/casos/{project.file}
                </code>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                  {t("projects.case")} {project.number}
                </p>
                <h3 className="mt-2 font-bold text-slate-900">{t(project.title)}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {t("projects.placeholder")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
