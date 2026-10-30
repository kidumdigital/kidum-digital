"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Accessibility, X } from "lucide-react";

// תפריט נגישות – ההגדרות נשמרות בדפדפן של הגולש
type Opts = {
  scale: number;
  contrast: boolean;
  light: boolean;
  grayscale: boolean;
  links: boolean;
  font: boolean;
  cursor: boolean;
  noMotion: boolean;
};
const DEFAULTS: Opts = { scale: 1, contrast: false, light: false, grayscale: false, links: false, font: false, cursor: false, noMotion: false };
const KEY = "kidum-a11y";

const toggles: { key: keyof Omit<Opts, "scale">; label: string; cls: string }[] = [
  { key: "contrast", label: "ניגודיות גבוהה", cls: "a11y-contrast" },
  { key: "light", label: "רקע בהיר", cls: "a11y-light" },
  { key: "grayscale", label: "גווני אפור", cls: "a11y-grayscale" },
  { key: "links", label: "הדגשת קישורים", cls: "a11y-links" },
  { key: "font", label: "פונט קריא", cls: "a11y-font" },
  { key: "cursor", label: "סמן מוגדל", cls: "a11y-cursor" },
  { key: "noMotion", label: "עצירת אנימציות", cls: "a11y-no-motion" },
];

export function A11yWidget() {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<Opts>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setOpts({ ...DEFAULTS, ...JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-scale", String(opts.scale));
    toggles.forEach((t) => root.classList.toggle(t.cls, opts[t.key]));
    try {
      localStorage.setItem(KEY, JSON.stringify(opts));
    } catch {}
  }, [opts]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const setScale = (d: number) => setOpts((o) => ({ ...o, scale: Math.min(1.5, Math.max(0.9, +(o.scale + d).toFixed(2))) }));

  return (
    <div id="a11y-root">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="תפריט נגישות"
        className="fixed bottom-24 right-3 z-[60] grid h-12 w-12 place-items-center rounded-full bg-[#1565c0] text-white shadow-xl ring-2 ring-white/70 transition hover:scale-110 md:bottom-6 md:right-6"
      >
        <Accessibility className="h-7 w-7" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-label="הגדרות נגישות"
          className="fixed bottom-40 right-3 z-[60] w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-slate-300 bg-white p-4 text-slate-900 shadow-2xl md:bottom-24 md:right-6"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">כלי נגישות</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="סגירת תפריט הנגישות" className="rounded-lg p-1 hover:bg-slate-100">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-100 p-2">
            <span className="text-sm font-semibold">גודל טקסט</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setScale(-0.1)} className="h-9 w-9 rounded-lg bg-white font-bold shadow" aria-label="הקטנת טקסט">
                א-
              </button>
              <span className="w-10 text-center text-sm" aria-live="polite">
                {Math.round(opts.scale * 100)}%
              </span>
              <button type="button" onClick={() => setScale(0.1)} className="h-9 w-9 rounded-lg bg-white font-bold shadow" aria-label="הגדלת טקסט">
                א+
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {toggles.map((t) => (
              <button
                key={t.key}
                type="button"
                aria-pressed={opts[t.key]}
                onClick={() =>
                  setOpts((o) => {
                    const next = { ...o, [t.key]: !o[t.key] };
                    if (t.key === "contrast" && next.contrast) next.light = false;
                    if (t.key === "light" && next.light) next.contrast = false;
                    return next;
                  })
                }
                className={`rounded-xl border px-2 py-2.5 text-sm font-semibold transition ${
                  opts[t.key] ? "border-[#1565c0] bg-[#1565c0] text-white" : "border-slate-200 bg-white hover:border-[#1565c0]"
                }`}
              >
                {t.label}
              </button>
            ))}
            <button type="button" onClick={() => setOpts(DEFAULTS)} className="rounded-xl border border-slate-200 px-2 py-2.5 text-sm font-semibold hover:bg-slate-100">
              איפוס
            </button>
          </div>

          <Link href="/accessibility" className="mt-3 block text-center text-sm font-semibold text-[#1565c0] underline" onClick={() => setOpen(false)}>
            הצהרת נגישות
          </Link>
        </div>
      )}
    </div>
  );
}
