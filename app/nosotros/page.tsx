import type { Metadata } from "next";
import AboutUs from "@/components/AboutUs";
import HowWeWork from "@/components/HowWeWork";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a Holos Digital y cómo trabajamos para ayudar a negocios locales con su presencia digital.",
};

export default function AboutPage() {
  return (
    <>
      <AboutUs />
      <HowWeWork />
    </>
  );
}
