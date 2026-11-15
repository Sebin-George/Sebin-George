# Sebin George — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![Figma](https://img.shields.io/badge/Design-Figma-F24E1E?style=for-the-badge&logo=figma)](https://www.figma.com/)

A modern, high-performance portfolio website built for **Sebin George** — UI/UX Designer, Product Designer, and Graphic Designer based in Kochi, Kerala, India.

Designed with an editorial aesthetic, smooth micro-interactions, responsive mobile-first typography, and lightweight scroll animations.

---

## ✨ Features & Highlights

- **Dynamic Hero Section**: Availability status badge, animated count-up metrics, and quick CTA links for work and resume download.
- **Curated Case Studies & Work Showcase**:
  - **VELTRIX**: Sneaker e-commerce mobile app & web dashboard.
  - **MediFlow (Healthcare Platform)**: Integrated patient app and provider dashboard.
  - **KrishiMate**: Smart farming mobile app with AI crop diagnostics.
  - **NEW WAY**: Streetwear brand identity, typography, and apparel design.
- **Experience Timeline**: Career history spanning freelance work, SaaS dashboards at Techrish Solutions, browser extensions at GS Tech Technologies, and early front-end engineering.
- **Categorized Skills Matrix**: Interactive filterable views across Design Tools, UX Design, UI Design, Visual & Branding, Responsive Web, and Product Strategy.
- **Custom Motion Engine**:
  - Zero-bloat, unified `requestAnimationFrame` scroll runner.
  - Bi-directional viewport reveals powered by `IntersectionObserver`.
  - Count-up statistics and card micro-tilt effects.
  - Top scroll-progress indicator.
- **Ambient Canvas Visuals**: Subtle generative particle/ambient background effects.
- **Optimized Typography & SEO**: Preloaded web fonts (*Inter* & *Instrument Serif*), theme color support, and complete metadata.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Frontend Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animations**: [GSAP](https://greensock.com/) & Native Web Animation APIs
- **Styling**: Modern CSS3 (Custom Design System, CSS Variables, Responsive Grids)
- **Design & Assets**: Figma, Adobe Photoshop, Adobe Illustrator

---

## 📁 Project Structure

```text
sebin_portfolio/
├── app/
│   ├── layout.tsx         # Root layout with font preloads & metadata
│   ├── page.tsx           # Main single-page portfolio layout
│   ├── globals.css        # Global styles & design system tokens
│   └── ambient.css        # Ambient visual background styles
├── components/
│   ├── SceneBackground.tsx# Visual background canvas component
│   └── v3/
│       ├── Hero.tsx       # Hero section & introductory stats
│       ├── HeroTitle.tsx  # Interactive stylized hero headline
│       ├── Marquee.tsx    # Endless ribbon / ticker
│       ├── Work.tsx       # Featured projects & case studies showcase
│       ├── WorkScroll.tsx # Work section scroll mechanics
│       ├── About.tsx      # Biography & design philosophy
│       ├── Experience.tsx # Career history timeline
│       ├── Skills.tsx     # Categorized skills matrix & stack dots
│       ├── SkillsLazy.tsx # Client-lazy-loaded skills module
│       ├── Motion.tsx     # Unified scroll & reveal observer
│       ├── Ambient.tsx    # Ambient lighting effect
│       ├── Contact.tsx    # Contact information & social links
│       ├── Nav.tsx        # Responsive navigation header
│       └── Statement.tsx  # Closing design statement
├── lib/
│   └── data.ts            # Centralized content store (Profile, Jobs, Projects, Skills)
├── public/
│   ├── assets/            # Fonts, icons, and branding media
│   └── project-images/    # Optimized case study thumbnails & banners
├── next.config.mjs        # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and project scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or later recommended) and `npm` installed.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Sebin-George/sebin_portfolio.git
cd sebin_portfolio
npm install
```

### 3. Running in Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Building for Production

Create an optimized production build:

```bash
npm run build
npm run start
```

---

## ✏️ Customization & Updating Content

All personal data, projects, work experience, and copy are cleanly decoupled in:

```typescript
// Located at: lib/data.ts
export const PROFILE = { ... };
export const STATS = [ ... ];
export const PROJECTS = [ ... ];
export const JOBS = [ ... ];
export const SKILL_GROUPS = [ ... ];
```

To update your portfolio:
1. Edit [`lib/data.ts`](file:///d:/My%20Portfolio/sebin_portfolio/lib/data.ts) to update text, social links, resume URL, or case studies.
2. Add new project previews into `public/project-images/`.
3. Place updated resume files in `public/`.

---

## 📬 Contact & Connect

- **Name**: Sebin George
- **Location**: Kochi, Kerala, India
- **Email**: [sebing403@gmail.com](mailto:sebing403@gmail.com)
- **LinkedIn**: [linkedin.com/in/sebingeorgevattappallil](https://www.linkedin.com/in/sebingeorgevattappallil/)
- **Behance**: [behance.net/sebingeorge1](https://behance.net/sebingeorge1)
- **GitHub**: [github.com/Sebin-George](https://github.com/Sebin-George)

---

## 📄 License

This project is created for personal portfolio presentation. All rights reserved &copy; 2026 Sebin George.
