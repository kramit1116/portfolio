"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const education = [
  {
    degree: "BS Data Science & Applications",
    institution: "IIT Madras",
    period: "2024 – Present",
    detail: "Diploma Level · CGPA: 9.0/10",
    icon: "🎓",
    color: "#a855f7",
    current: true,
  },
  {
    degree: "BSc Physics (Hons)",
    institution: "Magadh University",
    period: "2021 – 2024",
    detail: "Graduated with Honours",
    icon: "⚛️",
    color: "#3b82f6",
    current: false,
  },
  {
    degree: "Senior Secondary (PCM)",
    institution: "BSEB Board",
    period: "2021",
    detail: "85.8% — Physics, Chemistry, Mathematics",
    icon: "📘",
    color: "#06b6d4",
    current: false,
  },
  {
    degree: "Secondary",
    institution: "BSEB Board",
    period: "2019",
    detail: "88.6%",
    icon: "📗",
    color: "#10b981",
    current: false,
  },
];

const certifications = [
  {
    title: "IIT Bombay AI Workshop",
    issuer: "IIT Bombay",
    icon: "🤖",
    color: "#a855f7",
    link: "https://drive.google.com/file/d/16SP0n3J4D34gL8y5M6iQ1trFwYpoYkwS/view",
  },
  {
    title: "IIT Madras Foundation Certificate",
    issuer: "IIT Madras",
    icon: "📜",
    color: "#06b6d4",
    link: "https://drive.google.com/file/d/1q1RajgjYnMVjNpKzLSYAlEghSJQmpsvB/view",
  },
];

export default function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="education" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(168,85,247,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-purple-500" />
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
              Background
            </span>
            <div className="h-px w-8 bg-purple-500" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-white">Education & </span>
            <span className="neon-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-blue-500/20 to-transparent" />

              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.12, duration: 0.7 }}
                    className="relative flex gap-5"
                  >
                    {/* Timeline dot */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-base z-10 relative"
                        style={{
                          background: `${edu.color}15`,
                          border: `1px solid ${edu.color}30`,
                        }}
                      >
                        {edu.icon}
                      </div>
                      {edu.current && (
                        <div
                          className="absolute inset-0 rounded-xl animate-ping"
                          style={{ background: `${edu.color}10` }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className="glass rounded-2xl p-5 flex-1 transition-all duration-300 hover:border-opacity-50"
                      style={{ border: `1px solid ${edu.color}15` }}
                    >
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="font-bold text-white text-sm mb-0.5">
                            {edu.degree}
                          </h3>
                          <div
                            className="text-xs font-semibold"
                            style={{ color: edu.color }}
                          >
                            {edu.institution}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {edu.current && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-mono"
                              style={{
                                background: `${edu.color}15`,
                                color: edu.color,
                                border: `1px solid ${edu.color}30`,
                              }}
                            >
                              Current
                            </span>
                          )}
                          <span className="text-xs text-slate-600 font-mono">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-500 text-xs mt-2">{edu.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h3
                className="text-lg font-bold text-white mb-5"
                style={{ fontFamily: "'Space Grotesk'" }}
              >
                Certifications
              </h3>

              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.a
                    key={cert.title}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className="block glass rounded-2xl p-5 transition-all duration-300 group"
                    style={{ border: `1px solid ${cert.color}15` }}
                    whileHover={{
                      borderColor: cert.color + "40",
                      boxShadow: `0 0 20px ${cert.color}10`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: `${cert.color}15` }}
                      >
                        {cert.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-semibold group-hover:text-opacity-90">
                          {cert.title}
                        </div>
                        <div className="text-slate-600 text-xs mt-0.5">{cert.issuer}</div>
                      </div>
                      <svg
                        className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Achievement badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="mt-6 glass rounded-2xl p-5 text-center"
                style={{ border: "1px solid rgba(168,85,247,0.15)" }}
              >
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-white font-bold text-sm">CGPA 9.0</div>
                <div className="text-slate-600 text-xs mt-1">IIT Madras · Top Performer</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
