import { useEffect, useState, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor = memo(() => {
  const [variant, setVariant] = useState<"default" | "hover">("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setVariant(t.closest('a, button, [data-cursor="hover"]') ? "hover" : "default");
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ x: sx, y: sy, willChange: "transform" }}
    >
      <motion.div
        className="rounded-full border border-accent/60 bg-accent/10 backdrop-blur-sm"
        animate={{
          width: variant === "hover" ? 56 : 32,
          height: variant === "hover" ? 56 : 32,
          x: variant === "hover" ? -12 : 0,
          y: variant === "hover" ? -12 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </motion.div>
  );
});

Cursor.displayName = "Cursor";
