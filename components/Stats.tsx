"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("he-IL")}{suffix}
    </span>
  );
}

const stats = [
  { value: 150, suffix: "+", label: "לקוחות מרוצים" },
  { value: 500, suffix: "+", label: "קמפיינים שהרצנו" },
  { value: 15, prefix: "×", suffix: "", label: "ROI ממוצע ללקוח" },
  { value: 8, suffix: " שנים", label: "ניסיון בשוק" },
];

export default function Stats() {
  return (
    <section className="bg-dark border-y border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-light/50 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
