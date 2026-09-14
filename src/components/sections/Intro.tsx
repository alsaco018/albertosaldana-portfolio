import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import { site } from "../../data/content";

export const Intro = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  const handleCta = () => {
    document.getElementById("trabajo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="intro"
      ref={ref}
      aria-labelledby="intro-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:px-12"
    >
      <motion.div
        style={{ y: yFast, opacity }}
        aria-hidden
        className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-accent-soft/80 blur-2xl"
      />
      <motion.div
        style={{ y: ySlow, opacity }}
        aria-hidden
        className="pointer-events-none absolute right-[-4rem] top-40 h-72 w-72 rounded-full bg-mist/40 blur-3xl"
      />
      <motion.div
        style={{ y: yFast }}
        aria-hidden
        className="pointer-events-none absolute bottom-24 left-1/3 h-40 w-40 rounded-full bg-sand/25 blur-2xl"
      />

      <motion.div
        style={{ y: ySlow, opacity }}
        className="relative mx-auto w-full max-w-5xl"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-ink-muted"
        >
          <Sparkles className="h-4 w-4 text-accent" aria-hidden />
          Portfolio · storytelling en una página
        </motion.p>

        <motion.h1
          id="intro-heading"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-display max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          {site.name}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.65 }}
          className="mt-5 max-w-xl text-lg text-ink-muted sm:text-xl"
        >
          <span className="font-medium text-ink">{site.role}</span>
          <span className="mt-3 block text-base leading-relaxed sm:text-lg">
            {site.tagline}
          </span>
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={handleCta}
            tabIndex={0}
            aria-label="Ir a la sección Mi trabajo"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Ver mi trabajo
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
            aria-label="Abrir perfil de LinkedIn en nueva pestaña"
            className="text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[8%] bottom-[18%] hidden lg:block"
          style={{ y: yFast }}
        >
          <motion.div
            animate={{ rotate: [0, 6, -4, 0], y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="h-28 w-28 rounded-[2rem] border border-border bg-bg-elevated/60 shadow-sm backdrop-blur-sm"
          />
        </motion.div>
      )}
    </section>
  );
};
