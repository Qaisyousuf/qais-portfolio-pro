"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ProfileMark } from "@/components/layout/ProfileMark";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navigation } from "@/data/portfolio";

function SignalBars() {
  return (
    <span className="flex h-3.5 w-[22px] items-end gap-0.5" aria-hidden="true">
      {[5, 8, 11, 14].map((height) => (
        <span
          key={height}
          className="w-[3px] bg-[#0d0e10]"
          style={{ height }}
        />
      ))}
    </span>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <header className="sticky top-0 z-50">
      <div className="page-container relative z-50 grid h-[78px] grid-cols-[1fr_auto] items-center border-b border-foreground bg-nav backdrop-blur-[14px] lg:grid-cols-[190px_minmax(0,1fr)_auto] xl:grid-cols-[220px_minmax(0,1fr)_auto]">
        <a
          href="#top"
          className="w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          aria-label="Qais Yousuf, home"
        >
          <ProfileMark />
        </a>

        <nav aria-label="Primary navigation" className="hidden justify-center gap-4 lg:flex xl:gap-7">
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="technical-label group relative py-2 font-medium"
            >
              {item}
              <span className="absolute inset-x-0 bottom-1 h-px origin-right scale-x-0 bg-foreground transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="technical-label flex h-10 items-center gap-2.5 border border-foreground bg-accent px-3 font-medium text-[#0d0e10]">
            <SignalBars />
            <span>Available for selected work</span>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid size-10 cursor-pointer place-items-center border border-foreground bg-foreground text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="size-[18px]" strokeWidth={1.7} />
            ) : (
              <Menu aria-hidden="true" className="size-[18px]" strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
