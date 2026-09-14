import { aboutParagraphs, personalityStats } from "../../data/content";
import { PersonalityPanel } from "../personality/PersonalityPanel";
import { SectionReveal } from "../ui/SectionReveal";

export const About = () => {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-heading"
      className="relative px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
            Capítulo 02
          </p>
          <h2
            id="sobre-mi-heading"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Sobre mí
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <PersonalityPanel stats={personalityStats} />
        </SectionReveal>
      </div>
    </section>
  );
};
