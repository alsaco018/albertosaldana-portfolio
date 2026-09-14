import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { PersonalityStat } from "../../data/content";

type RadarChartProps = {
  stats: PersonalityStat[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

const SIZE = 280;
const CENTER = SIZE / 2;
const RADIUS = 100;

const polarToCartesian = (angle: number, radius: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
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
    <div className="relative mx-auto w-full max-w-[320px]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Gráfica radar de personalidad"
        className="h-auto w-full"
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
          const point = polarToCartesian(index * angleStep, (stat.value / 100) * RADIUS);
          const labelPoint = polarToCartesian(index * angleStep, RADIUS + 28);
          const isActive = activeId === stat.id;

          return (
            <g key={stat.id}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={isActive ? 7 : 5}
                fill="var(--chart)"
                className="cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`${stat.label}: ${stat.value}`}
                onClick={() => onSelect(stat.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(stat.id);
                  }
                }}
                whileHover={{ scale: 1.25 }}
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-ink-muted text-[9px] font-medium"
              >
                {stat.label.split(" ")[0]}
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
              aria-label={`${stat.label}: ${stat.value} de 100`}
              className={`w-full rounded-2xl border px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive
                  ? "border-accent bg-accent-soft/70"
                  : "border-border bg-bg-elevated/50 hover:border-accent/50"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{stat.label}</span>
                <span className="font-display text-sm font-bold text-accent">
                  {stat.value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border/60">
                <motion.div
                  className="h-full rounded-full bg-accent"
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
  const [activeId, setActiveId] = useState<string | null>(stats[0]?.id ?? null);
  const active = stats.find((stat) => stat.id === activeId) ?? stats[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
        <p className="mb-1 text-xs font-semibold tracking-wide text-sand uppercase">
          Personaje · stats
        </p>
        <h3 className="font-display text-xl font-semibold text-ink">
          Panel de personalidad
        </h3>
        <p className="mt-1 mb-4 text-sm text-ink-muted">
          Toca una barra o un nodo del radar para revelar el lore.
        </p>
        <RadarChart stats={stats} activeId={activeId} onSelect={handleSelect} />
      </div>

      <div>
        <StatBars stats={stats} activeId={activeId} onSelect={handleSelect} />
        {active && (
          <motion.aside
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-5 rounded-2xl border border-border bg-bg-elevated/70 p-4"
            aria-live="polite"
          >
            <p className="font-display text-sm font-semibold text-ink">
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
