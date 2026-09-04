import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";

const solutions = [
  { number: "01", label: "SaaS", title: "SaaS Platforms", symbol: "{ }", description: "Subscriptions, workspaces, roles, workflows, analytics and production-ready multi-tenant architecture." },
  { number: "02", label: "Product", title: "Digital Products", symbol: "↗", description: "From initial product thinking to a finished web application ready for customers and real-world use." },
  { number: "03", label: "Systems", title: "Business Systems", symbol: "API", description: "Internal tools, automation, integrations and APIs that remove repetitive work and connect operations." },
] as const;

export function Solutions() {
  return (
    <section id="solutions" className="section-shell scroll-mt-[78px]">
      <SectionHeader index="05" label="Solutions" title="What I can build for a business." />
      <div className="grid border-t border-foreground lg:grid-cols-3">
        {solutions.map((solution, index) => (
          <Reveal key={solution.number} delay={index * 0.06} className="relative flex min-h-[330px] flex-col justify-between overflow-hidden border-b border-foreground py-6 lg:min-h-[390px] lg:border-r lg:px-6 lg:last:border-r-0">
            <span className="absolute top-7 right-3 text-[clamp(5rem,8vw,7rem)] leading-none font-extrabold opacity-[0.07]">{solution.symbol}</span>
            <p className="font-mono text-[9px] tracking-[0.1em] text-muted uppercase">{solution.number} / {solution.label}</p>
            <div className="relative">
              <h3 className="text-[clamp(2.25rem,3vw,2.75rem)] leading-[0.95] font-semibold tracking-[-0.05em]">{solution.title}</h3>
              <p className="mt-4 max-w-[340px] text-[13px] leading-[1.65] text-muted">{solution.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
