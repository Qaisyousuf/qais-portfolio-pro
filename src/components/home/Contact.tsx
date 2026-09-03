import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-[78px] pt-24 pb-8 lg:pt-30">
      <Reveal>
        <p className="technical-label mb-10 text-muted">07 / Contact</p>
        <h2 className="mb-12 text-[clamp(4.5rem,12vw,11.875rem)] leading-[0.78] font-extrabold tracking-[-0.072em] uppercase">
          <span className="block">Have a</span><span className="outline-text block">serious</span><span className="block">idea?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <a href="mailto:seo@seosoft.dk" className="group flex items-center justify-between border-y border-foreground py-5 text-[clamp(1.5rem,3vw,2.625rem)] tracking-[-0.04em]">
          <span>Let&apos;s build it properly.</span>
          <ArrowUpRight className="size-9 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-11" strokeWidth={1.2} />
        </a>
      </Reveal>
    </section>
  );
}
