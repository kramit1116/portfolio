export interface KnowledgeBase {
  name: string;
  tagline: string;
  about: string;
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  contact: Contact;
  certifications: Certification[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  detail?: string;
}

export interface Project {
  title: string;
  tech: string[];
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Contact {
  github: string[];
  linkedin: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

export const knowledgeBase: KnowledgeBase = {
  name: "Amit Kumar Verma",
  tagline: "Building intelligent systems and immersive web experiences",
  about:
    "BSc Physics graduate pursuing BS in Data Science and Applications from IIT Madras (Diploma Level, CGPA: 9). Strong foundation in AI, machine learning, and full-stack development. Experienced in scalable Flask-based applications, deep learning, and computer vision.",
  education: [
    {
      degree: "BS Data Science & Applications",
      institution: "IIT Madras",
      period: "2024–Present",
      detail: "Diploma Level, CGPA: 9.0/10",
    },
    {
      degree: "BSc Physics (Hons)",
      institution: "Magadh University",
      period: "2021–2024",
    },
    {
      degree: "Senior Secondary (PCM)",
      institution: "CBSE Board",
      period: "2021",
      detail: "85.8%",
    },
    {
      degree: "Secondary",
      institution: "CBSE Board",
      period: "2019",
      detail: "88.6%",
    },
  ],
  projects: [
    {
      title: "Grocery Shop App",
      tech: ["Flask", "Jinja2", "Bootstrap", "SQLite", "Python"],
      description:
        "Full-stack grocery platform with server-side rendering, modular backend architecture, and product listing workflows.",
    },
    {
      title: "Hospital Management System",
      tech: ["Flask", "Jinja2", "Bootstrap", "SQLite", "Python"],
      description:
        "Role-based system for admin, doctor, and patients with appointment scheduling and medical records.",
    },
    {
      title: "Placement Portal",
      tech: ["Flask", "Jinja2", "Bootstrap", "SQLite", "Python"],
      description:
        "Multi-role system (Admin, Company, Student) with job postings, applications, and user management.",
    },
  ],
  skills: [
    {
      category: "AI / Data Science",
      skills: ["PyTorch", "Machine Learning", "Deep Learning", "Computer Vision", "CNN", "GAN"],
    },
    {
      category: "Web Development",
      skills: ["Flask", "Vue.js", "MERN Stack", "HTML", "CSS", "JavaScript", "Bootstrap"],
    },
    {
      category: "Programming",
      skills: ["Python", "Java", "Bash"],
    },
    {
      category: "Tools",
      skills: ["Git", "Redis", "PostgreSQL", "SQLite", "VS Code", "Vercel", "Vim"],
    },
  ],
  contact: {
    github: ["https://github.com/kramit1116", "https://github.com/24f1000489"],
    linkedin: "https://www.linkedin.com/in/amit-kumar-a34511273/",
  },
  certifications: [
    { title: "IIT Bombay AI Workshop", issuer: "IIT Bombay" },
    { title: "IIT Madras Foundation Certificate", issuer: "IIT Madras" },
  ],
};
