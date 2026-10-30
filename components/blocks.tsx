import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Phone, Quote } from "lucide-react";
import { Backdrop } from "./Backdrop";
import { Icon, WhatsAppIcon } from "./Icon";
import { Reveal } from "./Reveal";
import { Spotlight } from "./Spotlight";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/lib/site";
import type { Service } from "@/lib/services";
import { clientLogos, process, resultHighlights, testimonials } from "@/lib/content";

// ───── כותרת עמוד פנימי ─────
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="noise relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <Backdrop variant="soft" />
      <div className="container">
        {crumbs && (
          <nav aria-label="פירורי לחם" className="mb-6 text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  דף הבית
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-slate-200">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal className="max-w-4xl">
          {eyebrow && <span className="eyebrow mb-6">{eyebrow}</span>}
          <h1 className="h-display text-4xl sm:text-6xl">{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{text}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

// ───── כרטיס שירות ─────
export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <Spotlight className="glass group h-full rounded-3xl transition duration-500 hover:-translate-y-1 hover:border-teal/40">
        <Link href={`/services/${s.slug}`} className="flex h-full flex-col p-7">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-teal/30 bg-gradient-to-br from-teal/25 to-navy/40 text-teal-300 transition duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Icon name={s.icon} className="h-6 w-6" />
          </span>
          <h3 className="mt-5 font-display text-xl font-bold text-white">{s.title}</h3>
          <p className="mt-2 flex-1 leading-7 text-slate-400">{s.short}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
            למידע נוסף
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
          </span>
        </Link>
      </Spotlight>
    </Reveal>
  );
}

// ───── פס לוגואים נע ─────
export function ClientsMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" aria-label="חלק מהלקוחות שלנו">
      <ul className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
        {row.map((c, i) => (
          <li
            key={i}
            aria-hidden={i >= clientLogos.length}
            className="glass grid h-24 w-40 shrink-0 place-items-center rounded-2xl p-4 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-28 sm:w-48"
          >
            <Image src={c.src} alt={c.name} width={140} height={90} className="max-h-16 w-auto object-contain sm:max-h-20" />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ───── שלבי עבודה ─────
export function ProcessSection() {
  return (
    <section className="section" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading eyebrow="איך מתחילים?" title={<span id="process-title">מהשיחה הראשונה – ועד כסף בחשבון</span>} text="תהליך עבודה ברור ומוכח, בארבעה שלבים." />
        <div aria-hidden="true" className="relative">
          <div className="absolute inset-x-8 top-10 hidden h-px bg-gradient-to-l from-teal/0 via-teal/50 to-gold/0 lg:block" />
        </div>
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.1} className="glass relative rounded-3xl p-7">
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal to-navy font-brand text-2xl font-bold text-white shadow-lg shadow-teal/20">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ───── המלצות ─────
export function TestimonialsSection({ limit = 8 }: { limit?: number }) {
  return (
    <section className="section overflow-hidden" aria-labelledby="t-title">
      <div className="container">
        <SectionHeading eyebrow="המלצות" title={<span id="t-title">אל תקשיבו לנו – תקשיבו להם</span>} />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {testimonials.slice(0, limit).map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <figure className="glass rounded-3xl p-7">
                <Quote className="h-8 w-8 text-gold/70" aria-hidden="true" />
                <blockquote className="mt-4 leading-8 text-slate-200">״{t.text}״</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-teal/40 to-navy font-display font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-bold text-white">{t.name}</span>
                    <span className="text-sm text-slate-400">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───── שאלות נפוצות (ללא JS – נגיש מקלדת) ─────
export function FaqSection({ items, title = "שאלות נפוצות" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container max-w-4xl">
        <SectionHeading eyebrow="FAQ" title={<span id="faq-title">{title}</span>} />
        <div className="space-y-3">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details className="glass group rounded-2xl px-6 py-5 open:border-teal/30">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-bold text-white">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-teal transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-4 leading-8 text-slate-300">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───── הדגשות תוצאות ─────
export function ResultHighlights() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {resultHighlights.map((r, i) => (
        <Reveal key={r.big} delay={(i % 2) * 0.1}>
          <Spotlight className="glass group overflow-hidden rounded-3xl">
            <div className="grid sm:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col justify-center p-7">
                <span className="text-sm font-semibold text-teal-300">{r.label}</span>
                <span dir="ltr" className="text-gold-gradient mt-2 text-right font-brand text-4xl font-bold sm:text-5xl">
                  {r.big}
                </span>
                <p className="mt-3 leading-7 text-slate-300">{r.sub}</p>
                <p className="mt-2 text-xs text-slate-500">{r.period}</p>
              </div>
              <div className="relative h-56 overflow-hidden bg-white sm:h-auto">
                <Image
                  src={r.image}
                  alt={`צילום מסך של התוצאה: ${r.sub}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </Spotlight>
        </Reveal>
      ))}
    </div>
  );
}

// ───── פס קריאה לפעולה ─────
export function CtaBand({ title = "השירותים שלנו מעניינים אתכם?", text = "אנחנו לא מחפשים לעבוד עם כולם – אבל אם זה אתם, נשמח לדבר על איך להכפיל לכם את המכירות או הלידים." }: { title?: string; text?: string }) {
  const c = site.contact;
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="glow-border relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-navy via-ink-800 to-ink px-6 py-14 text-center sm:px-14 sm:py-20">
            <div aria-hidden="true" className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-teal/30 blur-[100px]" />
            <Image src="/brand/logo-mark.png" alt="" width={64} height={64} aria-hidden="true" className="relative mx-auto mb-6 h-14 w-14 animate-float" />
            <h2 className="h-display relative text-3xl sm:text-5xl">{title}</h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">{text}</p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/contact#lead" className="btn-primary !px-8 !py-4 text-lg">
                לתיאום שיחת ייעוץ חינם
              </Link>
              <a href={c.phone.href} className="btn-ghost !px-6 !py-4">
                <Phone className="h-5 w-5 text-teal" aria-hidden="true" />
                <span dir="ltr">{c.phone.display}</span>
              </a>
              <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-6 !py-4">
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                וואטסאפ
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
