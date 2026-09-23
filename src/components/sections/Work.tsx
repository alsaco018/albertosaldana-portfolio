import { ExternalLink, Layers } from "lucide-react";
import { motion } from "motion/react";
import { projects, site } from "../../data/content";
import { SectionReveal } from "../ui/SectionReveal";

export const Work = () => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative z-10 px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <h2
            id="work-heading"
            className="neon-text-pink font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            My work
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            At{" "}
            <span className="font-semibold text-ink">{site.company}</span> since{" "}
            {site.companySince}: Senior React & Drupal Frontend Developer, with
            leadership on international digital products.
          </p>
        </SectionReveal>

        <ol className="mt-14 space-y-6">
          {projects.map((project, index) => (
            <SectionReveal key={project.id} delay={index * 0.06}>
              <motion.li
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="group relative list-none border-b border-border pb-6 dark:hover:border-neon-cyan/40"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="font-display text-xs font-semibold text-sand dark:text-neon-pink">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-ink dark:border dark:border-neon-cyan/25 dark:text-neon-cyan">
                        <Layers className="h-3 w-3" aria-hidden />
                        {project.role}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={0}
                          aria-label={`Open ${project.name} (opens in a new tab)`}
                          className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:text-neon-cyan"
                        >
                          {project.name}
                          <ExternalLink
                            className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                            aria-hidden
                          />
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                      {project.summary}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-ink-muted dark:border-neon-pink/25 dark:text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
