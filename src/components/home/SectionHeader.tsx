import { Reveal } from "@/components/home/Reveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
};

export function SectionHeader({ index, label, title, description }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 grid gap-7 md:mb-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      <p className="technical-label text-muted">{index} / {label}</p>
      <div>
        <h2 className="max-w-[1100px] text-[clamp(3rem,6vw,5.75rem)] leading-[0.92] font-bold tracking-[-0.05em]">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-[720px] text-[15px] leading-7 text-muted">{description}</p>
        )}
      </div>
    </Reveal>
  );
}
