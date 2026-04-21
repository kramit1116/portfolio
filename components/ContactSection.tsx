"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const links = [
  {
    label: "GitHub (Main)",
    url: "https://github.com/kramit1116",
    icon: "github",
    color: "#a855f7",
  },
  {
    label: "GitHub (IIT)",
    url: "https://github.com/24f1000489",
    icon: "github",
    color: "#3b82f6",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/amit-kumar-a34511273/",
    icon: "linkedin",
    color: "#06b6d4",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Section divider */}
      <div className="section-divider mb-16" />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(168,85,247,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-purple-500" />
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
              Get in Touch
            </span>
            <div className="h-px w-8 bg-purple-500" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-black mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-white">Let&apos;s </span>
            <span className="neon-text">Connect</span>
          </h2>
          <p className="text-slate-500 text-base max-w-md mx-auto mb-12 leading-relaxed">
            Open to opportunities in AI, ML, and full-stack development. Feel free to reach
            out!
          </p>
        </motion.div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          {links.map((link, i) => (
            <motion.a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-300 glass min-w-[180px] justify-center"
              style={{
                border: `1px solid ${link.color}25`,
              }}
              whileHover={{
                scale: 1.05,
                borderColor: link.color + "60",
                boxShadow: `0 0 20px ${link.color}20`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {link.icon === "github" ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              )}
              <span style={{ color: link.color + "dd" }}>{link.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass"
          style={{ border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-emerald-400 text-sm font-medium">
            Available for opportunities
          </span>
        </motion.div>
      </div>
    </section>
  );
}
