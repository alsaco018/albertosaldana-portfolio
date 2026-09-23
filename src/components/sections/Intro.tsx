import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "../../data/content";

export const Intro = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Fade fully out as the section leaves the viewport — no early clamp that stays visible
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 1],
    reduce ? [1, 1, 1] : [1, 1, 0],
  );
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);

  const handleCta = () => {
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("work")
      ?.scrollIntoView({ behavior: prefersReduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="intro"
      ref={ref}
      aria-labelledby="intro-heading"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:px-12"
    >
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <motion.div
          style={{ y: yFast }}
          className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-sand/45 blur-2xl dark:bg-neon-pink/30"
        />
        <motion.div
          style={{ y: ySlow }}
          className="absolute right-[-4rem] top-40 h-72 w-72 rounded-full bg-accent-soft/70 blur-3xl dark:bg-neon-cyan/25"
        />
        <motion.div
          style={{ y: yFast }}
          className="absolute bottom-24 left-1/3 h-40 w-40 rounded-full bg-mist/35 blur-2xl dark:bg-neon-pink/20"
        />
      </motion.div>

      <motion.div
        style={{ opacity, y: ySlow }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        <div>
          <motion.h1
            id="intro-heading"
            initial={reduce ? false : { y: 28, filter: "blur(4px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="neon-title font-display max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.65 }}
            className="mt-5 max-w-xl text-lg text-ink-muted sm:text-xl"
          >
            <span className="neon-text-cyan font-medium text-ink">{site.role}</span>
            <span className="mt-3 block text-base leading-relaxed sm:text-lg">
              {site.tagline}
            </span>
          </motion.p>

          <motion.div
            initial={reduce ? false : { y: 16 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={handleCta}
              tabIndex={0}
              aria-label="Go to Work section"
              className="neon-cta group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-neon-pink dark:text-[#05060f]"
            >
              View my work
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden
              />
            </button>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
              aria-label="Open LinkedIn profile in a new tab"
              className="text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:text-neon-cyan"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ y: yFast }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            initial={reduce ? false : { scale: 0.94, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sand/30 via-transparent to-mist/40 blur-xl dark:from-neon-pink/40 dark:via-transparent dark:to-neon-cyan/40"
            />
            <div className="neon-portrait relative overflow-hidden rounded-[1.75rem] border border-border bg-bg-elevated shadow-lg dark:border-neon-cyan/40">
              <img
                src={site.portrait}
                alt={`${site.name} studio portrait`}
                width={720}
                height={900}
                className="aspect-[4/5] w-full object-cover object-[center_20%]"
                decoding="async"
                fetchPriority="high"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/25 via-transparent to-transparent dark:from-[#05060f]/45 dark:via-transparent dark:to-neon-pink/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-0 dark:block dark:opacity-80"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
