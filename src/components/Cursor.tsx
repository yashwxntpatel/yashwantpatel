import { useEffect, useRef, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const TRAIL_COUNT = 8;

const TRAIL_SIZES = [7, 4, 3, 3, 2, 2, 2, 2];
const TRAIL_OPACITIES = [1, 0.7, 0.55, 0.42, 0.3, 0.2, 0.12, 0.06];
const TRAIL_DELAYS = [0, 0.07, 0.14, 0.22, 0.31, 0.42, 0.55, 0.70];
const TRAIL_COLORS = [
  "#f97316", // lead star — full accent
  "#fb923c",
  "#fdba74",
  "#fff7ed",
  "#f97316",
  "#fed7aa",
  "#fff7ed",
  "#f97316",
];

// Each trail dot follows the previous one with increasing lag
const SPRING_CONFIG = (index: number) => ({
  stiffness: 520 - index * 48,
  damping: 38 + index * 3,
  mass: 0.4 + index * 0.08,
});

interface TrailDot {
  x: ReturnType<typeof useMotionValue>;
  y: ReturnType<typeof useMotionValue>;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}

const useTrail = (): TrailDot[] => {
  const dots: TrailDot[] = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const x = useMotionValue(-200);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useMotionValue(-200);
    const cfg = SPRING_CONFIG(i);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sx = useSpring(x, cfg);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sy = useSpring(y, cfg);
    dots.push({ x, y, sx, sy });
  }
  return dots;
};

export const Cursor = memo(() => {
  const trail = useTrail();
  const isHover = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      if (!isVisible.current) isVisible.current = true;

      // Lead dot follows mouse directly
      trail[0].x.set(e.clientX);
      trail[0].y.set(e.clientY);

      // Each subsequent dot follows the previous (chain effect)
      // Springs handle the lag — we just need to set the target
      for (let i = 1; i < TRAIL_COUNT; i++) {
        trail[i].x.set(e.clientX);
        trail[i].y.set(e.clientY);
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      isHover.current = !!t.closest('a, button, [data-cursor="hover"]');
    };

    const onLeave = () => {
      trail.forEach(dot => {
        dot.x.set(-200);
        dot.y.set(-200);
      });
      isVisible.current = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden="true"
    >
      {trail.map((dot, i) => {
        const size = TRAIL_SIZES[i];
        const isLead = i === 0;

        return (
          <motion.div
            key={i}
            style={{
              x: dot.sx,
              y: dot.sy,
              translateX: "-50%",
              translateY: "-50%",
              position: "fixed",
              top: 0,
              left: 0,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: TRAIL_COLORS[i],
              opacity: TRAIL_OPACITIES[i],
              willChange: "transform",
              // Lead star gets the glow, others are plain dots
              ...(isLead && {
                boxShadow: `
                  0 0 6px 2px rgba(249,115,22,0.9),
                  0 0 14px 5px rgba(249,115,22,0.5),
                  0 0 28px 10px rgba(249,115,22,0.2)
                `,
              }),
              // Tiny shimmer on 2nd dot
              ...(i === 1 && {
                boxShadow: "0 0 6px 2px rgba(249,115,22,0.4)",
              }),
            }}
            // Lead star scales up on hover
            animate={isLead ? undefined : undefined}
          />
        );
      })}

      {/* Hover scale ring — appears around lead star on interactive elements */}
      <HoverRing x={trail[0].sx} y={trail[0].sy} />
    </div>
  );
});

Cursor.displayName = "Cursor";

// Subtle expanding ring that appears when hovering links/buttons
const HoverRing = memo(({
  x,
  y,
}: {
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) => {
  const isHover = useRef(false);
  const scale = useMotionValue(0);
  const opacity = useMotionValue(0);
  const sScale = useSpring(scale, { stiffness: 300, damping: 28 });
  const sOpacity = useSpring(opacity, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hovering = !!t.closest('a, button, [data-cursor="hover"]');
      if (hovering !== isHover.current) {
        isHover.current = hovering;
        scale.set(hovering ? 1 : 0);
        opacity.set(hovering ? 1 : 0);
      }
    };
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => window.removeEventListener("mouseover", onOver);
  }, [scale, opacity]);

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed",
        top: 0,
        left: 0,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid rgba(249,115,22,0.6)",
        scale: sScale,
        opacity: sOpacity,
        willChange: "transform, opacity",
        boxShadow: "0 0 12px 3px rgba(249,115,22,0.25)",
      }}
    />
  );
});

HoverRing.displayName = "HoverRing";
