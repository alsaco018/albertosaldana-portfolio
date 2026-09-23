import { motion, useReducedMotion } from "motion/react";
import { GraduationCap, Trophy } from "lucide-react";
import { studies } from "../../data/content";
import { SectionReveal } from "../ui/SectionReveal";

export const Studies = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="studies"
      aria-labelledby="studies-heading"
      className="relative z-10 px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <h2
            id="studies-heading"
            className="neon-text-pink font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Studies
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            A level-up path: from vocational training with honors to a Computer
            Engineering degree with an Information Technologies specialization.
          </p>
        </SectionReveal>

        <div className="relative mt-14 space-y-8">
          <div
            aria-hidden
            className="absolute top-4 bottom-4 left-[1.15rem] w-px bg-border sm:left-[1.4rem] dark:bg-gradient-to-b dark:from-neon-cyan/50 dark:via-neon-pink/40 dark:to-neon-cyan/30"
          />

          {studies.map((study, index) => (
            <SectionReveal key={study.id} delay={index * 0.1}>
              <article className="relative grid grid-cols-[2.5rem_1fr] gap-4 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <div className="relative z-10 flex justify-center">
                  <motion.span
                    initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 18,
                      delay: 0.1,
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-elevated text-accent sm:h-11 sm:w-11 dark:border-neon-cyan/40 dark:text-neon-cyan dark:shadow-[0_0_16px_rgba(0,229,255,0.35)]"
                  >
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                  </motion.span>
                </div>

                <div className="glass-panel rounded-3xl p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="font-display text-xs font-bold tracking-wide text-sand uppercase dark:text-neon-pink">
                      Level {study.level}
                    </span>
                    {study.highlight && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-ink dark:border dark:border-neon-pink/30 dark:text-neon-cyan">
                        <Trophy className="h-3 w-3" aria-hidden />
                        {study.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    {study.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent dark:text-neon-cyan">
                    {study.place}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {study.detail}
                  </p>

                  <div className="mt-5" aria-hidden="true">
                    <div className="mb-1 flex justify-between text-xs text-ink-muted">
                      <span>Progress unlocked</span>
                      <span>100%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-border/60 dark:bg-neon-cyan/15">
                      <motion.div
                        className="h-full rounded-full bg-sand dark:bg-gradient-to-r dark:from-neon-pink dark:to-neon-cyan"
                        initial={reduce ? { width: "100%" } : { width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
