import { knowledgeBase } from "./knowledgeBase";

export interface BotResponse {
  text: string;
  type: "normal" | "list" | "links";
  items?: string[];
  links?: { label: string; url: string }[];
}

function matchKeywords(input: string, keywords: string[]): boolean {
  const lower = input.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

export function generateResponse(userInput: string): BotResponse {
  const input = userInput.toLowerCase().trim();

  // Greeting
  if (matchKeywords(input, ["hi", "hello", "hey", "howdy", "sup", "yo"])) {
    return {
      type: "normal",
      text: `Hi! I'm Amit's portfolio assistant 🤖 I can tell you about his projects, skills, education, and more. What would you like to know?`,
    };
  }

  // Name / Who is Amit
  if (
    matchKeywords(input, ["who is", "who are you", "about amit", "tell me about", "introduce"])
  ) {
    return {
      type: "normal",
      text: `${knowledgeBase.name} is a developer & AI enthusiast. ${knowledgeBase.about}`,
    };
  }

  // Projects
  if (matchKeywords(input, ["project", "built", "created", "made", "work", "portfolio"])) {
    return {
      type: "list",
      text: "Amit has built these full-stack projects:",
      items: knowledgeBase.projects.map(
        (p) => `🔹 ${p.title} — ${p.tech.slice(0, 3).join(", ")}`
      ),
    };
  }

  // Specific project
  if (matchKeywords(input, ["grocery", "shop", "store"])) {
    const p = knowledgeBase.projects[0];
    return {
      type: "normal",
      text: `**${p.title}**: ${p.description} Tech: ${p.tech.join(", ")}.`,
    };
  }

  if (matchKeywords(input, ["hospital", "medical", "doctor", "patient"])) {
    const p = knowledgeBase.projects[1];
    return {
      type: "normal",
      text: `**${p.title}**: ${p.description} Tech: ${p.tech.join(", ")}.`,
    };
  }

  if (matchKeywords(input, ["placement", "portal", "job", "company", "student"])) {
    const p = knowledgeBase.projects[2];
    return {
      type: "normal",
      text: `**${p.title}**: ${p.description} Tech: ${p.tech.join(", ")}.`,
    };
  }

  // Skills
  if (matchKeywords(input, ["skill", "tech", "technology", "know", "expertise", "tools", "stack"])) {
    return {
      type: "list",
      text: "Here's what Amit works with:",
      items: knowledgeBase.skills.map(
        (cat) => `${cat.category}: ${cat.skills.slice(0, 5).join(", ")}`
      ),
    };
  }

  // AI / ML
  if (matchKeywords(input, ["ai", "machine learning", "deep learning", "pytorch", "ml", "neural", "computer vision"])) {
    const aiSkills = knowledgeBase.skills.find((s) => s.category === "AI / Data Science");
    return {
      type: "normal",
      text: `Amit is passionate about AI/ML! He's skilled in: ${aiSkills?.skills.join(", ")}. He has hands-on experience with CNNs, GANs, and computer vision.`,
    };
  }

  // Python / Programming
  if (matchKeywords(input, ["python", "flask", "programming", "language"])) {
    return {
      type: "normal",
      text: `Python is Amit's primary language. He uses it for ML/AI, Flask web apps, scripting, and data science. He's also proficient in Java and Bash.`,
    };
  }

  // Education
  if (
    matchKeywords(input, ["education", "study", "college", "university", "degree", "iit", "qualify", "academics", "cgpa", "gpa"])
  ) {
    return {
      type: "list",
      text: "Amit's educational background:",
      items: knowledgeBase.education.map(
        (e) => `🎓 ${e.degree} — ${e.institution} (${e.period})${e.detail ? " · " + e.detail : ""}`
      ),
    };
  }

  // IIT Madras
  if (matchKeywords(input, ["iit", "madras", "data science", "diploma"])) {
    const iit = knowledgeBase.education[0];
    return {
      type: "normal",
      text: `Amit is currently pursuing ${iit.degree} at ${iit.institution} (${iit.period}). ${iit.detail}. It's India's premier online degree program in data science.`,
    };
  }

  // Certifications
  if (matchKeywords(input, ["certificate", "certification", "workshop", "award"])) {
    return {
      type: "list",
      text: "Amit's certifications:",
      items: knowledgeBase.certifications.map((c) => `📜 ${c.title} — ${c.issuer}`),
    };
  }

  // Contact / GitHub / LinkedIn
  if (matchKeywords(input, ["contact", "reach", "connect", "email", "github", "linkedin", "social"])) {
    return {
      type: "links",
      text: "You can connect with Amit here:",
      links: [
        { label: "GitHub (Main)", url: knowledgeBase.contact.github[0] },
        { label: "GitHub (IIT ID)", url: knowledgeBase.contact.github[1] },
        { label: "LinkedIn", url: knowledgeBase.contact.linkedin },
      ],
    };
  }

  // Availability
  if (matchKeywords(input, ["available", "hire", "job", "intern", "opportunity", "open to"])) {
    return {
      type: "normal",
      text: `Yes! Amit is currently open to opportunities in AI/ML engineering, full-stack development, and data science roles. Feel free to connect via LinkedIn or GitHub! 🚀`,
    };
  }

  // Tagline
  if (matchKeywords(input, ["tagline", "motto", "mantra", "vision"])) {
    return {
      type: "normal",
      text: `Amit's motto: "${knowledgeBase.tagline}"`,
    };
  }

  // Help
  if (matchKeywords(input, ["help", "what can", "question", "ask"])) {
    return {
      type: "list",
      text: "Here are things you can ask me:",
      items: [
        "👤 Who is Amit / About him",
        "💼 What projects has he built?",
        "🧠 What are his skills?",
        "🎓 Tell me about his education",
        "📜 Certifications",
        "🔗 How to contact him?",
        "💡 Is he available for hire?",
      ],
    };
  }

  // Thanks
  if (matchKeywords(input, ["thank", "thanks", "thx", "appreciate"])) {
    return {
      type: "normal",
      text: `You're welcome! Feel free to ask anything else about Amit's work or background. 😊`,
    };
  }

  // Fallback
  return {
    type: "normal",
    text: `I'm not sure about that, but I can tell you about Amit's projects, skills, education, or how to contact him. Try asking: "What projects has he built?" or "What are his skills?"`,
  };
}
