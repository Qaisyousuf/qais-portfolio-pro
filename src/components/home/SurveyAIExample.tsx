import { surveyAIInput, surveyAIPlan } from "@/data/ai";

const draftQuestions = [
  "I have the support I need to do my work well.",
  "My immediate manager communicates priorities clearly.",
  "My workload is manageable within normal working hours.",
];

export function SurveyAIExample() {
  return (
    <div className="border border-foreground">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground px-4 py-3 font-mono text-[9px] tracking-[0.1em] uppercase sm:px-5">
        <span>A Survey / AI creation door</span>
        <span className="text-muted">Assist → review → edit</span>
      </div>

      <div className="grid lg:grid-cols-[0.78fr_0.78fr_1.44fr]">
        <div className="border-b border-line p-5 sm:p-6 lg:border-r lg:border-b-0">
          <p className="mb-6 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">Input</p>
          <dl>
            {surveyAIInput.map(([term, detail]) => (
              <div key={term} className="grid grid-cols-[76px_1fr] gap-3 border-t border-line py-3 text-[13px] last:border-b">
                <dt className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase">{term}</dt>
                <dd className="font-semibold">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-b border-line p-5 sm:p-6 lg:border-r lg:border-b-0">
          <p className="mb-6 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">AI plan</p>
          <ol>
            {surveyAIPlan.map((item, index) => (
              <li key={item} className="grid grid-cols-[32px_1fr] border-t border-line py-3 text-[13px] last:border-b">
                <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-[#121418] p-5 text-[#f3f1eb] sm:p-6">
          <div className="mb-7 flex items-start justify-between gap-3">
            <h4 className="text-[clamp(1.5rem,2.2vw,1.875rem)] leading-tight font-semibold tracking-[-0.035em]">Editable survey draft</h4>
            <span className="border border-[#d9ff47] px-2 py-1 font-mono text-[8px] tracking-[0.08em] text-[#d9ff47] uppercase">
              Draft
            </span>
          </div>
          <div className="border border-[#33363b]">
            {draftQuestions.map((question, index) => (
              <div key={question} className="grid grid-cols-[26px_minmax(0,1fr)_auto] gap-3 border-b border-[#33363b] p-3 text-[11px] leading-5 last:border-b-0 sm:text-xs">
                <span className="font-mono text-[9px] text-[#98958d]">Q{index + 1}</span>
                <span>{question}</span>
                <span className="font-mono text-[8px] text-[#d9ff47]">EDIT</span>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-lg text-[13px] leading-6 text-[#b0aea5]">
            AI prepares the structure and first draft. The user reviews, changes and owns every question before distribution.
          </p>
        </div>
      </div>
    </div>
  );
}
