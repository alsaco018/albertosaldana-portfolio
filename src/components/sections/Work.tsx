import { ExternalLink, Layers } from "lucide-react";
import { motion } from "motion/react";
import { projects, site } from "../../data/content";
import { SectionReveal } from "../ui/SectionReveal";

export const Work = () => {
  return (
    <section
      id="trabajo"
      aria-labelledby="trabajo-heading"
      className="relative px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
            Capítulo 01
          </p>
          <h2
            id="trabajo-heading"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Mi trabajo
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            En{" "}
            <span className="font-semibold text-ink">{site.company}</span> desde{" "}
            {site.companySince}: Senior React & Drupal Frontend Developer, con
            liderazgo en productos digitales internacionales.
          </p>
        </SectionReveal>

        <ol className="mt-14 space-y-6">
          {projects.map((project, index) => (
            <SectionReveal key={project.id} delay={index * 0.06}>
              <motion.li
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="group relative list-none border-b border-border pb-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="font-display text-xs font-semibold text-sand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-ink">
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
                          aria-label={`Abrir ${project.name}`}
                          className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {project.name}
                          <ExternalLink
                            className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-70"
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
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-ink-muted"
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
