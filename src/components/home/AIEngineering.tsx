import { AIPipeline } from "@/components/home/AIPipeline";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { SurveyAIExample } from "@/components/home/SurveyAIExample";
import { aiCapabilities } from "@/data/ai";

export function AIEngineering() {
  return (
    <section id="ai" className="section-shell scroll-mt-[78px]">
      <SectionHeader
        index="03"
        label="AI Engineering"
        title="AI that becomes part of the product."
        description="I use modern language models both as engineering tools and as product capabilities—from development workflows with Claude Code to production integrations using the Claude API."
      />

      <Reveal>
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="technical-label text-muted">Application pipeline</p>
          <p className="hidden font-mono text-[9px] tracking-[0.09em] text-muted uppercase sm:block">Intent in / useful product behaviour out</p>
        </div>
        <AIPipeline />
      </Reveal>

      <ol aria-label="AI engineering capabilities" className="mt-16 grid border-t border-foreground lg:grid-cols-2">
        {aiCapabilities.map((capability, index) => (
          <li
            key={capability.index}
            className={`border-b border-foreground py-6 lg:p-7 ${index % 2 === 0 ? "lg:border-r" : ""}`}
          >
            <Reveal delay={(index % 2) * 0.06} className="flex min-h-[370px] flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] tracking-[0.1em] text-muted">{capability.index}</span>
                <span className="font-mono text-[9px] tracking-[0.09em] text-muted uppercase">Capability</span>
              </div>
              <div className="mt-14">
                <h3 className="max-w-xl text-[clamp(2rem,3.4vw,3rem)] leading-[0.95] font-semibold tracking-[-0.05em] uppercase">
                  {capability.title}
                </h3>
                <p className="mt-5 max-w-2xl text-[13px] leading-[1.65] text-muted">{capability.description}</p>
                <ul className="mt-6 grid sm:grid-cols-2">
                  {capability.items.map((item) => (
                    <li key={item} className="border-t border-line py-2 pr-3 font-mono text-[9px] leading-4 tracking-[0.04em] uppercase">
                      <span aria-hidden="true" className="mr-2 text-muted">+</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-16">
        <div className="mb-4 grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
          <p className="technical-label text-muted">Product example</p>
          <p className="max-w-2xl text-[13px] leading-6 text-muted">
            A structured creation flow for A Survey: the model proposes a useful starting point while the survey owner stays in control.
          </p>
        </div>
        <SurveyAIExample />
      </Reveal>
    </section>
  );
}
