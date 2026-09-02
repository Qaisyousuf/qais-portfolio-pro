import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";

const facts = [["Experience", "10+ years"], ["Focus", "Web / SaaS"], ["Market", "Nordic / EU"], ["Work", "Remote / Collaborative"]] as const;

export function About() {
  return (
    <section id="about" className="section-shell scroll-mt-[78px]">
      <SectionHeader index="05" label="About" title="Engineering with product judgement." />
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <p className="max-w-[950px] text-[clamp(2.4rem,5vw,4.625rem)] leading-[0.98] font-semibold tracking-[-0.05em]">
            I turn <mark className="bg-accent px-[0.05em] text-[#0d0e10]">complicated business problems</mark> into software that feels simple to use.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-12 text-xl leading-[1.4] tracking-[-0.025em] text-muted lg:mb-16">I care about product quality as much as code quality. That means understanding the business, making strong technical decisions and owning the result all the way to production.</p>
          <dl className="border-t border-foreground">
            {facts.map(([term, detail]) => <div key={term} className="flex justify-between gap-6 border-b border-line py-3 text-xs"><dt className="font-mono text-muted">{term}</dt><dd className="text-right font-semibold">{detail}</dd></div>)}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
