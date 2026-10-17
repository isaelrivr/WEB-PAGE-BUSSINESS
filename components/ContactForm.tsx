"use client";

import React, { useState } from "react";
import { useLanguage, type TranslationKey } from "@/components/LanguageProvider";

const serviceOptions: readonly [TranslationKey, TranslationKey][] = [
  ["contact.option1", "contact.option1"],
  ["contact.option2", "contact.option2"],
  ["contact.option3", "contact.option3"],
  ["contact.option4", "contact.option4"],
  ["contact.option5", "contact.option5"],
  ["contact.option6", "contact.option6"],
] as const;

export default function ContactForm() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<TranslationKey>("contact.option1");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    nombre: "",
    negocio: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          servicio: t(selectedService),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ nombre: "", negocio: "", telefono: "", email: "", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-12 shadow-xl shadow-slate-900/5">

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block rounded-full bg-indigo-50 border border-indigo-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600">
              {t("contact.pageEyebrow")}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
              {t("contact.title")}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              {t("contact.description")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selector de Servicio */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3">
                {t("contact.service")}
              </label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map(([optionKey, valueKey]) => {
                  const active = selectedService === valueKey;
                  return (
                    <button
                      type="button"
                      key={optionKey}
                      onClick={() => setSelectedService(valueKey)}
                      className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {t(optionKey)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Campos de texto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder={t("contact.placeholderName")}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t("contact.business")}
                </label>
                <input
                  type="text"
                  value={formData.negocio}
                  onChange={(e) => setFormData({ ...formData, negocio: e.target.value })}
                  placeholder={t("contact.placeholderBusiness")}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder={t("contact.placeholderPhone")}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.placeholderEmail")}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t("contact.message")}
              </label>
              <textarea
                rows={3}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                placeholder={t("contact.placeholderMessage")}
                className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 py-4 text-base font-extrabold text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {status === "loading" ? t("contact.sending") : t("contact.submit")}
            </button>

            {status === "success" && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center text-sm font-semibold text-emerald-800">
                {t("contact.success")}
              </div>
            )}

            {status === "error" && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-center text-sm font-semibold text-rose-800">
                {t("contact.error")}
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}