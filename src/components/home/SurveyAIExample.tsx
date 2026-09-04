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
        <div className="border-b border-line p-4 sm:p-5 lg:border-r lg:border-b-0">
          <p className="technical-label mb-5 text-muted">Input</p>
          <dl>
            {surveyAIInput.map(([term, detail]) => (
              <div key={term} className="grid grid-cols-[76px_1fr] gap-3 border-t border-line py-2.5 text-[11px] last:border-b">
                <dt className="font-mono text-[9px] tracking-[0.06em] text-muted uppercase">{term}</dt>
                <dd className="font-semibold">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-b border-line p-4 sm:p-5 lg:border-r lg:border-b-0">
          <p className="technical-label mb-5 text-muted">AI plan</p>
          <ol>
            {surveyAIPlan.map((item, index) => (
              <li key={item} className="grid grid-cols-[28px_1fr] border-t border-line py-2.5 text-[11px] last:border-b">
                <span className="font-mono text-[9px] text-muted">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-[#121418] p-4 text-[#f3f1eb] sm:p-5">
          <div className="mb-6 flex items-center justify-between gap-3">
            <p className="technical-label text-[#98958d]">Editable survey draft</p>
            <span className="border border-[#d9ff47] px-2 py-1 font-mono text-[8px] tracking-[0.08em] text-[#d9ff47] uppercase">
              Draft
            </span>
          </div>
          <div className="border border-[#33363b]">
            {draftQuestions.map((question, index) => (
              <div key={question} className="grid grid-cols-[30px_1fr_auto] gap-3 border-b border-[#33363b] p-3 text-[10px] last:border-b-0 sm:text-[11px]">
                <span className="font-mono text-[8px] text-[#98958d]">Q{index + 1}</span>
                <span>{question}</span>
                <span className="font-mono text-[8px] text-[#d9ff47]">EDIT</span>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-lg text-[11px] leading-5 text-[#98958d]">
            AI prepares the structure and first draft. The user reviews, changes and owns every question before distribution.
          </p>
        </div>
      </div>
    </div>
  );
}
