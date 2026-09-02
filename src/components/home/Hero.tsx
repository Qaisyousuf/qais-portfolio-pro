"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";

const facts = [
  ["Core", ".NET / Next.js"],
  ["Focus", "SaaS / Platforms"],
  ["Strength", "Architecture / Product"],
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const headline: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.09 },
    },
  };

  return (
    <main id="top" className="page-container">
      <section className="grid min-h-[calc(100svh-78px)] grid-rows-[auto_1fr_auto] border-b border-foreground">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="technical-label grid grid-cols-2 py-5 text-muted lg:grid-cols-3 lg:py-[22px]"
        >
          <span>Software Engineer / Product Builder</span>
          <span className="hidden text-center lg:block">10+ years in product engineering</span>
          <span className="text-right">Nordic / EU</span>
        </motion.div>

        <div className="flex items-center py-[4vh]">
          <motion.h1
            variants={headline}
            initial="hidden"
            animate="visible"
            className="text-[clamp(4.25rem,13vw,12.8125rem)] leading-[0.77] font-extrabold tracking-[-0.072em] uppercase"
          >
            <motion.span variants={fadeUp} className="block">
              Software
            </motion.span>
            <motion.span variants={fadeUp} className="outline-text block">
              Without
            </motion.span>
            <motion.span variants={fadeUp} className="block">
              The noise.
            </motion.span>
          </motion.h1>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: reduceMotion ? 0 : 0.32 }}
          className="grid items-end gap-9 pt-6 pb-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(310px,0.6fr)] lg:gap-15 lg:pt-[26px] lg:pb-[34px]"
        >
          <p className="max-w-[900px] text-[clamp(1.5rem,2.7vw,2.625rem)] leading-[1.03] tracking-[-0.04em]">
            I build digital products with strong architecture, clean interfaces and the technical depth to survive real-world use.
          </p>

          <dl className="border-t border-foreground">
            {facts.map(([term, detail]) => (
              <div
                key={term}
                className="flex items-center justify-between gap-6 border-b border-line py-[11px] text-xs"
              >
                <dt className="font-mono text-muted">{term}</dt>
                <dd className="text-right font-semibold">{detail}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>
    </main>
  );
}
