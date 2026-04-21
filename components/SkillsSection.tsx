"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    name: "AI / Data Science",
    color: "#a855f7",
    icon: "🧠",
    skills: [
      "PyTorch",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "CNN",
      "GAN",
      "NumPy",
      "Pandas",
      "Scikit-learn",
    ],
  },
  {
    name: "Web Development",
    color: "#3b82f6",
    icon: "🌐",
    skills: [
      "Flask",
      "Vue.js",
      "MERN Stack",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "REST APIs",
      "Jinja2",
    ],
  },
  {
    name: "Programming",
    color: "#06b6d4",
    icon: "💻",
    skills: ["Python", "Java", "Bash", "TypeScript", "SQL"],
  },
  {
    name: "Tools & DevOps",
    color: "#10b981",
    icon: "⚙️",
    skills: [
      "Git",
      "Redis",
      "PostgreSQL",
      "SQLite",
      "VS Code",
      "Vercel",
      "Vim",
      "Neovim",
      "Nano",
      "Linux",
    ],
  },
];

function SkillTag({
  skill,
  color,
  index,
}: {
  skill: string;
  color: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-300"
      style={{
        background: hovered ? `${color}25` : `${color}10`,
        border: `1px solid ${hovered ? color + "60" : color + "20"}`,
        color: hovered ? color : color + "99",
        boxShadow: hovered ? `0 0 12px ${color}30` : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {skill}
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section ref={ref} id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* Section bg glow */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
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
            <div className="h-px w-8 bg-blue-500" />
            <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
              Expertise
            </span>
            <div className="h-px w-8 bg-blue-500" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-white">Technical </span>
            <span className="neon-text">Skills</span>
          </h2>
          <p className="text-slate-500 mt-3 text-base max-w-lg mx-auto">
            Hover over categories to explore — click a category to highlight it.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIndex) => {
            const isActive = activeCategory === catIndex;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                onClick={() =>
                  setActiveCategory(isActive ? null : catIndex)
                }
                className="glass rounded-3xl p-7 cursor-pointer transition-all duration-300 group"
                style={{
                  border: `1px solid ${isActive ? cat.color + "50" : cat.color + "15"}`,
                  boxShadow: isActive ? `0 0 40px ${cat.color}10` : "none",
                }}
                whileHover={{
                  borderColor: cat.color + "40",
                  boxShadow: `0 0 30px ${cat.color}08`,
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300"
                    style={{
                      background: isActive ? `${cat.color}25` : `${cat.color}10`,
                      border: `1px solid ${cat.color}20`,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3
                      className="font-bold text-white text-base"
                      style={{ fontFamily: "'Space Grotesk'" }}
                    >
                      {cat.name}
                    </h3>
                    <div className="text-xs text-slate-600 font-mono mt-0.5">
                      {cat.skills.length} skills
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        background: isActive ? cat.color : cat.color + "40",
                        boxShadow: isActive ? `0 0 8px ${cat.color}` : "none",
                      }}
                    />
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <SkillTag
                      key={skill}
                      skill={skill}
                      color={cat.color}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 glass rounded-2xl p-5 text-center"
        >
          <p className="text-slate-600 text-sm font-mono">
            💡 Currently exploring{" "}
            <span className="text-purple-400">Transformers</span>,{" "}
            <span className="text-blue-400">Next.js</span>, and{" "}
            <span className="text-cyan-400">Computer Vision</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
