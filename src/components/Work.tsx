import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";

interface Project {
  index: string;
  title: string;
  category: string;
  description: string;
  url: string;
  tags: string[];
  accent: string;
  bg: string;
}

const projects: Project[] = [
  {
    index: "01", title: "ARCIGN", category: "Architecture & Interior Studio",
    description: "Premium website for a bespoke architecture studio. Refined visual language, immersive layout, high-end spatial aesthetics.",
    url: "https://arcign.vercel.app/",
    tags: ["Brand Site", "Editorial", "Motion"], accent: "#c9a87a", bg: "from-[#1a140d] to-[#0a0805]",
  },
  {
    index: "02", title: "Aditya XB", category: "Personal Brand · Creator",
    description: "Scroll-driven personal brand site for a content creator — built to convert profile visits into brand collaborations.",
    url: "https://adityaxb.netlify.app/",
    tags: ["Portfolio", "Scroll-driven", "Conversion"], accent: "#ff6b3d", bg: "from-[#1a0f08] to-[#0a0503]",
  },
  {
    index: "03", title: "Kran Marketing", category: "Real Estate Digital Agency",
    description: "Full website for an agency serving 150+ developer clients across 7 countries. Conversion-first design with strong lead capture.",
    url: "https://kranmarketing.com/",
    tags: ["Agency", "Lead Gen", "B2B"], accent: "#4dd4a8", bg: "from-[#0a1612] to-[#040a08]",
  },
  {
    index: "04", title: "CAVORE", category: "Luxury Hospitality · After-Dark",
    description: "Dark, cinematic landing for a luxury hospitality brand. Atmospheric typography and immersive visual hierarchy.",
    url: "https://xcavore.vercel.app/",
    tags: ["Hospitality", "Cinematic", "Brand"], accent: "#b8474a", bg: "from-[#180a0c] to-[#0a0405]",
  },
  {
    index: "05", title: "Dev × Studio", category: "Digital Systems Agency",
    description: "Agency website structured for credibility — clear service architecture built to drive high-quality inbound inquiries.",
    url: "https://devxstudiox.vercel.app/",
    tags: ["Agency", "Systems", "Inbound"], accent: "#7c8cff", bg: "from-[#0c0e1a] to-[#04050a]",
  },
  {
    index: "06", title: "Lumière Atelier", category: "Fashion · Couture House",
    description: "Editorial-grade storefront for a couture atelier — runway-inspired typography, slow reveals, and a quietly luxurious checkout.",
    url: "https://www.chanel.com/",
    tags: ["Fashion", "Editorial", "E-commerce"], accent: "#d4b896", bg: "from-[#15110d] to-[#080604]",
  },
];

const shotUrl = (url: string) =>
  `https://image.thum.io/get/width/900/crop/600/${encodeURI(url)}`;

const ProjectCard = memo(({ p }: { p: Project }) => {
  const imgSrc = useMemo(() => shotUrl(p.url), [p.url]);
  const glowStyle = useMemo(() => ({
    background: `radial-gradient(circle at 30% 30%, ${p.accent}, transparent 60%)`,
  }), [p.accent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className={`relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${p.bg} aspect-[16/11]`}>
          <div className="absolute -inset-32 opacity-25 blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-50" style={glowStyle} />
          <div className="absolute inset-4 md:inset-6 rounded-xl overflow-hidden border border-foreground/10 shadow-elegant glass">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-foreground/10 bg-background/40">
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="ml-2 text-[9px] font-mono text-muted-foreground truncate">{p.url.replace('https://', '').replace(/\/$/, '')}</span>
            </div>
            <div className="relative h-[calc(100%-29px)] bg-background overflow-hidden">
              <img
                src={imgSrc}
                alt={`${p.title} — ${p.category}`}
                loading="lazy"
                decoding="async"
                width={900}
                height={600}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="rounded-full bg-foreground text-background px-4 py-2 text-[11px] font-medium flex items-center gap-2">
              View live
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span style={{ color: p.accent }}>{p.index}</span>
            <span className="h-px w-6 bg-border" />
            <span className="truncate">{p.category}</span>
          </div>
          <h3 className="h-display text-3xl md:text-4xl">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full glass px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground">{t}</span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export const Work = memo(() => (
  <section id="work" className="relative py-32 md:py-44">
    <div className="container-luxe">
      <div className="mb-16 md:mb-24 max-w-3xl">
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-accent" /> Selected Work · 2023—2026
        </div>
        <h2 className="h-display text-5xl md:text-7xl lg:text-8xl">
          Work that <span className="font-serif italic text-gradient-amber">moves</span> the needle.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Six recent builds — each shipped to convert, not just to look good. Tap to open the live site.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((p) => <ProjectCard key={p.index} p={p} />)}
      </div>
      <div className="mt-32 flex justify-center">
        <Magnetic>
          <a href="#contact" className="inline-flex items-center gap-3 rounded-full glass px-7 py-4 text-sm hover:border-accent/40 transition-colors">
            Want one like these? <span className="text-accent" aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>
    </div>
  </section>
));

Work.displayName = "Work";
