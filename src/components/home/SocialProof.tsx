import { Reveal } from "@/components/home/Reveal";
import { socialProof } from "@/data/socialProof";

export function SocialProof() {
  return (
    <section aria-label="Experience and product delivery" className="border-b border-foreground">
      <Reveal>
        <dl className="grid grid-cols-2 border-x border-line lg:grid-cols-4">
          {socialProof.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex min-h-36 flex-col justify-between p-4 sm:min-h-40 sm:p-5 lg:min-h-44 ${index % 2 === 0 ? "border-r border-line" : ""} ${index < 2 ? "border-b border-line lg:border-b-0" : ""} ${index > 0 ? "lg:border-l lg:border-line" : ""} lg:border-r-0`}
            >
              <dt className="font-mono text-[9px] tracking-[0.1em] text-muted uppercase">Proof / 0{index + 1}</dt>
              <dd>
                <span className="block text-[clamp(1.5rem,2.6vw,2.5rem)] leading-none font-semibold tracking-[-0.045em] uppercase">{metric.value}</span>
                <span className="mt-2 block max-w-56 text-[11px] leading-4 text-muted">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {socialProof.testimonial && (
        <figure className="border-t border-line py-8">
          <blockquote>{socialProof.testimonial.quote}</blockquote>
          <figcaption>{socialProof.testimonial.author}</figcaption>
        </figure>
      )}
    </section>
  );
}
