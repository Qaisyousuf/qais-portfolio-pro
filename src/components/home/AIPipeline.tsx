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
              className="grid min-h-24 grid-cols-[38px_minmax(0,1fr)_24px] items-center border-b border-line px-3 py-4 last:border-b-0 lg:min-h-40 lg:grid-cols-1 lg:grid-rows-[auto_1fr_auto] lg:items-start lg:border-r lg:border-b-0 lg:p-4 lg:last:border-r-0"
            >
              <span className="font-mono text-[9px] tracking-[0.1em] text-muted">0{index + 1}</span>
              <strong className="font-mono text-[10px] leading-4 font-medium tracking-[0.08em] uppercase lg:self-center">
                {stage}
              </strong>
              {!isLast && (
                <>
                  <ArrowDown aria-hidden="true" className="size-4 text-muted lg:hidden" strokeWidth={1.2} />
                  <ArrowRight aria-hidden="true" className="hidden size-4 justify-self-end text-muted lg:block" strokeWidth={1.2} />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
