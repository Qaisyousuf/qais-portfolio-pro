import Image from "next/image";

type ProfileMarkProps = {
  compact?: boolean;
};

export function ProfileMark({ compact = false }: ProfileMarkProps) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/profile.jpg"
        alt="Qais Yousuf"
        width={34}
        height={34}
        priority
        className="size-[34px] border border-foreground object-cover"
      />
      <span className={`font-bold tracking-[-0.035em] ${compact ? "text-sm" : "text-[15px]"}`}>
        {compact ? "QY" : "Qais Yousuf"}
      </span>
    </span>
  );
}
