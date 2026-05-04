import { memo } from "react";
import { motion } from "framer-motion";

const chapters = [
  {
    year: "2022", title: "Walked away from the script",
    body: "Left B.Tech mid-program. The traditional path didn't fit — I wanted to build, ship, and learn from real clients, not lecture halls.",
  },
  {
    year: "2022—23", title: "Earned my craft on live work",
    body: "Built brand identities, social systems, and marketing kits for 20+ early-stage clients. Adobe Suite became muscle memory through real deadlines.",
  },
  {
    year: "2023", title: "Crossed into code",
    body: "Started shipping React + Tailwind interfaces. Conversion psychology + clean frontend code became the unfair advantage.",
  },
  {
    year: "Now", title: "100+ websites in. Just getting started.",
    body: "Working with brands, founders and studios across India, MENA, EU and NA. 99% client satisfaction. Open to senior frontend & design roles.",
  },
];

export const Story = memo(() => (
  <section id="story" className="relative py-32 md:py-44 overflow-hidden">
    <div className="container-luxe">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> The Story
            </div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl">
              I didn't follow the path.<br />
              <span className="font-serif italic text-gradient-amber">I built one.</span>
            </h2>
            <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              No agency cushion. No CS degree. Just paid client work, every week, for years. This is how I got here.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />
          <div className="space-y-16">
            {chapters.map((c, i) => (
              <motion.div
                key={c.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-10"
              >
                <span className="absolute left-0 top-2 h-4 w-4 rounded-full bg-background border-2 border-accent shadow-glow" />
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">{c.year}</div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
));

Story.displayName = "Story";
