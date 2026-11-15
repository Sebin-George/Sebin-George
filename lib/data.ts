// All site text. Source: "Sebin george vattappallil.pdf" (pp folder) + the Figma portfolio case studies.

export const PROFILE = {
  name: "Sebin George",
  first: "Sebin",
  role: "UI/UX Designer · Product Designer · Graphic Designer",
  location: "Kochi, Kerala, India",
  email: "sebing403@gmail.com",
  phone: "+91 62352 28079",
  phoneHref: "tel:+916235228079",
  linkedin: "https://www.linkedin.com/in/sebingeorgevattappallil/",
  github: "https://github.com/Sebin-George",
  behance: "https://behance.net/sebingeorge1",
  behanceProfile: "https://www.behance.net/sebingeorge1",
  resume: "/Sebin-George-Resume.pdf",
  summary:
    "Creative UI/UX and product designer with 2+ years of experience designing websites, web applications, SaaS dashboards, mobile apps, e-commerce platforms, Chrome extensions and landing pages. Skilled in user-centered design, wireframing, prototyping, design systems and visual design with Figma and Adobe Photoshop, with a strong understanding of HTML, CSS and responsive, mobile-first design.",
};

export const STATS = [
  { value: 2, suffix: "+", label: "Years of experience" },
  { value: 4, suffix: "", label: "Companies & clients" },
  { value: 4, suffix: "", label: "Selected case studies" },
];

export const TOOLS = [
  { name: "Figma", logo: "figma" },
  { name: "Photoshop", logo: "ps" },
  { name: "Illustrator", logo: "ai" },
  { name: "Adobe XD", logo: "xd" },
  { name: "HTML5", logo: "html5" },
  { name: "CSS3", logo: "css3" },
  { name: "Bootstrap", logo: "bootstrap" },
  { name: "JavaScript", logo: "js" },
  { name: "jQuery", logo: "jquery" },
];

