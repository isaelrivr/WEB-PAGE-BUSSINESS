"use client";

import { useRef } from "react";
import { MessageCircle, ArrowRight, ArrowDown } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Revisamos tu perfil de Google, tus redes y tu página para ver qué está funcionando y qué no.",
  },
  {
    number: "02",
    title: "Implementación",
    description:
      "Ponemos en marcha lo acordado, ya sean tarjetas NFC, rediseño de perfil, web o contenido.",
  },
  {
    number: "03",
    title: "Seguimiento",
    description:
      "Medimos resultados y ajustamos cada mes para que sigas mejorando.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const isInView = useInView(sectionRef, {
    margin: "0px 0px -80px 0px",
    once: true,
  });

  const shouldAnimate = isInView && !prefersReduced;

  const whatsappUrl =
    "https://wa.me/5210000000000?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa%20gratis%20para%20mi%20negocio";

  return (
    <section
      id="como-trabajamos"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-border bg-background section-content-visibility"
    >
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="max-w-2xl mx-auto text-center space-y-3 sm:space-y-4 mb-16 sm:mb-20"
        >
          <motion.span
            variants={headingVariants}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary"
          >
            Proceso
          </motion.span>
          <motion.h2
            variants={headingVariants}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main leading-tight"
          >
            Así trabajamos contigo
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="text-base sm:text-lg text-text-muted font-normal leading-relaxed"
          >
            Un método directo, transparente y enfocado en que tu negocio obtenga
            resultados paso a paso.
          </motion.p>
        </motion.div>

        {/* Pasos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 relative"
        >
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative flex flex-col">
              <motion.div
                variants={cardVariants}
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        y: -5,
                        boxShadow: "0 16px 40px -10px rgba(79,70,229,0.14)",
                        borderColor: "rgba(79,70,229,0.35)",
                        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                className="relative z-10 flex-1 p-7 sm:p-8 rounded-2xl bg-surface border border-border transition-[border-color] duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base tracking-wider shadow-xs">
                      {step.number}
                    </span>
                    <span className="text-xs uppercase font-semibold tracking-wider text-text-muted">
                      Paso {index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-main tracking-tight mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Conector visual */}
              {index < STEPS.length - 1 && (
                <>
                  <div className="hidden md:flex absolute top-1/2 -right-3.5 lg:-right-4.5 -translate-y-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        shouldAnimate
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        delay: 0.3 + index * 0.15,
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="w-7 h-7 rounded-full bg-background border border-border shadow-xs flex items-center justify-center"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-accent" />
                    </motion.div>
                  </div>

                  <div className="md:hidden flex items-center justify-center my-3">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        shouldAnimate
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        delay: 0.3 + index * 0.15,
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center"
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-accent" />
                    </motion.div>
                  </div>
                </>
              )}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="mt-16 sm:mt-20 text-center"
        >
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={prefersReduced ? {} : { scale: 1.03, y: -2 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-medium text-white bg-primary hover:bg-primary/90 transition-[background-color] duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Agenda una asesoría gratis por WhatsApp (abre en una nueva pestaña)"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Agenda una asesoría gratis</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
