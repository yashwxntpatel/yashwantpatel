import { memo } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";

const marqueeText = "Let's build something that actually works · Available for Q3 2026 · Premium frontend & design ·";

export const CTA = memo(() => (
  <section id="contact" className="relative py-32 md:py-44 overflow-hidden">
    <div className="absolute top-0 left-0 right-0 overflow-hidden border-y border-border/40 py-8 md:py-12" aria-hidden="true">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-serif italic text-6xl md:text-8xl text-foreground/10 px-8">
            {marqueeText}
          </span>
        ))}
      </div>
    </div>

    <div className="container-luxe pt-40 md:pt-56">
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-radial blur-3xl opacity-60" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full glass px-4 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" aria-hidden="true" />
            Currently taking 2 projects
          </div>
          <h2 className="h-display text-6xl md:text-8xl lg:text-9xl mb-8">
            Let's build<br />something that<br />
            <span className="font-serif italic text-gradient-amber">actually works.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12">
            Brief me on your project. I reply within 24 hours with timing, scope, and a straight answer on whether I'm the right fit.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Magnetic strength={0.3}>
              <a
                href="mailto:yashwantpatel.in@gmail.com?subject=Project%20inquiry"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-amber px-8 py-5 text-base font-medium text-accent-foreground shadow-glow"
              >
                Start a project
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="https://linkedin.com/in/yashwantxpatel"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full glass px-8 py-5 text-base hover:border-foreground/20"
              >
                LinkedIn
              </a>
            </Magnetic>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-12 border-t border-border/60 text-sm">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Email</div>
              <a href="mailto:yashwantpatel.in@gmail.com" className="hover:text-accent transition-colors">yashwantpatel.in@gmail.com</a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Phone</div>
              <a href="tel:+919509940400" className="hover:text-accent transition-colors">+91 95099 40400</a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Based in</div>
              <span>Bangalore, India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    <footer className="container-luxe mt-32 pt-10 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
      <div>© {new Date().getFullYear()} Yashwant Patel. All Rights Reserved.</div>
      <div className="font-mono">Bangalore → World</div>
    </footer>
  </section>
));

CTA.displayName = "CTA";
