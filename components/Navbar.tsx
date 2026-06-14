"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "שירותים", href: "#services" },
  { label: "תהליך העבודה", href: "#process" },
  { label: "עבודות", href: "#portfolio" },
  { label: "לקוחות", href: "#testimonials" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark/90 backdrop-blur-md shadow-lg shadow-primary/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-black tracking-tight">
          <span className="gradient-text">קידום</span>
          <span className="text-light"> דיגיטל</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-light/70 hover:text-light transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          ייעוץ חינם
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden text-light p-2"
          onClick={() => setOpen(!open)}
          aria-label="תפריט"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-dark/95 backdrop-blur-md border-t border-white/10 px-6 py-6 space-y-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-light/80 hover:text-light py-2 border-b border-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block mt-4 text-center bg-primary text-white font-semibold px-5 py-3 rounded-full"
            >
              ייעוץ חינם
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
