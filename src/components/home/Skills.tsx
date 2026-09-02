import { Reveal } from "@/components/home/Reveal";
import { SectionHeader } from "@/components/home/SectionHeader";
import { skills } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="section-shell scroll-mt-[78px]">
      <SectionHeader index="02" label="Skills" title="Full-stack, but with real system depth." />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="flex min-h-[430px] min-w-0 flex-col justify-between bg-foreground p-6 text-background [clip-path:polygon(0_0,96%_0,100%_8%,100%_100%,0_100%)] sm:min-h-[560px] sm:p-8">
          <p className="technical-label opacity-60">Primary capability</p>
          <p className="text-[clamp(3.1rem,8vw,7.375rem)] leading-[0.79] font-extrabold tracking-[-0.075em] uppercase">Product<br />Engineering</p>
        </Reveal>

        <div className="grid min-w-0 gap-x-5 sm:grid-cols-2">
          {skills.map((skill, index) => (
            <Reveal key={skill.index} delay={index * 0.05} className="flex min-h-[230px] flex-col justify-between border-t border-foreground pt-4 pb-6 sm:min-h-[270px]">
              <span className="font-mono text-[10px] text-muted">{skill.index}</span>
              <div>
                <h3 className="text-3xl font-semibold tracking-[-0.045em]">{skill.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.65] text-muted">{skill.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
