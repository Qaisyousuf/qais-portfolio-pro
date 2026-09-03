import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { projects } from "@/data/portfolio";
import { EngineeringVisual, PayWatanVisual, StakyVisual, SurveyVisual } from "@/components/projects/ProjectVisuals";

const visuals = {
  staky: StakyVisual,
  paywatan: PayWatanVisual,
  "a-survey": SurveyVisual,
  engineering: EngineeringVisual,
};

export function Projects() {
  return (
    <section id="work" className="section-shell scroll-mt-[78px]">
      <SectionHeader index="01" label="Selected work" title="Products with real workflows behind the interface." />

      <div className="space-y-8 lg:space-y-10">
        {projects.map((project) => {
          const Visual = visuals[project.id];
          const isInternal = project.href.startsWith("#");

          return (
            <Reveal key={project.id}>
              <article className="grid border-y border-foreground lg:min-h-[610px] lg:grid-cols-[330px_minmax(0,1fr)]">
                <div className="flex flex-col justify-between gap-12 border-b border-foreground py-6 lg:border-r lg:border-b-0 lg:py-7 lg:pr-7">
                  <div className="flex justify-between gap-4 font-mono text-[10px] tracking-[0.1em] text-muted uppercase">
                    <span>{project.index} / {project.category}</span>
                    <span>{project.market}</span>
                  </div>

                  <div>
                    {'status' in project && (
                      <p className={`mb-4 w-fit border border-foreground px-2.5 py-1.5 font-mono text-[9px] tracking-[0.08em] uppercase ${project.id === 'a-survey' ? 'bg-accent text-[#0d0e10]' : ''}`}>{project.status}</p>
                    )}
                    <h3 className="text-[clamp(2.8rem,4.5vw,4.25rem)] leading-[0.9] font-bold tracking-[-0.06em]">{project.title}</h3>
                    <p className="mt-5 max-w-[700px] text-[13px] leading-[1.65] text-muted lg:max-w-[275px]">{project.description}</p>
                  </div>

                  <div>
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => <span key={tag} className="border border-line px-2 py-1.5 font-mono text-[8px] tracking-[0.08em] uppercase">{tag}</span>)}
                    </div>
                    <a
                      href={project.href}
                      {...(!isInternal && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex items-center justify-between border-t border-line pt-4 text-[11px] font-semibold tracking-[0.02em]"
                    >
                      <span>{project.linkLabel}</span>
                      {isInternal ? <ArrowDown className="size-5 transition-transform group-hover:translate-y-1" strokeWidth={1.4} /> : <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.4} />}
                    </a>
                  </div>
                </div>
                <Visual />
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
