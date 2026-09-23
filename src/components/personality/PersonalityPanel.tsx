import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { PersonalityStat } from "../../data/content";

type RadarChartProps = {
  stats: PersonalityStat[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 118;
const LABEL_RADIUS = RADIUS + 48;

const polarToCartesian = (angle: number, radius: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
};

const getLabelLines = (label: string): string[] => {
  if (label.includes(" / ")) {
    const [left, right] = label.split(" / ");
    return [left, `/ ${right}`];
  }
  if (label.includes("-")) {
    const [left, right] = label.split("-");
    return [`${left}-`, right];
  }
  if (label.includes(" ")) {
    const parts = label.split(" ");
    if (parts.length >= 2) {
      return [parts[0], parts.slice(1).join(" ")];
    }
  }
  return [label];
};

const getTextAnchor = (angle: number): "start" | "middle" | "end" => {
  const normalized = ((angle % 360) + 360) % 360;
  if (normalized > 20 && normalized < 160) return "start";
  if (normalized > 200 && normalized < 340) return "end";
  return "middle";
};

export const RadarChart = ({ stats, activeId, onSelect }: RadarChartProps) => {
  const reduce = useReducedMotion();
  const angleStep = 360 / stats.length;

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const polygonPoints = useMemo(() => {
    return stats
      .map((stat, index) => {
        const point = polarToCartesian(index * angleStep, (stat.value / 100) * RADIUS);
        return `${point.x},${point.y}`;
      })
      .join(" ");
  }, [stats, angleStep]);

  return (
    <div
      className="relative mx-auto w-full max-w-[420px]"
      role="group"
      aria-label="Personality radar chart"
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        className="h-auto w-full overflow-visible"
      >
        {gridLevels.map((level) => {
          const points = stats
            .map((_, index) => {
              const point = polarToCartesian(index * angleStep, RADIUS * level);
              return `${point.x},${point.y}`;
            })
            .join(" ");
          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          );
        })}

        {stats.map((_, index) => {
          const end = polarToCartesian(index * angleStep, RADIUS);
          return (
            <line
              key={index}
              x1={CENTER}
              y1={CENTER}
              x2={end.x}
              y2={end.y}
              stroke="var(--border)"
              strokeWidth="1"
            />
          );
        })}

        <motion.polygon
          points={polygonPoints}
          fill="color-mix(in oklab, var(--accent) 28%, transparent)"
          stroke="var(--chart)"
          strokeWidth="2"
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        />

        {stats.map((stat, index) => {
          const angle = index * angleStep;
          const point = polarToCartesian(angle, (stat.value / 100) * RADIUS);
          const labelPoint = polarToCartesian(angle, LABEL_RADIUS);
          const isActive = activeId === stat.id;
          const lines = getLabelLines(stat.label);
          const textAnchor = getTextAnchor(angle);

          return (
            <g key={stat.id}>
              {/* Invisible hit target ≥ 24×24px for WCAG 2.5.8 */}
              <circle
                cx={point.x}
                cy={point.y}
                r={14}
                fill="transparent"
                className="cursor-pointer focus:outline-none"
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${stat.label}: ${stat.value} out of 100`}
                onClick={() => onSelect(stat.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(stat.id);
                  }
                }}
              />
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={isActive ? 7 : 5}
                fill="var(--chart)"
                className="pointer-events-none"
                aria-hidden
                animate={{
                  r: isActive ? 7 : 5,
                  filter: isActive
                    ? "drop-shadow(0 0 6px var(--chart))"
                    : "drop-shadow(0 0 0 transparent)",
                }}
              />
              {isActive && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={11}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  className="pointer-events-none dark:stroke-[var(--neon-cyan)]"
                  aria-hidden
                />
              )}
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="fill-ink-muted text-[11px] font-medium"
                aria-hidden
              >
                {lines.map((line, lineIndex) => (
                  <tspan
                    key={line}
                    x={labelPoint.x}
                    dy={lineIndex === 0 ? `${-((lines.length - 1) * 0.55)}em` : "1.15em"}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

type StatBarsProps = {
  stats: PersonalityStat[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export const StatBars = ({ stats, activeId, onSelect }: StatBarsProps) => {
  const reduce = useReducedMotion();

  return (
    <ul className="space-y-4">
      {stats.map((stat, index) => {
        const isActive = activeId === stat.id;
        return (
          <li key={stat.id}>
            <button
              type="button"
              onClick={() => onSelect(stat.id)}
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`${stat.label}: ${stat.value} out of 100`}
              className={`w-full rounded-2xl border px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive
                  ? "border-accent bg-accent-soft/70 dark:border-neon-cyan/50 dark:shadow-[0_0_18px_rgba(0,229,255,0.2)]"
                  : "border-border bg-bg-elevated/50 hover:border-accent/50 dark:hover:border-neon-pink/40"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{stat.label}</span>
                <span className="font-display text-sm font-bold text-accent dark:text-neon-cyan">
                  {stat.value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border/60 dark:bg-neon-cyan/15">
                <motion.div
                  className="h-full rounded-full bg-accent dark:bg-gradient-to-r dark:from-neon-pink dark:to-neon-cyan"
                  initial={reduce ? { width: `${stat.value}%` } : { width: 0 }}
                  whileInView={{ width: `${stat.value}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.aside
                  key={`lore-mobile-${stat.id}`}
                  initial={
                    reduce
                      ? { opacity: 1, height: "auto" }
                      : { opacity: 0, height: 0, y: -8 }
                  }
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, height: 0, y: -6 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden lg:hidden"
                  aria-live="polite"
                >
                  <div className="mt-3 rounded-2xl border border-border bg-bg-elevated/70 p-4 dark:border-neon-pink/30 dark:shadow-[0_0_20px_rgba(255,45,149,0.12)]">
                    <p className="font-display text-sm font-semibold text-ink dark:text-neon-cyan">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {stat.lore}
                    </p>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
};

type PersonalityPanelProps = {
  stats: PersonalityStat[];
};

export const PersonalityPanel = ({ stats }: PersonalityPanelProps) => {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(stats[0]?.id ?? null);
  const active = stats.find((stat) => stat.id === activeId) ?? stats[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
        <p className="mb-1 text-xs font-semibold tracking-wide text-sand uppercase dark:text-neon-pink">
          Character · stats
        </p>
        <h3 className="font-display text-xl font-semibold text-ink">
          Personality panel
        </h3>
        <p className="mt-1 mb-4 text-sm text-ink-muted">
          Tap a bar or a radar node to reveal the lore.
        </p>
        <RadarChart stats={stats} activeId={activeId} onSelect={handleSelect} />
      </div>

      <div>
        <StatBars stats={stats} activeId={activeId} onSelect={handleSelect} />
        {active && (
          <motion.aside
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-5 hidden rounded-2xl border border-border bg-bg-elevated/70 p-4 lg:block dark:border-neon-pink/30 dark:shadow-[0_0_20px_rgba(255,45,149,0.12)]"
            aria-live="polite"
          >
            <p className="font-display text-sm font-semibold text-ink dark:text-neon-cyan">
              {active.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              {active.lore}
            </p>
          </motion.aside>
        )}
      </div>
    </div>
  );
};
