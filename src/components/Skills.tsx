import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

const groups = [
  {
    label: "Design",
    number: "01",
    description:
      "Design systems, visual direction, and interaction details that make interfaces feel intentional.",
    items: [
      "UI/UX Design",
      "Visual Design",
      "Wireframing",
      "Prototyping",
      "Motion & Interaction",
      "Design Systems",
    ],
  },
  {
    label: "Development",
    number: "02",
    description:
      "Frontend engineering focused on expressive interfaces, clean architecture, responsiveness, and speed.",
    items: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript (ES6+)",
      "Responsive / Mobile-First",
    ],
  },
  {
    label: "Tools",
    number: "03",
    description:
      "A practical creative toolkit covering design, prototyping, deployment, editing, and collaboration.",
    items: [
      "Figma",
      "Framer",
      "Webflow",
      "Illustrator",
      "Photoshop",
      "GitHub",
    ],
  },
  {
    label: "Strategy",
    number: "04",
    description:
      "The layer connecting design and development to positioning, conversion, content, and business goals.",
    items: [
      "Conversion Optimisation",
      "Brand Positioning",
      "Digital Marketing",
      "Information Architecture",
      "Client Workshops",
    ],
  },
];

let gsapModule: typeof import("gsap") | null = null;

export const Skills = memo(() => {
  const [active, setActive] = useState(0);
  const [gsapReady, setGsapReady] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = useCallback((index: number) => {
    setActive(index);
  }, []);

  /*
   * Load GSAP only when this section comes close to the viewport.
   * This keeps it out of the initial critical path.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting || cancelled) return;

        observer.disconnect();

        try {
          if (!gsapModule) {
            gsapModule = await import("gsap");
          }

          if (!cancelled) {
            setGsapReady(true);
          }
        } catch {
          // Graceful fallback to the existing Framer Motion animations.
        }
      },
      {
        rootMargin: "300px",
        threshold: 0.01,
      },
    );

    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  /*
   * Entrance animation + hover/tilt interactions.
   */
  useEffect(() => {
    if (!gsapReady || !gsapModule || !sectionRef.current) {
      return;
    }

    const { gsap } = gsapModule;

    const section = sectionRef.current;
    const panel = panelRef.current;

    if (!panel) return;

    const ctx = gsap.context(() => {
      const categoryElements = categoryRefs.current.filter(Boolean);
      const tiltElements = tiltRefs.current.filter(Boolean);

      gsap.fromTo(
        categoryElements,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        panel,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
        },
      );

      tiltElements.forEach((element) => {
        if (!element) return;

        const xTo = gsap.quickTo(element, "rotationY", {
          duration: 0.35,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(element, "rotationX", {
          duration: 0.35,
          ease: "power3.out",
        });

        const scaleTo = gsap.quickTo(element, "scale", {
          duration: 0.35,
          ease: "power3.out",
        });

        const handleMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();

          const pointerX =
            (event.clientX - rect.left) / rect.width;
          const pointerY =
            (event.clientY - rect.top) / rect.height;

          const rotateY = (pointerX - 0.5) * 8;
          const rotateX = (0.5 - pointerY) * 8;

          xTo(rotateY);
          yTo(rotateX);
        };

        const handleEnter = () => {
          scaleTo(1.015);
        };

        const handleLeave = () => {
          xTo(0);
          yTo(0);
          scaleTo(1);
        };

        element.addEventListener("pointermove", handleMove);
        element.addEventListener("pointerenter", handleEnter);
        element.addEventListener("pointerleave", handleLeave);

        (element as HTMLDivElement & { __cleanupTilt?: () => void }).__cleanupTilt =
          () => {
            element.removeEventListener("pointermove", handleMove);
            element.removeEventListener("pointerenter", handleEnter);
            element.removeEventListener("pointerleave", handleLeave);
          };
      });

      const magneticCategoryHandlers: Array<{
        element: HTMLButtonElement;
        move: (event: PointerEvent) => void;
        leave: () => void;
      }> = [];

      categoryElements.forEach((element) => {
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", {
          duration: 0.25,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(element, "y", {
          duration: 0.25,
          ease: "power3.out",
        });

        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();

          const offsetX =
            (event.clientX - rect.left - rect.width / 2) * 0.08;

          const offsetY =
            (event.clientY - rect.top - rect.height / 2) * 0.08;

          xTo(offsetX);
          yTo(offsetY);
        };

        const leave = () => {
          xTo(0);
          yTo(0);
        };

        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);

        magneticCategoryHandlers.push({
          element,
          move,
          leave,
        });
      });

      const handlePanelMove = (event: PointerEvent) => {
        const rect = panel.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) / rect.width) * 100;
        const y =
          ((event.clientY - rect.top) / rect.height) * 100;

        gsap.to(panel, {
          "--spotlight-x": `${x}%`,
          "--spotlight-y": `${y}%`,
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const resetPanelSpotlight = () => {
        gsap.to(panel, {
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
          duration: 0.6,
          ease: "power3.out",
        });
      };

      panel.addEventListener("pointermove", handlePanelMove);
      panel.addEventListener("pointerleave", resetPanelSpotlight);

      gsap.set(section, {
        "--spotlight-x": "50%",
        "--spotlight-y": "50%",
      });

      return () => {
        magneticCategoryHandlers.forEach(
          ({ element, move, leave }) => {
            element.removeEventListener("pointermove", move);
            element.removeEventListener("pointerleave", leave);
          },
        );

        tiltElements.forEach((element) => {
          if (!element) return;

          const node = element as HTMLDivElement & {
            __cleanupTilt?: () => void;
          };

          node.__cleanupTilt?.();
        });

        panel.removeEventListener(
          "pointermove",
          handlePanelMove,
        );

        panel.removeEventListener(
          "pointerleave",
          resetPanelSpotlight,
        );
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [gsapReady]);

  /*
   * Animate content whenever the active capability changes.
   */
  useEffect(() => {
    if (!gsapReady || !gsapModule || !panelRef.current) {
      return;
    }

    const { gsap } = gsapModule;

    const panel = panelRef.current;
    const items = panel.querySelectorAll("[data-skill-item]");
    const labels = panel.querySelectorAll("[data-skill-meta]");

    const timeline = gsap.timeline();

    timeline
      .fromTo(
        panel.querySelector("[data-capability-title]"),
        {
          opacity: 0,
          y: 14,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
      )
      .fromTo(
        labels,
        {
          opacity: 0,
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .fromTo(
        items,
        {
          opacity: 0,
          y: 16,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.055,
          ease: "back.out(1.4)",
        },
        "-=0.1",
      );

    return () => {
      timeline.kill();
    };
  }, [active, gsapReady]);

  const activeGroup = groups[active];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 md:py-44 border-t border-border/40 overflow-hidden"
    >
      <div className="container-luxe">
        <div className="mb-20 max-w-3xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" />
            Capabilities
          </div>

          <h2 className="h-display text-5xl md:text-7xl">
            A full stack of{" "}
            <span className="font-serif italic text-gradient-amber">
              design + code
            </span>
            .
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0">
            {groups.map((group, index) => {
              const isActive = active === index;

              return (
                <button
                  key={group.label}
                  ref={(element) => {
                    categoryRefs.current[index] = element;
                  }}
                  onMouseEnter={() => handleClick(index)}
                  onClick={() => handleClick(index)}
                  className={`group relative text-left rounded-2xl px-6 py-5 transition-all duration-500 whitespace-nowrap overflow-hidden ${
                    isActive
                      ? "glass-strong"
                      : "hover:bg-foreground/[0.03]"
                  }`}
                >
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-[10px] transition-all duration-500 ${
                          isActive
                            ? "text-accent opacity-100"
                            : "text-muted-foreground opacity-50"
                        }`}
                      >
                        {group.number}
                      </span>

                      <span
                        className={`text-2xl md:text-3xl font-medium tracking-tight transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {group.label}
                      </span>
                    </div>

                    <span
                      className={`text-lg transition-all duration-500 ${
                        isActive
                          ? "text-accent translate-x-0 opacity-100"
                          : "opacity-0 -translate-x-2"
                      }`}
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 relative">
            <div
              ref={panelRef}
              className="relative min-h-[430px] glass rounded-3xl p-8 md:p-12 overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), hsl(var(--accent) / 0.12), transparent 34%)",
              }}
            >
              <div
                ref={(element) => {
                  tiltRefs.current[active] = element;
                }}
                className="relative"
                style={{
                  transformStyle: "preserve-3d",
                  transformPerspective: "1000px",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                  <div>
                    <div
                      data-skill-meta
                      className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3"
                    >
                      Capability {activeGroup.number}
                    </div>

                    <h3
                      data-capability-title
                      className="text-4xl md:text-5xl font-medium tracking-tight"
                    >
                      {activeGroup.label}
                    </h3>
                  </div>

                  <div
                    data-skill-meta
                    className="max-w-sm text-sm leading-relaxed text-muted-foreground"
                  >
                    {activeGroup.description}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {activeGroup.items.map((item) => (
                    <span
                      key={item}
                      data-skill-item
                      className="group/item rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm transition-all duration-300 hover:border-accent/60 hover:bg-accent/5 hover:-translate-y-0.5 cursor-default"
                      data-cursor="hover"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent/70 transition-transform duration-300 group-hover/item:scale-150" />
                        {item}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                  <div data-skill-meta>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      Languages
                    </div>
                    <div>Hindi (Native) · English (Professional)</div>
                  </div>

                  <div data-skill-meta>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      Based in
                    </div>
                    <div>Bangalore, India · Open Worldwide</div>
                  </div>
                </div>

                <div
                  className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent/5 blur-3xl pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";
