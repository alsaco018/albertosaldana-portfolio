import { motion, useReducedMotion } from "motion/react";
import { technologies } from "../../data/content";
import { SectionReveal } from "../ui/SectionReveal";

export const Technologies = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="tech"
      aria-labelledby="tech-heading"
      className="relative z-10 px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <h2
            id="tech-heading"
            className="neon-text-pink font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Technologies
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            The tools I use day to day — from core web foundations to React,
            Drupal, testing, and AI-assisted development.
          </p>
        </SectionReveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {technologies.map((tech, index) => {
            const isAlt = index % 2 === 1;
            return (
              <SectionReveal key={tech.id} delay={index * 0.04}>
                <motion.li
                  whileHover={reduce ? undefined : { y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  style={
                    reduce
                      ? undefined
                      : { animationDelay: `${(index % 6) * 0.35}s` }
                  }
                  className={`neon-tech-card glass-panel list-none rounded-2xl px-4 py-4 text-center ${
                    isAlt ? "neon-tech-card--alt" : ""
                  }`}
                >
                  <span className="neon-tech-label font-display text-sm font-semibold tracking-tight text-ink sm:text-base">
                    {tech.label}
                  </span>
                </motion.li>
              </SectionReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
