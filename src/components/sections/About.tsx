import { aboutParagraphs, personalityStats } from "../../data/content";
import { PersonalityPanel } from "../personality/PersonalityPanel";
import { SectionReveal } from "../ui/SectionReveal";

export const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <h2
            id="about-heading"
            className="neon-text-pink font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            About me
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
