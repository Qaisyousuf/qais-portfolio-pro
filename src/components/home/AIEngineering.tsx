import { AIPipeline } from "@/components/home/AIPipeline";
import { Reveal } from "@/components/home/Reveal";
import { SurveyAIExample } from "@/components/home/SurveyAIExample";
import { aiCapabilities } from "@/data/ai";

export function AIEngineering() {
  return (
    <section id="ai" className="section-shell scroll-mt-[78px]">
      <Reveal className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <p className="technical-label text-muted">03 / AI Engineering</p>
        <div>
          <h2 className="max-w-[1180px] text-[clamp(3.375rem,6.5vw,6rem)] leading-[0.94] font-bold tracking-[-0.05em]">
            AI that becomes part of the product.
          </h2>
          <p className="mt-7 max-w-[700px] text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.55] tracking-[-0.02em] text-muted">
            I use language models as engineering tools and product capabilities—from Claude Code workflows to production integrations with the Claude API.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="technical-label text-muted">Application pipeline</p>
          <p className="hidden font-mono text-[9px] tracking-[0.09em] text-muted uppercase sm:block">Intent in / useful product behaviour out</p>
        </div>
        <AIPipeline />
      </Reveal>

      <ol aria-label="AI engineering capabilities" className="mt-20 grid border-t border-foreground lg:mt-24 lg:grid-cols-2">
        {aiCapabilities.map((capability, index) => (
          <li
            key={capability.index}
            className={`border-b border-foreground py-8 lg:p-8 xl:p-10 ${index % 2 === 0 ? "lg:border-r" : ""}`}
          >
            <Reveal delay={(index % 2) * 0.06} className="flex flex-col justify-between lg:min-h-[430px]">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] tracking-[0.1em] text-muted">{capability.index}</span>
                <span className="font-mono text-[9px] tracking-[0.09em] text-muted uppercase">Capability</span>
              </div>
              <div className="mt-12 lg:mt-20">
                <h3 className="max-w-xl text-[clamp(1.375rem,2.3vw,2.125rem)] leading-[1.02] font-bold tracking-[-0.045em] uppercase">
                  <span className={capability.index === "01" ? "decoration-accent decoration-2 underline underline-offset-8" : undefined}>
                    {capability.title}
                  </span>
                </h3>
                <p className="mt-6 max-w-2xl text-[14px] leading-[1.65] text-muted sm:text-[15px] xl:text-base">{capability.description}</p>
                <ul className="mt-7 grid sm:grid-cols-2">
                  {capability.items.map((item) => (
                    <li key={item} className="flex items-center border-t border-line py-2.5 pr-3 font-mono text-[10px] leading-5 tracking-[0.04em] uppercase">
                      <span
                        aria-hidden="true"
                        className={`mr-2 shrink-0 ${item === "Claude API" || item === "Claude Code" ? "size-1.5 bg-accent" : "text-muted"}`}
                      >
                        {item === "Claude API" || item === "Claude Code" ? "" : "+"}
                      </span>
                      <span className={item === "Claude API" || item === "Claude Code" ? "font-medium" : undefined}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-20 lg:mt-28">
        <div className="mb-7 grid gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
          <p className="technical-label text-muted">Product example</p>
          <div>
            <h3 className="text-[clamp(1.5rem,2.2vw,1.875rem)] leading-tight font-semibold tracking-[-0.035em]">AI-assisted survey creation</h3>
            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-muted sm:text-[15px]">
              A structured creation flow for A Survey: the model proposes a useful starting point while the survey owner stays in control.
            </p>
          </div>
        </div>
        <SurveyAIExample />
      </Reveal>
    </section>
  );
}
