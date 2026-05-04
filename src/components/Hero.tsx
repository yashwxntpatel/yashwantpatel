import { memo, lazy, Suspense } from "react";
import { motion, type Variants } from "framer-motion";
import { Magnetic } from "./Magnetic";

const HeroScene = lazy(() => import("./HeroScene").then(m => ({ default: m.HeroScene })));

const EASE = [0.16, 1, 0.3, 1] as const;
const WA_LINK = "https://wa.me/919509940400";

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: EASE, delay: 0.1 + i * 0.08 },
  }),
};

const headlineRows = [
  ["I", "build", "websites"],
  ["that", "create"],
];

export const Hero = memo(() => (
  <section id="top" className="relative min-h-screen w-full overflow-hidden grain">
    <div className="absolute inset-0 z-0">
      <Suspense fallback={<div className="h-full w-full bg-gradient-radial" />}>
        <HeroScene />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_85%)] pointer-events-none" />
    </div>

    <div className="container-luxe relative z-10 flex min-h-screen flex-col justify-center pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 inline-flex w-fit items-center gap-3 rounded-full glass px-4 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        Available for Q3 — 2 slots open
      </motion.div>

      <h1 className="h-display text-[clamp(3rem,10vw,9rem)] max-w-[14ch]">
        {headlineRows.map((row, ri) => (
          <span key={ri} className="block">
            {row.map((w, wi) => (
              <span key={wi} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <motion.span
                  variants={word}
                  initial="hidden"
                  animate="show"
                  custom={ri * 3 + wi}
                  className="inline-block text-gradient"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
        <span className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={word}
            initial="hidden"
            animate="show"
            custom={6}
            className="inline-block font-serif italic text-gradient-amber"
          >
            impact.
          </motion.span>
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
      >
        Frontend developer & UI/UX designer crafting premium, high-converting digital experiences.
        <span className="text-foreground"> 100+ websites shipped</span> for brands, founders, and studios worldwide.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="mt-12 flex flex-wrap items-center gap-4"
      >
        {/* See selected work — scrolls to work section */}
        <Magnetic strength={0.3}>
          <a
            href="#work"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-amber px-7 py-4 text-sm font-medium text-accent-foreground shadow-glow transition-shadow hover:shadow-[0_0_120px_hsl(28_95%_58%/0.6)]"
          >
            <span>See selected work</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </Magnetic>

        {/* Start a project — opens WhatsApp */}
        <Magnetic strength={0.25}>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full glass px-7 py-4 text-sm font-medium hover:border-foreground/20 transition-colors"
          >
            <span>Start a project</span>
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-foreground/40 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </div>
  </section>
));

Hero.displayName = "Hero";
