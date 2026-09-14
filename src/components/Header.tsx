import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { navItems, site } from "../data/content";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
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
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <div
        className={`pointer-events-auto glass-panel flex max-w-5xl items-center gap-2 rounded-full px-3 py-2 shadow-[0_8px_30px_rgba(36,48,44,0.06)] transition-all duration-300 sm:gap-3 sm:px-4 ${
          scrolled ? "w-full sm:w-auto" : "w-full sm:w-auto"
        }`}
      >
        <a
          href="#intro"
          className="font-display shrink-0 text-sm font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base"
          aria-label={`Ir al inicio — ${site.shortName}`}
          tabIndex={0}
        >
          <span className="hidden sm:inline">{site.shortName}</span>
          <span className="sm:hidden">AS</span>
        </a>

        <nav
          aria-label="Secciones del portfolio"
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
                tabIndex={0}
                className={`relative rounded-full px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors sm:px-3 sm:text-sm ${
                  isActive
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-soft"
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
