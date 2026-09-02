"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, type MouseEvent } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navigation } from "@/data/portfolio";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  const followLink = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onClose();
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-40 bg-background pt-[78px] lg:hidden"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="page-container flex h-full flex-col overflow-y-auto border-x border-line/70">
            <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
              <p className="technical-label text-muted">Navigation / Index</p>
              <p className="technical-label text-muted">Qais Yousuf</p>
            </div>
            <nav aria-label="Mobile navigation" className="flex-1">
              {navigation.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(event) => followLink(event, item.toLowerCase())}
                  initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.38,
                    delay: reduceMotion ? 0 : 0.04 + index * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-[42px_1fr] items-baseline border-b border-line px-4 py-3 sm:grid-cols-[52px_1fr] sm:px-6"
                >
                  <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                    0{index + 1}
                  </span>
                  <span className="text-[clamp(2.25rem,11vw,3.5rem)] leading-none font-semibold tracking-[-0.055em]">
                    {item}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="grid grid-cols-[1fr_auto] items-end gap-4 border-t border-foreground px-4 py-4 sm:px-6">
              <div>
                <p className="technical-label mb-2 text-muted">Nordic / EU</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-end gap-0.5" aria-hidden="true">
                    {[5, 8, 11, 14].map((height) => <span key={height} className="w-[3px] bg-accent" style={{ height }} />)}
                  </div>
                  <p className="technical-label">Available for selected work</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
