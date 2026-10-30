import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./Icon";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export function Footer() {
  const c = site.contact;
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="relative mt-10 border-t border-white/10 bg-ink-900 pb-28 pt-16 md:pb-10">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-teal/60 to-transparent" />
      <div className="container grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm leading-7 text-slate-400">
            סוכנות פרסום ושיווק שמתמחה בכל זירות הפרסום – אונליין ואופליין. אנחנו כאן כדי להפוך עסקים לרווחיים.
          </p>
          <p className="mt-4 font-display text-lg font-bold text-gold">{site.tagline}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {socials.map(([k, url]) => (
                <li key={k}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="glass rounded-full px-3 py-1.5 text-sm capitalize">
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="שירותים">
          <h2 className="mb-4 font-display font-bold text-white">שירותים</h2>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-slate-400 transition hover:text-teal-300">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="קישורים">
          <h2 className="mb-4 font-display font-bold text-white">ניווט</h2>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/", "דף הבית"],
              ["/services", "כל השירותים"],
              ["/results", "תוצאות ופרויקטים"],
              ["/about", "אודות"],
              ["/contact", "צור קשר"],
              ["/accessibility", "הצהרת נגישות"],
              ["/privacy", "מדיניות פרטיות"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-slate-400 transition hover:text-teal-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-display font-bold text-white">דברו איתנו</h2>
          <ul className="space-y-3.5 text-sm text-slate-300">
            <li>
              <a href={c.phone.href} className="flex items-center gap-3 hover:text-teal-300">
                <Phone className="h-4 w-4 text-teal" aria-hidden="true" />
                <span dir="ltr">{c.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-teal-300">
                <WhatsAppIcon className="h-4 w-4 text-teal" />
                וואטסאפ: <span dir="ltr">{c.whatsapp.display}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${c.email}`} className="flex items-center gap-3 hover:text-teal-300">
                <Mail className="h-4 w-4 text-teal" aria-hidden="true" />
                {c.email}
              </a>
            </li>
            <li>
              <a href={c.waze} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-teal-300">
                <MapPin className="h-4 w-4 text-teal" aria-hidden="true" />
                {c.address}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-teal" aria-hidden="true" />
              <span>
                {c.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: <span dir="ltr">{h.time}</span>
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Kidum Digital. כל הזכויות שמורות.</p>
        <p className="flex gap-4">
          <Link href="/accessibility" className="hover:text-slate-300">
            נגישות
          </Link>
          <Link href="/privacy" className="hover:text-slate-300">
            פרטיות
          </Link>
        </p>
      </div>
    </footer>
  );
}
