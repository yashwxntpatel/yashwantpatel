import { memo } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    n: "01", title: "Strategy", sub: "Understand the business",
    body: "Goals, audience, conversion targets. Before pixels, we map what success actually looks like — leads, revenue, retention.",
    deliverables: ["Brief & goals", "Audience map", "Success metrics"],
  },
  {
    n: "02", title: "Design", sub: "Craft the experience",
    body: "Wireframes → high-fidelity in Figma. Premium visual language, conversion-driven hierarchy, every interaction prototyped.",
    deliverables: ["Wireframes", "Visual system", "Interactive prototype"],
  },
  {
    n: "03", title: "Build", sub: "Ship clean code",
    body: "React + Tailwind + Framer Motion. Pixel-perfect, performant, accessible. Smooth on every device, every browser.",
    deliverables: ["Production code", "CMS / integrations", "QA & launch"],
  },
  {
    n: "04", title: "Optimise", sub: "Iterate on real data",
    body: "Track what matters. A/B test what counts. The site keeps getting sharper after launch — not a one-shot deliverable.",
    deliverables: ["Analytics setup", "A/B tests", "Ongoing iteration"],
  },
];

export const Process = memo(() => (
  <section id="process" className="relative py-32 md:py-44">
    <div className="container-luxe">
      <div className="mb-20 max-w-3xl">
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-accent" /> How I work
        </div>
        <h2 className="h-display text-5xl md:text-7xl">
          Four steps. <span className="font-serif italic text-gradient-amber">Zero filler.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-surface/50 p-8 md:p-10 hover:border-accent/40 transition-colors"
          >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative">
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.sub}</span>
              </div>
              <h3 className="h-display text-4xl md:text-5xl mb-5">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">{s.body}</p>
              <ul className="space-y-2 pt-6 border-t border-border/60">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />{d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

Process.displayName = "Process";
