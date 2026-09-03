import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";

const facts = [["Experience", "Senior product engineering"], ["Focus", "Web / SaaS"], ["Market", "Nordic / EU"], ["Work", "Remote / Collaborative"]] as const;

export function About() {
  return (
    <section id="about" className="section-shell scroll-mt-[78px]">
      <SectionHeader index="05" label="About" title="Engineering with product judgement." />
      <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 xl:gap-24">
        <Reveal className="min-w-0">
          <p className="max-w-[820px] text-[clamp(2.375rem,11vw,3.625rem)] leading-[1.01] font-semibold tracking-[-0.04em] lg:text-[clamp(2.625rem,5vw,4.75rem)]">
            I turn <mark className="editorial-mark">complicated business problems</mark> into software that feels simple to use.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mb-12 space-y-5 text-[17px] leading-[1.55] tracking-[-0.02em] text-muted lg:mb-16 lg:text-lg">
            <p>I care about product quality as much as code quality. That means understanding the business, making strong technical decisions and owning the result all the way to production.</p>
            <p>I like working on products where engineering has a visible impact—reducing complexity, removing repetitive work and making something difficult feel straightforward.</p>
            <p>For me, good software is not about using the most technology. It is about choosing the right technology, building a strong foundation and creating something people can rely on.</p>
          </div>
          <dl className="border-t border-foreground">
            {facts.map(([term, detail]) => <div key={term} className="flex justify-between gap-6 border-b border-line py-3 text-xs"><dt className="font-mono text-muted">{term}</dt><dd className="text-right font-semibold">{detail}</dd></div>)}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
