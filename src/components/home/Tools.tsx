import Image from "next/image";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Reveal } from "@/components/home/Reveal";
import { tools } from "@/data/portfolio";

function ToolTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {tools.map((tool) => (
        <div key={tool.name} className="flex min-h-[126px] w-[150px] shrink-0 flex-col justify-between border-r border-foreground p-4 sm:w-[175px] sm:p-[18px]">
          <Image
            src={tool.logo}
            alt={hidden ? "" : `${tool.name} logo`}
            width={40}
            height={40}
            loading="eager"
            className={`size-10 object-contain ${"monochrome" in tool && tool.monochrome ? "dark:invert" : ""}`}
          />
          <div>
            <p className="text-[11px] font-bold">{tool.name}</p>
            <p className="mt-1 font-mono text-[8px] tracking-[0.08em] text-muted uppercase">{tool.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Tools() {
  return (
    <section id="tools" className="section-shell scroll-mt-[78px]">
      <SectionHeader
        index="04"
        label="Tools"
        title="The stack behind the products."
        description="A production-focused mix of application, data, AI integration, infrastructure and testing tools—shown with local technology marks instead of generic badges."
      />
      <Reveal className="overflow-hidden border-y border-foreground bg-white/20 dark:bg-white/[0.02]">
        <div className="tool-marquee flex w-max">
          <ToolTrack />
          <ToolTrack hidden />
        </div>
      </Reveal>
      <div className="mt-4 flex flex-col justify-between gap-2 font-mono text-[9px] tracking-[0.09em] text-muted uppercase sm:flex-row">
        <span>Application / Data / AI / Infrastructure / Quality</span>
        <span>Pause to inspect</span>
      </div>
    </section>
  );
}
