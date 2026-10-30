"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { nav, site } from "@/lib/site";
import { services, serviceCategories } from "@/lib/services";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setMega(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* פס עליון עם פרטי קשר */}
      <div
        className={`hidden border-b border-white/5 bg-ink/60 backdrop-blur-md transition-all duration-500 md:block ${scrolled ? "-mt-10 opacity-0" : "opacity-100"}`}
      >
        <div className="container flex h-10 items-center justify-between text-sm text-slate-400">
          <p>{site.slogan}</p>
          <div className="flex items-center gap-5">
            <a href={site.contact.phone.href} className="hover:text-teal-300">
              טלפון: <span dir="ltr">{site.contact.phone.display}</span>
            </a>
            <a href={`mailto:${site.contact.email}`} className="hover:text-teal-300">
              {site.contact.email}
            </a>
            <a href={site.contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-teal-300">
              וואטסאפ: <span dir="ltr">{site.contact.whatsapp.display}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container pt-3">
        <nav
          aria-label="ניווט ראשי"
          className={`flex h-16 items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5 ${
            scrolled || open ? "glass-strong shadow-2xl shadow-black/40" : "border border-transparent"
          }`}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <button
                    type="button"
                    aria-expanded={mega}
                    aria-controls="mega-menu"
                    onClick={() => setMega((v) => !v)}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition ${
                      isActive(item.href) ? "text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mega ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        id="mega-menu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-1/2 top-full w-[min(56rem,92vw)] translate-x-1/2 pt-4"
                      >
                        <div className="glass-strong grid grid-cols-4 gap-6 rounded-3xl p-6 shadow-2xl shadow-black/60">
                          {serviceCategories.map((cat) => (
                            <div key={cat}>
                              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gold">{cat}</p>
                              <ul className="space-y-1">
                                {services
                                  .filter((s) => s.category === cat)
                                  .map((s) => (
                                    <li key={s.slug}>
                                      <Link
                                        href={`/services/${s.slug}`}
                                        className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                                      >
                                        <Icon name={s.icon} className="h-4 w-4 shrink-0 text-teal" />
                                        {s.title}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          ))}
                          <Link href="/services" className="col-span-4 rounded-xl border border-white/10 py-2.5 text-center text-sm font-semibold text-teal-300 hover:bg-white/5">
                            לכל השירותים ←
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition ${
                      isActive(item.href) ? "text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-l from-transparent via-teal to-transparent" />}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2">
            <a href={site.contact.phone.href} className="btn-ghost hidden !px-4 !py-2.5 text-sm sm:inline-flex" aria-label={`התקשרו: ${site.contact.phone.display}`}>
              <Phone className="h-4 w-4 text-teal" aria-hidden="true" />
              <span dir="ltr">{site.contact.phone.display}</span>
            </a>
            <Link href="/contact#lead" className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex">
              לשיחת ייעוץ חינם
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-xl text-white lg:hidden"
              aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* תפריט מובייל */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-[5.25rem] overflow-y-auto bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container space-y-2 pb-32 pt-4">
              {nav.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block rounded-2xl border border-white/5 px-5 py-4 font-display text-xl font-bold text-white"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <details className="rounded-2xl border border-white/5 px-5 py-4">
                <summary className="flex cursor-pointer items-center justify-between font-display text-xl font-bold text-white">
                  כל השירותים <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </summary>
                <ul className="mt-3 grid gap-1">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-slate-300">
                        <Icon name={s.icon} className="h-4 w-4 text-teal" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="grid grid-cols-2 gap-3 pt-4">
                <a href={site.contact.phone.href} className="btn-ghost">
                  <Phone className="h-4 w-4" aria-hidden="true" /> חייגו
                </a>
                <Link href="/contact#lead" className="btn-primary">
                  השאירו פרטים
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
