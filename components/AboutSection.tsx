"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "CGPA", value: "9.0", suffix: "/10" },
    { label: "Projects", value: "10+", suffix: "" },
    { label: "Technologies", value: "20+", suffix: "" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] },
    },
  };

  return (
    <section ref={ref} id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* LEFT — Photo */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4)",
                }}
              />

              {/* Photo frame */}
              <div className="relative rounded-3xl overflow-hidden w-[340px] h-[420px] md:w-[380px] md:h-[460px]">
                <Image
                  src="/amit.jpg"
                  alt="Amit Kumar Verma at Taj Mahal Palace, Mumbai"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Bottom overlay with name badge */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(3,7,18,0.95) 0%, transparent 100%)",
                  }}
                >
                  <div className="text-white font-bold text-sm">
                    Amit Kumar Verma
                  </div>
                  <div className="text-purple-400 text-xs font-mono mt-0.5">
                    @ Taj Mahal Palace, Mumbai
                  </div>
                </div>
              </div>

              {/* Floating badge — IIT Madras */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -right-5 top-8 glass rounded-2xl px-4 py-3 shadow-xl"
                style={{ border: "1px solid rgba(168,85,247,0.3)" }}
              >
                <div className="text-xs text-slate-400 font-mono">Currently at</div>
                <div className="text-white text-sm font-bold mt-0.5">IIT Madras</div>
                <div className="text-purple-400 text-xs">CGPA: 9.0 ⭐</div>
              </motion.div>

              {/* Floating badge — Available */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -left-5 bottom-20 glass rounded-2xl px-4 py-3 shadow-xl"
                style={{ border: "1px solid rgba(16,185,129,0.3)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="relative w-2 h-2">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  </div>
                  <span className="text-emerald-400 text-xs font-medium">
                    Open to work
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Text */}
          <div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-purple-500" />
              <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
                About Me
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-white">Passionate </span>
              <span className="neon-text">Technologist</span>
              <br />
              <span className="text-white">&amp; Problem Solver</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 leading-relaxed text-base mb-6"
            >
              BSc Physics graduate and currently pursuing{" "}
              <span className="text-purple-400 font-medium">
                BS in Data Science and Applications
              </span>{" "}
              from IIT Madras (Diploma Level, CGPA: 9).
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 leading-relaxed text-base mb-6"
            >
              Strong foundation in{" "}
              <span className="text-cyan-400 font-medium">
                AI, machine learning
              </span>
              , and{" "}
              <span className="text-blue-400 font-medium">
                full-stack development
              </span>
              . Experienced in building scalable Flask-based applications and
              exploring deep learning, computer vision, and modern web
              technologies.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="glass rounded-2xl p-4 text-center neon-border"
                >
                  <div className="text-2xl font-black neon-text">
                    {stat.value}
                    <span className="text-base">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 flex-wrap"
            >
              <a
                href="https://github.com/kramit1116"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-slate-300 border border-slate-700 hover:border-purple-500 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/amit-kumar-a34511273/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-slate-300 border border-slate-700 hover:border-blue-500 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
