"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Counter } from "./Counter";

// כרטיס "דשבורד" זכוכית בגיבור – הנתונים מהאתר הקיים (יצא 7,849₪ / נכנס 118,259₪)
export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const path = "M0 150 C40 145 60 140 90 128 S150 120 180 100 S240 95 270 70 S330 40 360 18";

  return (
    <div className="relative mx-auto w-full max-w-[30rem] [perspective:1200px]" onMouseMove={onMove} onMouseLeave={() => (mx.set(0), my.set(0))}>
      {/* טבעות מסתובבות מאחור */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid place-items-center">
        <div className="h-[115%] w-[115%] animate-spin-slow rounded-full border border-dashed border-teal/20" />
        <div className="absolute h-[85%] w-[85%] animate-spin-slow rounded-full border border-gold/10 [animation-direction:reverse]" />
      </div>

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="glass glow-border relative rounded-[2rem] p-6 sm:p-7 [transform-style:preserve-3d]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9" />
            <div>
              <p className="text-sm font-bold text-white">סיכום חודשי</p>
              <p className="text-xs text-slate-400">קמפיין מכירות לחנות אונליין</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> פעיל
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 [transform:translateZ(30px)]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">יצא</p>
            <p className="mt-1 text-right font-brand text-2xl font-bold text-white">
              <Counter to={7849} prefix="₪" />
            </p>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4">
            <p className="text-xs text-gold-300">נכנס</p>
            <p className="mt-1 text-right font-brand text-2xl font-bold text-gold">
              <Counter to={118259} prefix="₪" />
            </p>
          </div>
        </div>

        <div className="relative mt-5 h-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-teal/10 to-transparent p-3 [transform:translateZ(20px)]">
          <svg viewBox="0 0 360 160" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="hv-line" x1="0" x2="1">
                <stop offset="0" stopColor="#30ADBE" />
                <stop offset="1" stopColor="#EDB548" />
              </linearGradient>
              <linearGradient id="hv-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#30ADBE" stopOpacity=".35" />
                <stop offset="1" stopColor="#30ADBE" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 80, 120].map((y) => (
              <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="rgba(255,255,255,.06)" />
            ))}
            <motion.path
              d={`${path} L360 160 L0 160 Z`}
              fill="url(#hv-fill)"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            />
            <motion.path
              d={path}
              fill="none"
              stroke="url(#hv-line)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
            />
            <motion.circle cx="360" cy="18" r="6" fill="#EDB548" initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2, type: "spring" }} />
          </svg>
        </div>

        <p className="mt-4 text-center text-sm text-slate-400">
          מדברים <span className="font-bold text-white">רק תוצאות.</span>
        </p>
      </motion.div>

      {/* תגיות צפות */}
      <motion.div
        aria-hidden="true"
        className="glass absolute -left-4 top-10 hidden rounded-2xl px-4 py-3 sm:block"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xs text-slate-400">החזר על הפרסום</p>
        <p className="font-brand text-xl font-bold text-teal-300">x15</p>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="glass absolute -right-4 bottom-16 hidden rounded-2xl px-4 py-3 sm:block"
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xs text-slate-400">שיטת עבודה</p>
        <p className="font-display text-sm font-bold text-white">פאנל A · B · C</p>
      </motion.div>
    </div>
  );
}
