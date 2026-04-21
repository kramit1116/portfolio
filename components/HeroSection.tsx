"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("@/components/canvas/ParticleCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

const RippleCanvas = dynamic(() => import("@/components/canvas/RippleCanvas"), {
  ssr: false,
});

const TAGLINE = "Building intelligent systems and immersive web experiences";
const NAME = "Amit Kumar Verma";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayedText, setDisplayedText] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(TAGLINE.slice(0, i + 1));
      i++;
      if (i === TAGLINE.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToWork = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas mousePosition={mousePosition} />
      </div>

      {/* Ripple layer */}
      <RippleCanvas />

      {/* Deep background gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: "linear-gradient(to top, rgba(3,7,18,1) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        style={{ opacity, y, scale }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
            Portfolio 2025
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.21, 1.11, 0.81, 0.99] }}
          className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="block text-white">{NAME.split(" ")[0]}</span>
          <span className="block neon-text">{NAME.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        {/* Tagline typewriter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-base md:text-xl text-slate-400 font-light max-w-2xl mb-10 min-h-[2rem]"
        >
          {displayedText}
          <span className="inline-block w-0.5 h-5 bg-purple-400 ml-0.5 animate-pulse" />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button
            id="view-work-btn"
            onClick={scrollToWork}
            data-magnetic
            className="glow-btn relative px-8 py-3.5 rounded-full text-white font-semibold text-sm tracking-wide z-10 overflow-hidden group"
            style={{ minWidth: 160 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Work
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>

          <a
            href="https://github.com/kramit1116"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="px-8 py-3.5 rounded-full text-slate-300 font-semibold text-sm tracking-wide border border-slate-700 hover:border-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2"
            style={{ minWidth: 160, justifyContent: "center" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent animate-pulse" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-slate-700 font-mono text-xs pointer-events-none select-none">
        &lt;portfolio /&gt;
      </div>
      <div className="absolute top-8 right-8 text-slate-700 font-mono text-xs pointer-events-none select-none">
        2025
      </div>
    </section>
  );
}
