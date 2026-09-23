import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { navItems, site } from "../data/content";
import { ThemeToggle } from "./ThemeToggle";

const getScrollBehavior = (): ScrollBehavior => {
  if (typeof window === "undefined") return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
};

export const Header = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("intro");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140) current = id;
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  };

  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <div
        className={`pointer-events-auto glass-panel flex max-w-5xl items-center gap-2 rounded-full px-3 py-2 shadow-[0_8px_30px_rgba(47,38,43,0.07)] transition-all duration-300 sm:gap-3 sm:px-4 dark:shadow-[0_8px_30px_rgba(255,45,149,0.12)] ${
          scrolled ? "w-full sm:w-auto" : "w-full sm:w-auto"
        }`}
      >
        <a
          href="#intro"
          className="font-display shrink-0 text-sm font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base dark:hover:text-neon-cyan"
          aria-label={`Go to top — ${site.shortName}`}
        >
          <span className="sm:hidden">AS</span>
          <span className="hidden sm:inline">{site.shortName}</span>
        </a>

        <nav
          aria-label="Portfolio sections"
          className="relative flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto sm:gap-1"
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 sm:text-sm ${
                  isActive
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-soft dark:bg-neon-pink/20 dark:shadow-[0_0_12px_rgba(255,45,149,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </motion.header>
  );
};
