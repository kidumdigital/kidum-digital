import type { Metadata } from "next";
import { CalendarDays, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/blocks";
import { WhatsAppIcon } from "@/components/Icon";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description: `דברו עם קידום דיגיטל: ${site.contact.phone.display} | וואטסאפ ${site.contact.whatsapp.display} | ${site.contact.email}`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const c = site.contact;
  const cards = [
    { icon: <Phone className="h-6 w-6" aria-hidden="true" />, label: "התקשרו עכשיו", value: c.phone.display, href: c.phone.href, ltr: true },
    { icon: <WhatsAppIcon className="h-6 w-6" />, label: "וואטסאפ / נייד", value: c.whatsapp.display, href: c.whatsapp.href, ltr: true, external: true },
    { icon: <Mail className="h-6 w-6" aria-hidden="true" />, label: "שלחו לנו מייל", value: c.email, href: `mailto:${c.email}` },
    { icon: <MapPin className="h-6 w-6" aria-hidden="true" />, label: "בואו לבקר", value: `אנחנו ממוקמים ב${c.address}`, href: c.waze, external: true },
  ];
  return (
    <>
      <PageHero
        eyebrow="בואו נדבר"
        title={
          <>
            תמיד נשמח <span className="text-gradient">לעזור</span>
          </>
        }
        text="אנחנו כאן לכל שאלה. השאירו פנייה, התקשרו או שלחו הודעה – ונחזור אליכם בהקדם."
        crumbs={[{ href: "/contact", label: "צור קשר" }]}
      />

      <section className="pb-10">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((k, i) => (
            <Reveal key={k.label} delay={i * 0.06}>
              <a
                href={k.href}
                {...(k.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="glass group flex h-full flex-col rounded-3xl p-6 transition hover:-translate-y-1 hover:border-teal/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/15 text-teal-300 transition group-hover:scale-110">{k.icon}</span>
                <span className="mt-4 text-sm text-slate-400">{k.label}</span>
                <span dir={k.ltr ? "ltr" : undefined} className={`mt-1 font-bold text-white ${k.ltr ? "text-right font-brand text-xl" : "break-all"}`}>
                  {k.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="lead" className="section pt-6">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="glass rounded-3xl p-7">
              <h2 className="flex items-center gap-3 font-display text-xl font-bold text-white">
                <Clock className="h-5 w-5 text-teal" aria-hidden="true" /> שעות פעילות
              </h2>
              <ul className="mt-4 space-y-2 text-slate-300">
                {c.hours.map((h) => (
                  <li key={h.days} className="flex justify-between border-b border-white/5 pb-2">
                    <span>{h.days}</span>
                    <span dir="ltr">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass mt-5 rounded-3xl p-7">
              <h2 className="flex items-center gap-3 font-display text-xl font-bold text-white">
                <Phone className="h-5 w-5 text-teal" aria-hidden="true" /> מספרים נוספים
              </h2>
              <ul className="mt-4 space-y-2 text-slate-300">
                <li className="flex justify-between">
                  <span>מוקד</span>
                  <a href={c.phoneAlt.href} dir="ltr" className="hover:text-teal-300">
                    {c.phoneAlt.display}
                  </a>
                </li>
                <li className="flex justify-between">
                  <span>
                    קו נוסף (<span dir="ltr">{c.phoneHours.note}</span>)
                  </span>
                  <a href={c.phoneHours.href} dir="ltr" className="hover:text-teal-300">
                    {c.phoneHours.display}
                  </a>
                </li>
                <li className="flex justify-between">
                  <span>ייעוץ טלפוני חינם</span>
                  <a href={c.mobile.href} dir="ltr" className="hover:text-teal-300">
                    {c.mobile.display}
                  </a>
                </li>
              </ul>
            </div>

            <a href={c.calendar} target="_blank" rel="noopener noreferrer" className="glass mt-5 flex items-center gap-4 rounded-3xl p-7 transition hover:border-gold/40">
              <CalendarDays className="h-8 w-8 text-gold" aria-hidden="true" />
              <span>
                <span className="block font-display text-lg font-bold text-white">תיאום שיחת ייעוץ ביומן</span>
                <span className="text-sm text-slate-400">בחרו יום ושעה שנוחים לכם</span>
              </span>
            </a>

            <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
              <iframe
                title="מפה – זכרון יעקב"
                src="https://maps.google.com/maps?q=32.575176,34.948364&z=14&output=embed&hl=iw"
                className="h-56 w-full grayscale invert-[.9] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm title="השאירו פנייה ונחזור אליכם בהקדם" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
