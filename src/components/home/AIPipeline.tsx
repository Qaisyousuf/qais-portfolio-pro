import { ArrowDown, ArrowRight } from "lucide-react";
import { aiPipeline } from "@/data/ai";

export function AIPipeline() {
  return (
    <div aria-label="AI application pipeline" className="border-y border-foreground">
      <div className="grid lg:grid-cols-7">
        {aiPipeline.map((stage, index) => {
          const isLast = index === aiPipeline.length - 1;

          return (
            <div
              key={stage}
              className="grid min-h-28 grid-cols-[38px_minmax(0,1fr)_30px] items-center border-b border-line px-4 py-5 last:border-b-0 lg:min-h-48 lg:grid-cols-1 lg:grid-rows-[auto_1fr_auto] lg:items-start lg:border-r lg:border-b-0 lg:p-5 lg:last:border-r-0"
            >
              <span className="font-mono text-[10px] tracking-[0.1em] text-muted">0{index + 1}</span>
              <div className="self-center">
                <strong className="font-mono text-[11px] leading-[1.5] font-medium tracking-[0.07em] uppercase lg:text-xs">
                  {stage}
                </strong>
                {stage === "Claude API" && <span aria-hidden="true" className="mt-2 block h-px w-8 bg-accent" />}
              </div>
              {!isLast && (
                <>
                  <ArrowDown aria-hidden="true" className="size-5 text-foreground lg:hidden" strokeWidth={1.25} />
                  <div aria-hidden="true" className="hidden w-full items-center gap-2 text-foreground lg:flex">
                    <span className="h-px flex-1 bg-line" />
                    <ArrowRight className="size-5" strokeWidth={1.25} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
