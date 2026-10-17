"use client";

import { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

// Constantes provisionales fáciles de reemplazar
export const CONTACT_INFO = {
  whatsappNumber: "+52 1 000 000 0000",
  whatsappDisplay: "+52 (000) 000-0000",
  whatsappUrl:
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20mi%20negocio",
  email: "contacto@agenciapyme.mx",
};

const SERVICE_OPTIONS = [
  "Reseñas con NFC y QR",
  "Perfil de Google Business",
  "Página web",
  "Redes sociales",
  "Otro",
];

interface FormErrors {
  nombre?: string;
  correo?: string;
  telefono?: string;
  negocio?: string;
  servicio?: string;
  mensaje?: string;
  general?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    negocio: "",
    servicio: "",
    mensaje: "",
    _gotcha: "", // Campo oculto antispam
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const validateClient = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "Por favor ingresa tu nombre.";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      newErrors.correo = "Por favor ingresa tu correo electrónico.";
    } else if (!emailRegex.test(formData.correo.trim())) {
      newErrors.correo = "Ingresa un correo electrónico con formato válido.";
    }

    if (!formData.negocio.trim()) {
      newErrors.negocio = "Indica el nombre de tu negocio o proyecto.";
    }

    if (!formData.servicio) {
      newErrors.servicio = "Selecciona el servicio en el que tienes interés.";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "Por favor escribe un mensaje breve sobre lo que necesitas.";
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje debe contener al menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error del campo al escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateClient()) {
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setServerMessage(data.message);
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          negocio: "",
          servicio: "",
          mensaje: "",
          _gotcha: "",
        });
      } else {
        setStatus("error");
        setServerMessage(data.message || "Por favor verifica los datos ingresados.");
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "No fue posible conectar con el servidor. Revisa tu conexión o escríbenos directamente por WhatsApp."
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Columna izquierda: Formulario */}
      <div className="lg:col-span-7 bg-background p-7 sm:p-10 rounded-2xl border border-border shadow-xs">
        {status === "success" ? (
          <div className="text-center py-12 space-y-5 animate-fade-in-up">
            <div className="w-14 h-14 rounded-full bg-accent/15 text-primary flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-text-main">
              ¡Mensaje enviado con éxito!
            </h3>
            <p className="text-base text-text-muted max-w-md mx-auto leading-relaxed">
              {serverMessage}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-primary border-2 border-primary hover:bg-primary/5 transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {status === "error" && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span>{serverMessage}</span>
              </div>
            )}

            {/* Campo oculto Honeypot contra spam */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="_gotcha">No llenes este campo si eres humano</label>
              <input
                type="text"
                id="_gotcha"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Fila: Nombre y Correo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-text-main mb-1.5"
                >
                  Tu nombre <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Carlos Martínez"
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.nombre ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.nombre && (
                  <p className="mt-1.5 text-xs text-red-600 font-normal">
                    {errors.nombre}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-text-main mb-1.5"
                >
                  Correo electrónico <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="ejemplo@negocio.com"
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.correo ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.correo && (
                  <p className="mt-1.5 text-xs text-red-600 font-normal">
                    {errors.correo}
                  </p>
                )}
              </div>
            </div>

            {/* Fila: Teléfono y Nombre del negocio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-text-main mb-1.5"
                >
                  Teléfono <span className="text-xs text-text-muted font-normal">(opcional)</span>
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej. 55 1234 5678"
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.telefono ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.telefono && (
                  <p className="mt-1.5 text-xs text-red-600 font-normal">
                    {errors.telefono}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="negocio"
                  className="block text-sm font-medium text-text-main mb-1.5"
                >
                  Nombre de tu negocio <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="negocio"
                  name="negocio"
                  value={formData.negocio}
                  onChange={handleChange}
                  placeholder="Ej. Taller Mecánico San José"
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.negocio ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.negocio && (
                  <p className="mt-1.5 text-xs text-red-600 font-normal">
                    {errors.negocio}
                  </p>
                )}
              </div>
            </div>

            {/* Servicio de interés */}
            <div>
              <label
                htmlFor="servicio"
                className="block text-sm font-medium text-text-main mb-1.5"
              >
                Servicio de interés <span className="text-primary">*</span>
              </label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-surface border text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.servicio ? "border-red-500" : "border-border"
                }`}
              >
                <option value="">Selecciona una opción...</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.servicio && (
                <p className="mt-1.5 text-xs text-red-600 font-normal">
                  {errors.servicio}
                </p>
              )}
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-text-main mb-1.5"
              >
                ¿En qué podemos ayudarte? <span className="text-primary">*</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Platícanos sobre tu negocio, tus metas o las dudas que tengas..."
                className={`w-full px-4 py-3 rounded-xl bg-surface border text-text-main placeholder:text-text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y ${
                  errors.mensaje ? "border-red-500" : "border-border"
                }`}
              />
              {errors.mensaje && (
                <p className="mt-1.5 text-xs text-red-600 font-normal">
                  {errors.mensaje}
                </p>
              )}
            </div>

            {/* Botón de envío (Botón principal: fondo índigo con texto blanco) */}
            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-medium text-white bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando mensaje...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar mensaje</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Columna derecha: Canales directos (WhatsApp y Correo) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Tarjeta WhatsApp */}
        <div className="p-7 sm:p-8 rounded-2xl bg-surface border border-border shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent/15 text-primary flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-current text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main">
                Atención por WhatsApp
              </h3>
              <p className="text-xs text-text-muted font-normal">
                Respuesta ágil y trato directo
              </p>
            </div>
          </div>

          <p className="text-sm text-text-muted leading-relaxed font-normal">
            Si prefieres platicar sin formularios, escríbenos directamente. Resolveremos tus dudas y te asesoraremos sobre la mejor opción para tu negocio.
          </p>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-medium text-white bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Escríbenos por WhatsApp</span>
          </a>
        </div>

        {/* Tarjeta Correo Electrónico */}
        <div className="p-7 sm:p-8 rounded-2xl bg-surface border border-border shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-highlight/15 text-primary flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main">
                Correo electrónico
              </h3>
              <p className="text-xs text-text-muted font-normal">
                Para propuestas y consultas formales
              </p>
            </div>
          </div>

          <p className="text-sm text-text-muted leading-relaxed font-normal">
            Envíanos un correo y te responderemos en un plazo máximo de un día hábil:
          </p>

          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:underline"
          >
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>
    </div>
  );
}
