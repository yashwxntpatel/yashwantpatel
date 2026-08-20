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
    index: "01",
    title: "ARCIGN",
    category: "Architecture & Interior Design",
    description:
      "A bespoke architecture and interior studio website built around editorial composition, material-led visuals, and an immersive premium feel.",
    url: "https://arcign.vercel.app/",
    tags: ["Architecture", "Editorial", "Motion"],
    accent: "#c9a87a",
    bg: "from-[#1a140d] to-[#0a0805]",
  },
  {
    index: "02",
    title: "Yàn Yàn",
    category: "Modern Chinese Fine Dining",
    description:
      "A refined digital experience for a Bangalore fine-dining destination, using atmosphere, typography, and visual storytelling to set the tone before the first reservation.",
    url: "https://yanxyanx.vercel.app/",
    tags: ["Hospitality", "Editorial", "Experience"],
    accent: "#d7a86e",
    bg: "from-[#17100b] to-[#080604]",
  },
  {
    index: "03",
    title: "Aditya XB",
    category: "Personal Brand & Creator",
    description:
      "A personal-brand experience designed to present Aditya XB through a strong visual identity, creator-focused storytelling, and a direct portfolio-first journey.",
    url: "https://adityaxb.netlify.app/",
    tags: ["Personal Brand", "Portfolio", "Storytelling"],
    accent: "#ff6b3d",
    bg: "from-[#1a0f08] to-[#0a0503]",
  },
  {
    index: "04",
    title: "Kran Marketing",
    category: "Real Estate Marketing",
    description:
      "A conversion-first digital presence for a real-estate marketing partner focused on qualified leads, sales systems, performance marketing, and developer growth.",
    url: "https://kranmarketing.com/",
    tags: ["Agency", "Lead Gen", "B2B"],
    accent: "#4dd4a8",
    bg: "from-[#0a1612] to-[#040a08]",
  },
  {
    index: "05",
    title: "CAHOOT",
    category: "Men's Fashion & E-commerce",
    description:
      "An elevated menswear storefront built around trend-led collections, statement-making everyday fashion, and a strong culture-first brand point of view.",
    url: "https://cahoot.in/",
    tags: ["Fashion", "E-commerce", "Brand"],
    accent: "#c8a56b",
    bg: "from-[#15110d] to-[#080604]",
  },
  {
    index: "06",
    title: "Arun Mathews",
    category: "Clinical Psychology & Relationships",
    description:
      "A professional practice website positioning Arun Mathews around clinical psychology, relationships, and NPD-focused support through a structured, trust-led experience.",
    url: "https://arunmathews.com/",
    tags: ["Healthcare", "Professional", "Conversion"],
    accent: "#8da7ff",
    bg: "from-[#0c101b] to-[#04050a]",
  },
];

const shotUrl = (url: string) =>
  `https://image.thum.io/get/width/1000/crop/650/noanimate/${encodeURI(url)}`;

const ProjectCard = memo(({ p }: { p: Project }) => {
  const imgSrc = useMemo(() => shotUrl(p.url), [p.url]);

  const glowStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at 30% 30%, ${p.accent}, transparent 60%)`,
    }),
    [p.accent],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Open ${p.title} website`}
      >
        <div
          className={`relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${p.bg} aspect-[16/11]`}
        >
          <div
            className="absolute -inset-32 opacity-25 blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-50"
            style={glowStyle}
          />

          <div className="absolute inset-4 md:inset-6 rounded-xl overflow-hidden border border-foreground/10 shadow-elegant glass">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-foreground/10 bg-background/40">
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="h-2 w-2 rounded-full bg-foreground/15" />

              <span className="ml-2 text-[9px] font-mono text-muted-foreground truncate">
                {p.url
                  .replace("https://", "")
                  .replace("www.", "")
                  .replace(/\/$/, "")}
              </span>
            </div>

            <div className="relative h-[calc(100%-29px)] bg-background overflow-hidden">
              <img
                src={imgSrc}
                alt={`${p.title} — ${p.category}`}
                loading="lazy"
                decoding="async"
                width={1000}
                height={650}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute inset-0 bg-foreground/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="rounded-full bg-foreground text-background px-4 py-2 text-[11px] font-medium flex items-center gap-2">
              View live
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
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

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {p.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full glass px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                {tag}
              </span>
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
          <span className="h-px w-10 bg-accent" />
          Selected Work · 2023—2026
        </div>

        <h2 className="h-display text-5xl md:text-7xl lg:text-8xl">
          Work that{" "}
          <span className="font-serif italic text-gradient-amber">
            moves
          </span>{" "}
          the needle.
        </h2>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Six recent builds — each designed to do a job, not just fill a
          screen. Tap any project to explore the live experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.index} p={project} />
        ))}
      </div>

      <div className="mt-32 flex justify-center">
        <Magnetic>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full glass px-7 py-4 text-sm hover:border-accent/40 transition-colors"
          >
            Want one like these?
            <span className="text-accent" aria-hidden="true">
              →
            </span>
          </a>
        </Magnetic>
      </div>
    </div>
  </section>
));

Work.displayName = "Work";
