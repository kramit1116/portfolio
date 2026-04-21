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
                <div className="text-white text-sm font-bold mt-0.5">Diploma level</div>
                <div className="text-white-400 text-xs">In IITM BS</div>
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
              from IIT Madras (Diploma Level).
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

            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
