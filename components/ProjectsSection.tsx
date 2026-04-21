"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "grocery-shop",
    title: "Grocery Shop App",
    tagline: "Full-stack grocery platform with SSR",
    tech: ["Flask", "Jinja2", "Bootstrap", "SQLite", "Python"],
    color: "#a855f7",
    icon: "🛒",
    description:
      "Built a full-stack grocery platform with server-side rendering using Flask and Jinja2. Designed modular backend architecture with environment-based configuration and implemented product listing and user interaction workflows.",
    highlights: [
      "Server-side rendering with Jinja2 templates",
      "Modular Flask blueprint architecture",
      "Environment-based configuration system",
      "Product listing & cart workflows",
      "SQLite database with structured models",
    ],
    github: "https://github.com/kramit1116/REPOSITORY",
  },
  {
    id: "hospital-mgmt",
    title: "Hospital Management System",
    tagline: "Role-based medical platform",
    tech: ["Flask", "Jinja2", "Bootstrap", "SQLite", "Python"],
    color: "#3b82f6",
    icon: "🏥",
    description:
      "Developed a role-based system for admin, doctor, and patients. Implemented appointment scheduling and medical record handling while ensuring data integrity with structured database models.",
    highlights: [
      "Three-tier role-based access control",
      "Appointment scheduling system",
      "Medical records management",
      "Structured SQLite database models",
      "Secure session-based authentication",
    ],
    github: "https://github.com/24f1000489/hospital-management-system",
  },
  {
    id: "placement-portal",
    title: "Placement Portal",
    tagline: "Multi-role recruitment platform",
    tech: ["Flask", "Jinja2", "Bootstrap", "SQLite", "Python"],
    color: "#06b6d4",
    icon: "💼",
    description:
      "Multi-role system for Admin, Company, and Students. Designed workflows for job postings, applications, and user management with a scalable modular backend structure.",
    highlights: [
      "Admin, Company & Student roles",
      "Job posting & application workflows",
      "User management dashboard",
      "Scalable modular backend",
      "Complete application lifecycle",
    ],
    github: "https://github.com/24f1000489/Placement-Portal",
  },
];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  onOpen: (p: (typeof projects)[0]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
      onClick={() => onOpen(project)}
      className="project-card cursor-pointer glass rounded-3xl p-8 relative overflow-hidden group"
      style={{
        border: `1px solid ${project.color}20`,
      }}
      whileHover={{
        borderColor: `${project.color}50`,
        boxShadow: `0 20px 60px ${project.color}15, 0 0 0 1px ${project.color}30`,
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top left, ${project.color}08 0%, transparent 60%)`,
        }}
      />

      {/* Icon + Number */}
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
        >
          {project.icon}
        </div>
        <span className="font-mono text-5xl font-black opacity-10 leading-none">
          0{index + 1}
        </span>
      </div>

      {/* Content */}
      <h3
        className="text-xl font-bold text-white mb-2"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {project.title}
      </h3>
      <p className="text-slate-500 text-sm mb-5 leading-relaxed">{project.tagline}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{
              background: `${project.color}12`,
              border: `1px solid ${project.color}25`,
              color: project.color,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div className="flex items-center gap-2 text-slate-600 group-hover:text-white transition-colors duration-300 text-sm font-medium">
        <span>View details</span>
        <motion.span
          className="inline-block"
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(3,7,18,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="glass rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        style={{ border: `1px solid ${project.color}30` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk'" }}>
                {project.title}
              </h3>
              <p className="text-slate-500 text-sm">{project.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-white transition-colors p-2"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-400 leading-relaxed mb-6 text-sm">{project.description}</p>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
            Key Features
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 text-slate-300 text-sm"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: project.color }}
                />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech */}
        <div className="mb-6">
          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1.5 rounded-full"
                style={{
                  background: `${project.color}12`,
                  border: `1px solid ${project.color}30`,
                  color: project.color,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${project.color}30, ${project.color}15)`,
            border: `1px solid ${project.color}40`,
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View on GitHub
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section ref={ref} id="projects" className="relative py-32 px-6 overflow-hidden">
        {/* Section bg */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)" }}
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
                Featured Work
              </span>
              <div className="h-px w-8 bg-purple-500" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-black"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-white">Selected </span>
              <span className="neon-text">Projects</span>
            </h2>
            <p className="text-slate-500 mt-3 text-base max-w-lg mx-auto">
              Full-stack applications built with Python & Flask — click any card for details.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
