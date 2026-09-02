const links = [
  ["GitHub", "https://github.com/Qaisyousuf"],
  ["LinkedIn", "https://www.linkedin.com/in/qais-yousuf-75261b125/"],
] as const;

export function Footer() {
  return (
    <footer className="page-container flex flex-col gap-4 border-t border-line py-5 font-mono text-[9px] tracking-[0.09em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between">
      <span>Qais Yousuf © {new Date().getFullYear()}</span>
      <span>Software Engineer / Product Builder</span>
      <div className="flex gap-5">
        {links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">{label} ↗</a>)}
      </div>
    </footer>
  );
}
