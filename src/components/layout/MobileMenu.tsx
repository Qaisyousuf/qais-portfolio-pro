"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const navigation = ["Work", "Skills", "Tools", "Solutions", "About", "Contact"];

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
        >
          <div className="page-container flex h-full flex-col border-x border-line/70">
            <nav aria-label="Mobile navigation" className="flex-1">
              {navigation.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.38,
                    delay: reduceMotion ? 0 : 0.04 + index * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-baseline justify-between border-b border-line px-4 py-3.5 sm:px-7 sm:py-4"
                >
                  <span className="text-[clamp(2.6rem,11vw,5rem)] leading-none font-semibold tracking-[-0.055em]">
                    {item}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-foreground px-4 py-5 sm:px-7">
              <p className="technical-label text-muted">Nordic / EU</p>
              <div className="flex items-end gap-0.5" aria-hidden="true">
                {[5, 8, 11, 14].map((height) => (
                  <span
                    key={height}
                    className="w-[3px] bg-accent"
                    style={{ height }}
                  />
                ))}
              </div>
              <p className="technical-label text-right">Available for selected work</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
