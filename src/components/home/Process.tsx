import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section id="process" className="section-shell scroll-mt-[78px]">
      <SectionHeader
        index="07"
        label="Process"
        title="How we’d work together."
        description="A clear process, direct communication and no unnecessary layers."
      />

      <ol className="grid border-y border-foreground lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <li
            key={step.index}
            className="border-b border-line last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
          >
            <Reveal
              delay={index * 0.06}
              className="flex min-h-64 flex-col justify-between p-5 sm:min-h-72 sm:p-6 lg:min-h-[360px]"
            >
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-muted uppercase">
                <span>{step.index}</span>
                {index < processSteps.length - 1 && (
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.25} />
                )}
              </div>
              <div>
                <h3 className="max-w-56 text-[clamp(2rem,3.2vw,2.75rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-72 text-[13px] leading-[1.65] text-muted">{step.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
