import { memo, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const Counter = memo(({ value, suffix = "", duration = 2 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.floor(v).toString());

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
});

Counter.displayName = "Counter";

const stats = [
  { value: 100, suffix: "+", label: "Websites Shipped", caption: "End-to-end design & build" },
  { value: 99, suffix: "%", label: "Client Satisfaction", caption: "Repeat & referral driven" },
  { value: 2, suffix: "+", label: "Years Building", caption: "Real-world, paid client work" },
  { value: 7, suffix: "", label: "Countries Served", caption: "Across NA, EU, IN, MENA" },
];

export const Proof = memo(() => (
  <section className="relative py-32 md:py-44 border-y border-border/40">
    <div className="container-luxe">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-3xl overflow-hidden glass">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background/80 p-8 md:p-10 hover:bg-background/40 transition-colors"
          >
            <div className="text-5xl md:text-6xl lg:text-7xl h-display text-gradient-amber mb-3">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm font-medium text-foreground mb-1">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.caption}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

Proof.displayName = "Proof";
