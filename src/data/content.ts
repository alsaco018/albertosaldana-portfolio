export type NavItem = {
  id: string;
  label: string;
};

export type Project = {
  id: string;
  name: string;
  url?: string;
  role: string;
  summary: string;
  tags: string[];
};

export type Study = {
  id: string;
  title: string;
  place: string;
  detail: string;
  highlight?: string;
  level: number;
};

export type PersonalityStat = {
  id: string;
  label: string;
  value: number;
  lore: string;
};

export const site = {
  name: "Alberto Saldaña Contreras",
  shortName: "Alberto Saldaña",
  role: "Computer Engineer · Frontend Lead",
  tagline:
    "I design and build calm, precise web experiences with personality — React, Drupal, and a touch of AI magic.",
  company: "1xINTERNET",
  companySince: "2020",
  linkedin:
    "https://www.linkedin.com/in/alberto-saldaña-contreras-674b63149/",
  portrait: "/images/alberto-portrait-rose.jpg",
};

export const navItems: NavItem[] = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "tech", label: "Tech" },
  { id: "about", label: "About" },
  { id: "studies", label: "Studies" },
  { id: "loves", label: "Loves" },
];

export const projects: Project[] = [
  {
    id: "transgourmet",
    name: "Transgourmet.de & ecosystem",
    url: "https://www.transgourmet.de",
    role: "Frontend Lead",
    summary:
      "Frontend leadership across the Transgourmet ecosystem in Germany, Poland, and Romania: UI architecture, component standards, and continuous delivery for a high-traffic foodservice product.",
    tags: ["React", "Drupal", "Design systems", "Lead"],
  },
  {
    id: "bsb",
    name: "BSB.de",
    url: "https://www.bsb.de",
    role: "Senior Frontend",
    summary:
      "React app for buying boat tickets: clear booking flows, accessible UI, and solid performance on a high-traffic product. I also built the site's design system and a B2B app on Drupal.",
    tags: ["Drupal", "React", "Design systems", "Accessibility"],
  },
  {
    id: "scout",
    name: "scout.org",
    url: "https://www.scout.org",
    role: "Senior Frontend",
    summary:
      "Worked on the redesign of scout.org: defining the new design system and integrating it with the Drupal site for a global scout community experience — storytelling, i18n, and a maintainable frontend at scale.",
    tags: ["Drupal", "Design systems", "Storytelling", "i18n"],
  },
  {
    id: "eldumrett",
    name: "eldumrett.is",
    url: "https://eldumrett.is",
    role: "Senior Frontend",
    summary:
      "A site with strong identity and typographic detail: micro-interactions, editorial layout, and close collaboration with design.",
    tags: ["React", "Motion", "Craft"],
  },
  {
    id: "figma2code",
    name: "Figma2Code AI skill",
    role: "Chief maintainer",
    summary:
      "Lead maintainer of the Figma2Code skill at 1xINTERNET: bridging design and AI-assisted code to accelerate frontend handoff.",
    tags: ["AI", "Figma", "DX", "Internal tools"],
  },
];

export type Technology = {
  id: string;
  label: string;
};

export const technologies: Technology[] = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "ts", label: "TypeScript" },
  { id: "js", label: "JavaScript" },
  { id: "react", label: "React" },
  { id: "tailwind", label: "Tailwind" },
  { id: "git", label: "Git" },
  { id: "astro", label: "Astro" },
  { id: "playwright", label: "Playwright" },
  { id: "ai", label: "AI Development" },
  { id: "rn", label: "React Native" },
  { id: "drupal", label: "Drupal" },
];

export const aboutParagraphs = [
  "I'm a Computer Engineer specialized in Information Technologies. Since 2020 I've been at 1xINTERNET as a Senior React & Drupal Frontend Developer, and I lead frontend on products like the Transgourmet ecosystem.",
  "I like working with current technologies, integrating Artificial Intelligence into my workflow to achieve high-quality and efficient results. I value teamwork, communication, and collaboration with diverse profiles in my work environment to build effective, scalable, and maintainable solutions.",
  "I consider myself a responsible, hardworking, resourceful, curious, and modest person who knows how to work with and lead teams, as I have been a team and group chief for several years in my scout group. Currently, I also perform Tech Lead duties in my current role, making decisions about the implementation of the solutions developed. I also provide mentoring within the company, helping junior and intern developers reach their full potential and acquire the necessary knowledge to perform their job duties successfully.",
];

export const personalityStats: PersonalityStat[] = [
  {
    id: "collab",
    label: "Collaboration",
    value: 95,
    lore: "I value teamwork, communication, and collaboration with diverse profiles to build scalable, maintainable solutions.",
  },
  {
    id: "resolve",
    label: "Problem-solving",
    value: 93,
    lore: "Responsible, hardworking, and resourceful — I dig into problems until we have an effective answer.",
  },
  {
    id: "commitment",
    label: "Commitment",
    value: 91,
    lore: "I show up with responsibility and consistency — from years as a scout team and group chief to Tech Lead duties today.",
  },
  {
    id: "techlead",
    label: "Tech Lead",
    value: 90,
    lore: "I perform Tech Lead duties in my current role, making decisions about how solutions are implemented.",
  },
  {
    id: "curiosity",
    label: "Curiosity / AI",
    value: 88,
    lore: "I work with current technologies and integrate AI into my workflow for high-quality, efficient results.",
  },
  {
    id: "mentorship",
    label: "Mentorship",
    value: 86,
    lore: "I mentor junior and intern developers so they reach their full potential and perform their duties successfully.",
  },
];

export const studies: Study[] = [
  {
    id: "daw",
    title: "Higher Vocational Diploma — Web App Development",
    place: "CDP José Cabrera, Trebujena",
    detail:
      "Web Application Development — a solid foundation in frontend, backend, and real projects.",
    highlight: "Honors distinction",
    level: 1,
  },
  {
    id: "uoc",
    title: "Computer Engineering",
    place: "Universitat Oberta de Catalunya (UOC)",
    detail:
      "Specialization in Information Technologies: systems, architecture, and digital product vision.",
    highlight: "IT specialization",
    level: 2,
  },
];

export type Interest = {
  id: string;
  title: string;
  detail: string;
  icon: "gamespad" | "film" | "sports" | "music" | "nature";
};

export const interests: Interest[] = [
  {
    id: "games",
    title: "Video games",
    detail:
      "Worlds to explore, stories to finish, and the craft behind great interactive experiences.",
    icon: "gamepad",
  },
  {
    id: "cinema",
    title: "Cinema",
    detail:
      "Films that stick with you — storytelling, framing, and that quiet magic after the credits.",
    icon: "film",
  },
  {
    id: "sports",
    title: "Sports",
    detail:
      "Especially Formula 1 and football: strategy, pace, and the thrill of a great race or match of my local team.",
    icon: "sports",
  },
  {
    id: "music",
    title: "Music",
    detail:
      "Soundtracks for focus, playlists for weekends, and discovering new artists along the way.",
    icon: "music",
  },
  {
    id: "nature",
    title: "Nature & hiking",
    detail:
      "Trails, fresh air, and resetting outdoors — hiking is how I recharge away from the screen.",
    icon: "nature",
  },
];