export const SKILL_GROUPS = [
  { title: "Design tools", items: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD", "Framer", "FigJam", "Prototyping tools"] },
  { title: "UX design", items: ["User-centered design", "User research", "Requirement analysis", "Information architecture", "User flows", "Wireframing", "Prototyping", "Usability testing", "User journey mapping", "Competitive analysis", "UX case studies"] },
  { title: "UI design", items: ["High-fidelity UI", "Design systems", "Component libraries", "Interaction design", "Dashboard design", "Mobile app design", "Web app design", "Design handoff"] },
  { title: "Visual & creative", items: ["Visual design", "Visual hierarchy", "Graphic design", "Branding", "Brand identity", "Typography", "Color theory", "Marketing creatives"] },
  { title: "Responsive web", items: ["Mobile-first design", "Responsive layouts", "Cross-device design", "HTML", "CSS", "Bootstrap", "JavaScript", "jQuery"] },
  { title: "Product & collaboration", items: ["SaaS", "B2B products", "E-commerce", "Chrome extensions", "Agile collaboration", "Stakeholder communication", "Cross-functional teamwork", "Client communication"] },
];

export type Project = {
  title: string;
  kind: string;
  role: string;
  year: string;
  tags: string[];
  desc: string;
  points: string[];
  image: string;
  href?: string;
  hrefLabel?: string;
  landscape?: boolean;
  w?: number;
  h?: number;
};

export const PROJECTS: Project[] = [
  {
    title: "VELTRIX",
    kind: "Sneaker e-commerce · mobile app + web dashboard",
    role: "UI/UX Designer",
    year: "Behance case study",
    tags: ["Figma", "E-commerce", "Mobile app", "Web dashboard"],
    desc: "A premium e-commerce platform for discovering, buying and experiencing sneakers, designed as a mobile app with a companion web dashboard.",
    points: ["Product discovery and collections", "Product pages built around the sneaker", "A clear, confident checkout flow"],
    image: "/project-images/veltrix.webp",
    w: 1100,
    h: 1375,
    href: "https://www.behance.net/gallery/258295895/VELTRIX-Sneaker-E-commerce-UIUX-Design-Case-Study",
    hrefLabel: "Read the case study on Behance",
  },
  {
    title: "Healthcare Platform",
    kind: "MediFlow · patient app + provider dashboard",
    role: "UI/UX Designer",
    year: "Behance case study",
    tags: ["Figma", "Healthcare", "UI/UX design", "Branding"],
    desc: "MediFlow is a digital healthcare platform that connects patients and healthcare professionals through one integrated ecosystem, designed end to end from user flows and wireframes to high-fidelity interfaces.",
    points: ["Patient app: find trusted doctors, book appointments, manage prescriptions and records", "Provider dashboard: appointments, patient records, prescriptions, billing and clinical performance"],
    image: "/project-images/healthcare.webp",
    w: 1100,
    h: 1443,
    href: "https://www.behance.net/gallery/257678945/Healthcare-Platform-UIUX-Design-Case-Study",
    hrefLabel: "Read the case study on Behance",
  },
  {
    title: "KrishiMate",
    kind: "Smart farming · mobile app",
    role: "UI/UX Designer",
    year: "Behance case study",
    tags: ["Figma", "Mobile app", "User research"],
    desc: "A mobile app UI/UX case study for farmers, from user research and flows to high-fidelity screens: an AI crop doctor, weather alerts and market insights in one place.",
    points: ["AI Crop Doctor to detect plant diseases and get recommendations", "Weather alerts and market insights", "High-fidelity onboarding and home screens"],
    image: "/project-images/krishimate.webp",
    w: 1400,
    h: 996,
    landscape: true,
    href: "https://www.behance.net/gallery/257609623/KrishiMate-UIUX-Case-Study-Mobile-App",
    hrefLabel: "Read the case study on Behance",
  },
  {
    title: "NEW WAY",
    kind: "Fashion brand identity & apparel design",
    role: "Brand & graphic designer",
    year: "2026",
    tags: ["Branding", "Brand identity", "Apparel design", "Photoshop"],
    desc: "NEW WAY is a contemporary streetwear brand built around individuality, simplicity and self-expression: a bold logo, apparel and campaign visuals under the line \"Find your own way\".",
    points: ["Logo and brand identity", "Apparel and campaign visuals", "Consistent, confident visual language"],
    image: "/project-images/newway.webp",
    w: 1400,
    h: 788,
    landscape: true,
    href: "https://www.behance.net/gallery/256923075/NEW-WAY-Fashion-Brand-Identity-Apparel-Design",
    hrefLabel: "Read the case study on Behance",
  },
];

export type Job = {
  when: string;
  role: string;
  org: string;
  place: string;
  type: string;
  now?: boolean;
  points: string[];
};

export const JOBS: Job[] = [
  {
    when: "Jan 2026 — Present",
    role: "UI/UX Designer",
    org: "Freelance",
    place: "Kochi, India",
    type: "Freelance",
    now: true,
    points: [
      "Design attractive, user-friendly websites, web apps, mobile apps, SaaS products and landing pages for clients.",
      "Convert business requirements into user flows, wireframes, high-fidelity interfaces and responsive prototypes in Figma.",
      "Create visual systems, marketing creatives and digital campaign assets using Figma and Adobe Photoshop.",
      "Build and refine designs with HTML and CSS knowledge to keep layouts practical and developer-friendly.",
      "Use AI tools such as ChatGPT, Codex and Antigravity to accelerate research, content and design workflows.",
      "Work directly with clients to iterate designs based on feedback, usability and business goals.",
    ],
  },
  {
    when: "Mar 2025 — Jan 2026",
    role: "Solution Designer, UI/UX",
    org: "Techrish Solutions",
    place: "Kochi, India",
    type: "Full-time",
    points: [
      "Designed SaaS dashboards, web applications and digital product experiences focused on usability and modern UI standards.",
      "Created user flows, wireframes, high-fidelity UI, responsive layouts, prototypes and reusable components in Figma.",
      "Worked closely with developers and stakeholders to clarify requirements and support accurate implementation.",
      "Contributed to design systems and consistent interaction patterns across product interfaces.",
    ],
  },
  {
    when: "Feb 2024 — Feb 2025",
    role: "UI/UX Designer",
    org: "GS Tech Technologies",
    place: "Bangalore, India",
    type: "Full-time",
    points: [
      "Designed SaaS dashboards and Chrome extensions for the Flonnect and AdSpyder products.",
      "Improved product flows through wireframing, visual design, prototyping and component-based UI systems.",
      "Designed browser extension interfaces including recorder, downloader, highlighter, bookmarker and utility workflows.",
      "Collaborated with product and development teams to refine requirements and deliver implementation-ready designs.",
    ],
  },
  {
    when: "Nov 2022 — Jan 2023",
    role: "UI Developer Intern",
    org: "Zoople Technologies",
    place: "Kochi, India",
    type: "Internship",
    points: [
      "Built front-end interfaces using HTML, CSS, Bootstrap, JavaScript and jQuery.",
      "Supported responsive interface development and learned practical UI development workflows.",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "St. George's College, Aruvithura",
  years: "2019 — 2022",
  certs: ["UI Development Certificate, Zoople Technologies, Kochi", "UI/UX Designing, Avodha / Techminds, Infopark Kochi"],
};

export const LANGUAGES = [
  { name: "English", level: "Professional" },
  { name: "Malayalam", level: "Native" },
  { name: "Hindi", level: "Working" },
  { name: "Tamil", level: "Working" },
];
