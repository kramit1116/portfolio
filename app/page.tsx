"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/cursor/CustomCursor"), {
  ssr: false,
});
const Chatbot = dynamic(() => import("@/components/chatbot/Chatbot"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    };

    initLenis();
  }, []);

  return (
    <main className="relative min-h-screen animated-gradient noise">
      <CustomCursor />
      <Navigation />

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      <Footer />

      <Chatbot />
    </main>
  );
}
