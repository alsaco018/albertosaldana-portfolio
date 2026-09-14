import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

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
        aria-label="Cambiar tema"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-elevated/80"
        tabIndex={0}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
      aria-pressed={theme === "dark"}
      tabIndex={0}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-bg-elevated/90 text-ink transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
            <Sun className="h-4 w-4 text-sand" aria-hidden />
          ) : (
            <Moon className="h-4 w-4 text-mist" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        animate={{
          boxShadow:
            theme === "dark"
              ? "inset 0 0 0 1px rgba(143,181,176,0.35)"
              : "inset 0 0 0 1px rgba(201,168,138,0.35)",
        }}
        transition={{ duration: 0.35 }}
      />
    </button>
  );
};
