function WindowBar({ path, mode }: { path: string; mode: string }) {
  return (
    <div className="grid h-10 grid-cols-[1fr_auto_1fr] items-center border-b border-current px-3 font-mono text-[8px] tracking-[0.09em] uppercase opacity-80">
      <span className="flex gap-1.5" aria-hidden="true">
        <i className="size-1.5 border border-current" />
        <i className="size-1.5 border border-current" />
        <i className="size-1.5 border border-current" />
      </span>
      <span className="truncate px-2 text-center">{path}</span>
      <span className="text-right">{mode}</span>
    </div>
  );
}

export function SurveyVisual() {
  const options = ["Very supported", "Supported", "Neutral", "Not supported"];

  return (
    <div className="project-visual bg-[#111317] text-[#f7f6f1]">
      <div className="product-window border-[#dad7cf] bg-[#14181d]">
        <WindowBar path="workspace.asurvey.dk/app" mode="Survey builder" />
        <div className="grid h-[calc(100%-2.5rem)] grid-cols-[88px_minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] xl:grid-cols-[150px_minmax(0,1fr)_175px]">
          <aside className="border-r border-[#363b43] px-2.5 py-4 font-mono text-[8px] sm:px-3">
            <p className="mb-4 tracking-[0.1em] text-[#89909b] uppercase">Create survey</p>
            {[
              ["Scratch", "01"],
              ["Template", "02"],
              ["AI", "03"],
              ["Import", "04"],
            ].map(([label, number], index) => (
              <div
                key={label}
                className={`flex justify-between border-t border-[#363b43] px-1.5 py-2.5 ${index === 0 ? "bg-accent text-[#111317]" : ""}`}
              >
                <span>{label}</span>
                <b className="font-medium">{number}</b>
              </div>
            ))}
          </aside>

          <div className="min-w-0 px-3 py-4 sm:px-5 sm:py-5">
            <div className="flex flex-wrap justify-between gap-2 font-mono text-[8px] tracking-[0.08em] text-[#9ca3af] uppercase">
              <span>Question 12 / 65 types</span>
              <span>APV / Trivselsmåling</span>
            </div>
            <h3 className="my-7 max-w-lg text-[clamp(1.25rem,3vw,1.8rem)] leading-[1.08] font-semibold tracking-[-0.04em] sm:my-9">
              How supported do you feel by your immediate manager?
            </h3>
            <div>
              {options.map((option, index) => (
                <div key={option} className="flex justify-between border-t border-[#363b43] py-2.5 text-[10px] last:border-b sm:text-[11px]">
                  <span>{option}</span>
                  <span className={index === 0 ? "text-accent" : "text-[#69707a]"}>{index === 0 ? "●" : "○"}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden flex-col justify-between border-l border-[#363b43] p-4 xl:flex">
            <div>
              <p className="font-mono text-[8px] tracking-[0.09em] text-[#9ca3af] uppercase">Product loop</p>
              <strong className="mt-2 block text-5xl leading-none tracking-[-0.05em]">3</strong>
              <p className="mt-2 font-mono text-[8px] leading-4 text-[#9ca3af] uppercase">Results / Responses / Reports</p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[8px]">
              {['EN', 'DA', 'SV', 'NO'].map((language) => <span key={language} className="border border-[#363b43] p-2 text-center">{language}</span>)}
            </div>
            <p className="border border-accent p-2.5 font-mono text-[8px] leading-4 text-accent">WCAG 2.2 guardrail<br />Publish blocked on failure</p>
          </aside>
        </div>
      </div>
      <span className="project-caption">Survey infrastructure / Nordic</span>
    </div>
  );
}

export function StakyVisual() {
  const replacements = [
    ["GitHub", "Forgejo"],
    ["AWS", "OVHcloud"],
    ["Google Drive", "Nextcloud"],
    ["Slack", "Mattermost"],
  ];

  return (
    <div className="project-visual bg-[#5b55ff] text-[#111317]">
      <div className="product-window border-[#24208f] bg-[#655fff]">
        <WindowBar path="staky.dk" mode="Migration workspace" />
        <div className="grid h-[calc(100%-2.5rem)] md:grid-cols-[0.92fr_1.08fr]">
          <div className="border-[#2b279a] p-5 md:border-r lg:p-6">
            <p className="font-mono text-[8px] tracking-[0.09em] uppercase">Stack replacement map</p>
            <h3 className="mt-5 mb-6 text-[clamp(1.8rem,4vw,2.4rem)] leading-none font-semibold tracking-[-0.05em]">Switch the stack.<br />Keep control.</h3>
            {replacements.map(([from, to]) => (
              <div key={from} className="grid grid-cols-[1fr_30px_1fr] border-t border-[#302b9d] py-2.5 text-[10px] last:border-b sm:text-[11px]">
                <span>{from}</span><span className="text-center">→</span><strong className="text-right">{to}</strong>
              </div>
            ))}
          </div>
          <div className="border-t border-[#2b279a] p-5 md:border-t-0 lg:p-6">
            <div className="mb-5 flex justify-between font-mono text-[8px] tracking-[0.09em] uppercase"><span>Migration progress</span><span>64%</span></div>
            <div className="mb-6 grid grid-cols-4 gap-1.5" aria-label="Migration is 64 percent complete">
              <i className="h-2 bg-[#292495]" /><i className="h-2 bg-[#292495]" /><i className="h-2 bg-[#292495]" /><i className="h-2 border border-[#292495]" />
            </div>
            {[
              ["Matched partner", "Verified migration expert", "Connected"],
              ["Current stage", "Data & configuration", "In progress"],
              ["Next", "Validation & handover", "Queued"],
            ].map(([label, value, state]) => (
              <div key={label} className="mt-2.5 grid grid-cols-[1fr_auto] items-center gap-3 border border-[#292495] p-3 text-[10px]">
                <div><small className="font-mono text-[8px] uppercase">{label}</small><strong className="mt-1 block text-sm tracking-[-0.025em] sm:text-base">{value}</strong></div>
                <span className="border border-[#292495] px-1.5 py-1 font-mono text-[7px] uppercase">{state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="project-caption">European stack migration</span>
    </div>
  );
}

export function PayWatanVisual() {
  return (
    <div className="project-visual bg-[#e9e4da] text-[#111317]">
      <div className="product-window border-[#171717] bg-[#f6f2e9]">
        <WindowBar path="paywatan.com" mode="Top-up flow" />
        <div className="grid h-[calc(100%-2.5rem)] grid-rows-[1.05fr_0.95fr] sm:grid-cols-2 sm:grid-rows-1">
          <div className="relative border-b border-[#171717] p-4 sm:border-r sm:border-b-0">
            <div className="mx-auto w-[min(220px,85%)] border border-[#171717] bg-[#faf8f2] shadow-[12px_12px_0_rgba(0,0,0,0.07)]">
              <div className="border-b border-[#171717] py-3 text-center font-mono text-[8px] tracking-[0.1em] uppercase">PayWatan</div>
              <div className="p-4">
                <h3 className="mb-4 text-xl leading-none font-semibold tracking-[-0.04em]">Send mobile data home.</h3>
                <div className="border border-[#171717] p-2.5 font-mono text-[9px]">+93 7XX XXX XXX</div>
                <p className="my-2.5 font-mono text-[7px] text-[#77736a] uppercase">Operator detected</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {['5 GB', '10 GB', '20 GB', 'Airtime'].map((item, index) => <span key={item} className={`border border-[#171717] p-2 text-[9px] ${index === 1 ? 'bg-accent' : ''}`}>{item}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="mb-4 text-[clamp(1.5rem,3.5vw,2rem)] leading-none font-semibold tracking-[-0.05em] sm:mb-7">Four steps.<br />No friction.</h3>
            {[
              ["01", "Number"], ["02", "Operator"], ["03", "Package"], ["04", "Pay & send"],
            ].map(([number, label], index) => (
              <div key={number} className="grid grid-cols-[30px_1fr_auto] items-center gap-3 border-t border-[#171717] py-2.5 text-[10px] last:border-b sm:py-3">
                <b className="font-mono text-[8px] font-medium">{number}</b><span>{label}</span><span>{index < 3 ? "✓" : "→"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="project-caption">Mobile top-up / Afghanistan</span>
    </div>
  );
}

export function EngineeringVisual() {
  const systems = [
    "Identity & permissions",
    "Billing & payments",
    "APIs & integrations",
    "AI / LLM workflows",
    "Queues & background processing",
    "Data & tenant isolation",
    "Testing / infrastructure / deployment",
  ];

  return (
    <div className="project-visual bg-[#ff6338] text-[#17120f]">
      <div className="product-window border-[#7b250d] bg-[#ff6a3f]">
        <WindowBar path="System architecture" mode="Production" />
        <div className="grid h-[calc(100%-2.5rem)] grid-rows-[1fr_240px] sm:grid-cols-[0.95fr_1.05fr] sm:grid-rows-1">
          <div className="border-b border-[#7b250d] p-5 sm:border-r sm:border-b-0 lg:p-6">
            <h3 className="mb-4 text-[clamp(1.55rem,3.2vw,2.2rem)] leading-none font-semibold tracking-[-0.05em]">Systems that survive real use.</h3>
            {systems.map((system, index) => (
              <div key={system} className="flex justify-between gap-3 border-t border-[#7b250d] py-2 text-[9px] last:border-b sm:text-[10px]">
                <span>{system}</span><b className="font-mono text-[8px] font-medium">0{index + 1}</b>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden font-mono text-[8px] tracking-[0.08em] uppercase">
            <div className="absolute inset-[14%] border border-[#7b250d]">
              <div className="absolute inset-[16%] border border-[#7b250d]" />
              <div className="absolute inset-[32%] grid place-items-center border border-[#7b250d] bg-[#ff6338] text-center">Product<br />core</div>
              <span className="absolute -top-3 left-4 bg-[#ff6a3f] px-1">Interface</span>
              <span className="absolute top-1/2 -right-8 bg-[#ff6a3f] px-1">Services</span>
              <span className="absolute -bottom-3 left-1/3 bg-[#ff6a3f] px-1">Data</span>
              <span className="absolute top-1/2 -left-6 bg-[#ff6a3f] px-1">Ops</span>
              <span className="absolute top-[18%] right-[8%] bg-[#ff6a3f] px-1">AI / LLM</span>
            </div>
          </div>
        </div>
      </div>
      <span className="project-caption">Architecture beyond the interface</span>
    </div>
  );
}
