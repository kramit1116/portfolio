# Amit Kumar Verma — Portfolio Website

> Awwwards-level interactive portfolio with 3D particles, advanced cursor physics, and an AI chatbot.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-r169-green?logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple)

---

## ✨ Features

- **Fullscreen 3D Particle Hero** — React Three Fiber with mouse-reactive particle field
- **Advanced Cursor System** — Spring physics trailing, velocity-based stretch, glow effects
- **Shader Ripple Distortion** — Canvas-based cursor ripple distortion
- **Smooth Scroll** — Lenis-powered buttery smooth scrolling
- **Project Showcase** — Interactive cards with modals and hover tilt
- **Animated Skills** — Interactive category cards with neon tags
- **Education Timeline** — Animated vertical timeline
- **AI Chatbot** — Floating rule-based chatbot with knowledge base
- **Glassmorphism Design** — Dark neon theme with purple/blue/cyan accents

---

## 🚀 Setup & Run

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## 📦 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

Or use the CLI:

```bash
npx vercel
```

---

## 📁 File Structure

```
├── app/
│   ├── globals.css         # Global styles, neon theme, animations
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page (Lenis init, section assembly)
├── components/
│   ├── canvas/
│   │   ├── ParticleCanvas.tsx   # 3D particle system (Three.js)
│   │   └── RippleCanvas.tsx     # Cursor ripple distortion (Canvas 2D)
│   ├── cursor/
│   │   └── CustomCursor.tsx     # Advanced cursor with spring physics
│   ├── chatbot/
│   │   ├── Chatbot.tsx          # Floating chatbot UI
│   │   ├── knowledgeBase.ts     # Portfolio data + types
│   │   └── responseEngine.ts    # Rule-based AI response logic
│   ├── Navigation.tsx           # Scroll-aware sticky nav
│   ├── HeroSection.tsx          # Fullscreen hero + typewriter
│   ├── AboutSection.tsx         # About + stats + cards
│   ├── ProjectsSection.tsx      # Project cards + modal
│   ├── SkillsSection.tsx        # Interactive skill categories
│   ├── EducationSection.tsx     # Timeline + certifications
│   ├── ContactSection.tsx       # Social links + availability
│   └── Footer.tsx               # Footer
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| 3D Graphics | React Three Fiber + Drei |
| Smooth Scroll | Lenis |
| Fonts | Google Fonts (Inter, Space Grotesk) |

---

## 🤖 Chatbot Queries

The chatbot understands natural language queries like:
- *"What projects has he built?"*
- *"Tell me about his skills"*
- *"What's his education background?"*
- *"Is he available for hire?"*
- *"How can I contact him?"*

---

Made with ❤️ by Amit Kumar Verma
