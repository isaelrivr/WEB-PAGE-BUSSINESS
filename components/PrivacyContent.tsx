"use client";

import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const sections = [
  ["privacy.section1Title", "privacy.section1"],
  ["privacy.section2Title", "privacy.section2"],
  ["privacy.section3Title", "privacy.section3"],
  ["privacy.section4Title", "privacy.section4"],
] as const;

export default function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t("privacy.back")}</span>
        </Link>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-primary">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            {t("privacy.title")}
          </h1>
        </div>
        <p className="text-base font-normal leading-relaxed text-text-muted">
          {t("privacy.provisional")}
        </p>
      </div>

      <div className="space-y-6 text-sm font-normal leading-relaxed text-text-muted">
        {sections.map(([title, body]) => (
          <section key={title} className="space-y-2">
            <h2 className="text-lg font-bold text-text-main">{t(title)}</h2>
            <p>{t(body)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
