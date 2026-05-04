import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";

const groups = [
  { label: "Design", items: ["UI/UX Design", "Visual Design", "Wireframing", "Prototyping", "Motion & Interaction", "Design Systems"] },
  { label: "Development", items: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "JavaScript (ES6+)", "Responsive / Mobile-First"] },
  { label: "Tools", items: ["Figma", "Framer", "Webflow", "Illustrator", "Photoshop", "GitHub"] },
  { label: "Strategy", items: ["Conversion Optimisation", "Brand Positioning", "Digital Marketing", "Information Architecture", "Client Workshops"] },
];

export const Skills = memo(() => {
  const [active, setActive] = useState(0);
  const handleClick = useCallback((i: number) => setActive(i), []);

  return (
    <section id="skills" className="relative py-32 md:py-44 border-t border-border/40">
      <div className="container-luxe">
        <div className="mb-20 max-w-3xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> Capabilities
          </div>
          <h2 className="h-display text-5xl md:text-7xl">
            A full stack of <span className="font-serif italic text-gradient-amber">design + code</span>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {groups.map((g, i) => (
              <button
                key={g.label}
                onMouseEnter={() => handleClick(i)}
                onClick={() => handleClick(i)}
                className={`relative text-left rounded-2xl px-6 py-5 transition-all duration-500 whitespace-nowrap ${active === i ? "glass-strong" : "hover:bg-foreground/[0.03]"}`}
              >
                <div className="flex items-center justify-between gap-6">
                  <span className={`text-2xl md:text-3xl font-medium tracking-tight transition-colors ${active === i ? "text-foreground" : "text-muted-foreground"}`}>
                    {g.label}
                  </span>
                  <span className={`font-mono text-xs transition-opacity ${active === i ? "opacity-100 text-accent" : "opacity-40"}`}>
                    0{i + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 relative min-h-[400px]">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-3xl p-8 md:p-12 h-full"
            >
              <div className="flex flex-wrap gap-3">
                {groups[active].items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm hover:border-accent/60 hover:bg-accent/5 transition-all cursor-default"
                    data-cursor="hover"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-border/60 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Languages</div>
                  <div>Hindi (Native) · English (Professional)</div>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Based in</div>
                  <div>Bangalore, India · Open Worldwide</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";
