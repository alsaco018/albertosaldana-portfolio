import { motion, useReducedMotion } from "motion/react";
import {
  Clapperboard,
  Gamepad2,
  Mountain,
  Music2,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { interests, type Interest } from "../../data/content";
import { SectionReveal } from "../ui/SectionReveal";

const iconMap: Record<Interest["icon"], LucideIcon> = {
  gamepad: Gamepad2,
  film: Clapperboard,
  sports: Trophy,
  music: Music2,
  nature: Mountain,
};

const iconHover: Record<
  Interest["icon"],
  { rotate?: number; scale?: number; y?: number }
> = {
  gamepad: { rotate: -12, scale: 1.15 },
  film: { rotate: 8, scale: 1.12 },
  sports: { y: -4, scale: 1.18, rotate: -6 },
  music: { rotate: 14, scale: 1.15 },
  nature: { y: -3, scale: 1.12 },
};

export const Loves = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="loves"
      aria-labelledby="loves-heading"
      className="relative z-10 px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <h2
            id="loves-heading"
            className="neon-text-pink font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Things I love
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Outside of code, these are the things that keep me curious, energized,
            and balanced.
          </p>
        </SectionReveal>

        <ul className="mt-12 flex flex-col gap-4">
          {interests.map((interest, index) => {
            const Icon = iconMap[interest.icon];
            const isAlt = index % 2 === 1;
            const hoverMotion = iconHover[interest.icon];

            return (
              <SectionReveal key={interest.id} delay={index * 0.05}>
                <motion.li
                  initial="rest"
                  whileHover={reduce ? undefined : "hover"}
                  animate="rest"
                  variants={{
                    rest: { y: 0 },
                    hover: { y: reduce ? 0 : -4 },
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  style={
                    reduce
                      ? undefined
                      : { animationDelay: `${(index % 5) * 0.3}s` }
                  }
                  className={`neon-tech-card glass-panel list-none rounded-[1.5rem] p-5 sm:p-6 ${
                    isAlt ? "neon-tech-card--alt" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      aria-hidden
                      variants={{
                        rest: { rotate: 0, scale: 1, y: 0 },
                        hover: reduce
                          ? { rotate: 0, scale: 1, y: 0 }
                          : {
                              rotate: hoverMotion.rotate ?? 0,
                              scale: hoverMotion.scale ?? 1,
                              y: hoverMotion.y ?? 0,
                            },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 16,
                      }}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-accent-soft text-accent transition-[box-shadow] dark:border-neon-cyan/35 dark:bg-neon-cyan/10 dark:text-neon-cyan"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.span>
                    <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                      {interest.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {interest.detail}
                  </p>
                </motion.li>
              </SectionReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
