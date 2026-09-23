import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon } from "lucide-react";

type Theme = "light" | "dark";

type SunsetIconProps = {
  className?: string;
};

/** Sun over the horizon — no direction arrow */
const SunsetIcon = ({ className }: SunsetIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 10V2" />
    <path d="m4.93 10.93 1.41 1.41" />
    <path d="M2 18h2" />
    <path d="M20 18h2" />
    <path d="m19.07 10.93-1.41 1.41" />
    <path d="M22 22H2" />
    <path d="M16 18a4 4 0 0 0-8 0" />
  </svg>
);

const getInitialTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        aria-pressed={false}
        disabled
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-elevated/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={theme === "dark"}
      tabIndex={0}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-bg-elevated/90 text-ink transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:border-neon-cyan"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 12, opacity: 0, rotate: -40, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: -12, opacity: 0, rotate: 40, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "light" ? (
            <SunsetIcon className="h-4 w-4 text-accent" />
          ) : (
            <Moon className="h-4 w-4 text-neon-cyan" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        animate={{
          boxShadow:
            theme === "dark"
              ? "inset 0 0 0 1px rgba(0,229,255,0.45), 0 0 14px rgba(255,45,149,0.35)"
              : "inset 0 0 0 1px rgba(143,77,99,0.45)",
        }}
        transition={{ duration: 0.35 }}
      />
    </button>
  );
};
