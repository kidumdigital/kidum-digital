"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { resultGallery } from "@/lib/content";

const filters = ["הכל", "מכירות", "לידים"] as const;

export function ResultsGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("הכל");
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const items = resultGallery.filter((g) => filter === "הכל" || g.kind === filter);

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a + 1) % items.length));
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, items.length]);

  return (
    <>
      <div role="group" aria-label="סינון תוצאות" className="mb-8 flex justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${filter === f ? "bg-teal text-ink" : "glass text-slate-300 hover:text-white"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <AnimatePresence>
          {items.map((g, i) => (
            <motion.li key={g.src} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-white"
                aria-label={`הגדלה: ${g.alt}`}
              >
                <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover object-top transition duration-500 group-hover:scale-105" />
                <span className="absolute bottom-2 right-2 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-teal-300">{g.kind}</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {active !== null && items[active] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="תצוגת תוצאה מוגדלת"
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image src={items[active].src} alt={items[active].alt} width={1400} height={900} className="h-auto max-h-[80vh] w-full rounded-2xl bg-white object-contain" />
              <div className="mt-4 flex items-center justify-center gap-3">
                <button type="button" onClick={() => setActive((active - 1 + items.length) % items.length)} className="btn-ghost !p-3" aria-label="התמונה הקודמת">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <button ref={closeRef} type="button" onClick={() => setActive(null)} className="btn-ghost !px-5 !py-3" aria-label="סגירה">
                  <X className="h-5 w-5" aria-hidden="true" /> סגירה
                </button>
                <button type="button" onClick={() => setActive((active + 1) % items.length)} className="btn-ghost !p-3" aria-label="התמונה הבאה">
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
