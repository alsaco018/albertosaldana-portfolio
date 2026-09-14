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
  role: "Ingeniero Informático · Frontend Lead",
  tagline:
    "Diseño y construyo experiencias web calmadas, precisas y con personalidad — React, Drupal y un toque de magia AI.",
  company: "1xINTERNET",
  companySince: "2020",
  linkedin:
    "https://www.linkedin.com/in/alberto-saldaña-contreras-674b63149/",
};

export const navItems: NavItem[] = [
  { id: "intro", label: "Intro" },
  { id: "trabajo", label: "Mi trabajo" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "estudios", label: "Estudios" },
];

export const projects: Project[] = [
  {
    id: "transgourmet",
    name: "Transgourmet.de & ecosystem",
    url: "https://www.transgourmet.de",
    role: "Frontend Lead",
    summary:
      "Liderazgo frontend en el ecosistema Transgourmet: arquitectura de UI, estándares de componente y entrega continua en un producto foodservice de alto tráfico.",
    tags: ["React", "Drupal", "Design systems", "Lead"],
  },
  {
    id: "bsb",
    name: "BSB.de",
    url: "https://www.bsb.de",
    role: "Senior Frontend",
    summary:
      "Interfaces claras y accesibles para un sitio institucional, con foco en rendimiento, CMS Drupal y componentes reutilizables.",
    tags: ["Drupal", "React", "Accessibility"],
  },
  {
    id: "scout",
    name: "scout.org",
    url: "https://www.scout.org",
    role: "Senior Frontend",
    summary:
      "Experiencia global para la comunidad scout: storytelling visual, i18n y una base frontend mantenible a escala.",
    tags: ["Drupal", "Storytelling", "i18n"],
  },
  {
    id: "eldumrett",
    name: "eldumrett.is",
    url: "https://eldumrett.is",
    role: "Senior Frontend",
    summary:
      "Sitio con identidad fuerte y detalle tipográfico: microinteracciones, layout editorial y colaboración estrecha con diseño.",
    tags: ["React", "Motion", "Craft"],
  },
  {
    id: "figma2code",
    name: "Figma2Code AI skill",
    role: "Chief maintainer",
    summary:
      "Mantenedor principal del skill Figma2Code en 1xINTERNET: bridge entre diseño y código asistido por AI para acelerar handoff frontend.",
    tags: ["AI", "Figma", "DX", "Internal tools"],
  },
];

export const aboutParagraphs = [
  "Soy Ingeniero Informático especializado en Tecnologías de la Información. Desde 2020 formo parte de 1xINTERNET como Senior React & Drupal Frontend Developer, y lidero el frontend en proyectos como el ecosistema Transgourmet.",
  "Me gusta el craft: tipografía cuidada, componentes sólidos y animaciones que aportan presencia sin ruido. También exploro herramientas AI para acortar la distancia entre Figma y producción — de ahí mi rol como chief maintainer de Figma2Code.",
  "Este portfolio es un pequeño juego de personaje: stats, lore y un recorrido en una sola página. Tranquilo, pastel y con movimiento a medida que avanzas.",
];

export const personalityStats: PersonalityStat[] = [
  {
    id: "lead",
    label: "Liderazgo frontend",
    value: 90,
    lore: "Coordino dirección técnica, reviews y estándares sin perder el foco en la UX.",
  },
  {
    id: "craft",
    label: "Craft React/Drupal",
    value: 92,
    lore: "React moderno + Drupal: componentes, theming y arquitectura que aguanta el día a día.",
  },
  {
    id: "collab",
    label: "Colaboración",
    value: 88,
    lore: "Trabajo codo a codo con diseño, backend y stakeholders. Menos silos, más flujo.",
  },
  {
    id: "curiosity",
    label: "Curiosidad / AI tools",
    value: 85,
    lore: "Pruebo, documento y mantengo skills AI que mejoran el handoff diseño→código.",
  },
  {
    id: "detail",
    label: "Atención al detalle",
    value: 87,
    lore: "Espaciado, estados vacíos, focus rings y esos 4px que nadie pide… hasta que faltan.",
  },
  {
    id: "story",
    label: "Storytelling visual",
    value: 80,
    lore: "Narrativa en scroll, motion con intención y secciones con un solo trabajo cada una.",
  },
];

export const studies: Study[] = [
  {
    id: "daw",
    title: "Grado Superior DAW",
    place: "CDP José Cabrera, Trebujena",
    detail:
      "Desarrollo de Aplicaciones Web — base sólida en frontend, backend y proyectos reales.",
    highlight: "Matrícula de honor",
    level: 1,
  },
  {
    id: "uoc",
    title: "Ingeniería Informática",
    place: "Universitat Oberta de Catalunya (UOC)",
    detail:
      "Mención en Tecnologías de la Información: sistemas, arquitectura y visión de producto digital.",
    highlight: "Mención TI",
    level: 2,
  },
];
