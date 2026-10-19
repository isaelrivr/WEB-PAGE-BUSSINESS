"use client";

import { useRef } from "react";
import { Lightbulb, ShieldCheck, Users, User } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accentClass: string;
}

const VALUES: ValueItem[] = [
  {
    icon: Lightbulb,
    title: "Claridad",
    description: "Explicamos todo sin tecnicismos.",
    accentClass: "bg-accent/10 text-accent",
  },
  {
    icon: ShieldCheck,
    title: "Honestidad",
    description: "Nunca usamos reseñas falsas ni prometemos lo imposible.",
    accentClass: "bg-highlight/15 text-primary",
  },
  {
    icon: Users,
    title: "Cercanía",
    description: "Trato directo y seguimiento constante.",
    accentClass: "bg-accent/10 text-accent",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
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

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const isInView = useInView(sectionRef, {
    margin: "0px 0px -80px 0px",
    once: true,
  });

  const shouldAnimate = isInView && !prefersReduced;

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-border bg-surface/40"
    >
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="max-w-2xl mx-auto text-center space-y-4 mb-16 sm:mb-20"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary"
          >
            Nosotros
          </motion.span>
          <motion.h2
            variants={headingVariants}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main leading-tight"
          >
            Somos un equipo que entiende a los negocios pequeños
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-text-muted font-normal leading-relaxed"
          >
            Combinamos habilidades técnicas y de diseño para ayudar a negocios
            locales a destacar en internet con soluciones directas y sin complicaciones.
          </motion.p>
        </motion.div>

        {/* 3 Valores */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 mb-16 sm:mb-20"
        >
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                variants={itemVariants}
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        y: -4,
                        boxShadow: "0 12px 32px -8px rgba(79,70,229,0.12)",
                        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                className="p-6 sm:p-7 rounded-2xl bg-background border border-border shadow-xs hover:border-primary/40 transition-[border-color] duration-300 flex flex-col"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${val.accentClass}`}
                >
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-text-main tracking-tight mb-1.5">
                  {val.title}
                </h3>
                <p className="text-sm text-text-muted font-normal leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Espacio reservado para fotos del equipo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pt-10 sm:pt-12 border-t border-border/80 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[1, 2, 3].map((slot) => (
              <motion.div
                key={slot}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  shouldAnimate
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.5 + slot * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-border/60 border border-border flex flex-col items-center justify-center gap-1.5 shadow-inner">
                  <User className="w-6 h-6 text-text-muted/60" />
                  <span className="text-[11px] font-normal text-text-muted tracking-tight">
                    Foto pendiente
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
