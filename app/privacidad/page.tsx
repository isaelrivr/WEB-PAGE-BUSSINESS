import type { Metadata } from "next";
import PrivacyContent from "@/components/PrivacyContent";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: "Aviso de privacidad y tratamiento de datos personales de Holos.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <PrivacyContent />
    </div>
  );
}
