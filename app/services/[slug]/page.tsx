import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { CtaBand, FaqSection, PageHero, ServiceCard } from "@/components/blocks";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/Spotlight";
import { getService, leadServiceOptions, services } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.title} | Kidum Digital`, description: s.short, images: ["/og.jpg"] },
  };
}

// התאמת השירות לאפשרות בטופס
function matchOption(title: string) {
  const map: Record<string, string> = {
    "קידום אתרים אורגני SEO": "קידום אורגני בגוגל SEO",
    "בניית אתרים": "פיתוח אתר",
    "בניית דפי נחיתה": "פיתוח אתר",
    "גרפיקה ומיתוג": "שירותי קריאייטיב וגרפיקה",
    "יצירת תוכן וקריאייטיב": "שירותי קריאייטיב וגרפיקה",
    "פיתוח אפליקציות ותוכנה": "פיתוח אפליקציה",
  };
  const v = map[title] ?? title;
  return leadServiceOptions.includes(v) ? v : "";
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();
  const c = site.contact;
  const related = services.filter((x) => x.slug !== s.slug && x.category === s.category).slice(0, 3);
  const more = related.length < 3 ? services.filter((x) => x.slug !== s.slug && !related.includes(x)).slice(0, 3 - related.length) : [];

  return (
    <>
      <PageHero
        eyebrow={s.category}
        title={s.title}
        text={s.headline}
        crumbs={[
          { href: "/services", label: "שירותים" },
          { href: `/services/${s.slug}`, label: s.title },
        ]}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="#lead" className="btn-primary !px-7 !py-3.5">
            לשיחת ייעוץ חינם <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a href={c.phone.href} className="btn-ghost !py-3.5">
            <Phone className="h-4 w-4 text-teal" aria-hidden="true" /> <span dir="ltr">{c.phone.display}</span>
          </a>
          <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-3.5">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> וואטסאפ
          </a>
        </div>
      </PageHero>

      {/* פתיח + מה כלול */}
      <section className="section pt-4">
        <div className="container grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl border border-teal/30 bg-gradient-to-br from-teal/25 to-navy/40 text-teal-300">
                <Icon name={s.icon} className="h-8 w-8" />
              </span>
              <p className="font-display text-xl font-bold text-white">{s.short}</p>
            </div>
            {s.intro.map((p) => (
              <p key={p.slice(0, 20)} className="mt-6 text-lg leading-9 text-slate-300">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass glow-border rounded-3xl p-7">
              <h2 className="font-display text-xl font-bold text-white">מה כלול בשירות?</h2>
              <ul className="mt-5 space-y-3.5">
                {s.includes.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/20">
                      <Check className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <Link href="#lead" className="btn-primary mt-7 w-full">
                {s.cta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* יתרונות */}
      <section className="section pt-0" aria-labelledby="benefits">
        <div className="container">
          <SectionHeading eyebrow="למה זה עובד" title={<span id="benefits">היתרונות שתקבלו</span>} />
          <div className={`grid gap-5 sm:grid-cols-2 ${s.benefits.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {s.benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 0.07}>
                <Spotlight className="glass h-full rounded-3xl p-7">
                  <span className="font-brand text-sm font-bold text-gold">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">{b.title}</h3>
                  <p className="mt-2 leading-7 text-slate-400">{b.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* שלבים */}
      {s.steps && (
        <section className="section pt-0" aria-labelledby="steps">
          <div className="container">
            <SectionHeading eyebrow="השיטה" title={<span id="steps">איך זה עובד</span>} />
            <ol className={`grid gap-5 sm:grid-cols-2 ${s.steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              {s.steps.map((st, i) => (
                <Reveal as="li" key={st.title} delay={i * 0.08} className="glass relative overflow-hidden rounded-3xl p-7">
                  <span aria-hidden="true" className="absolute -left-2 -top-6 font-brand text-8xl font-bold text-white/[0.04]">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-xl font-bold text-teal-300">{st.title}</h3>
                  <p className="mt-2 leading-7 text-slate-300">{st.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* חבילות */}
      {s.packages && (
        <section className="section pt-0" aria-labelledby="packages">
          <div className="container">
            <SectionHeading eyebrow="חבילות" title={<span id="packages">בחרו את החבילה שמתאימה לכם</span>} text="צוות קידום דיגיטל ישמח לייעץ איזו חבילה הכי מתאימה לצרכים שלכם – ללא התחייבות." />
            <div className="grid items-stretch gap-5 lg:grid-cols-3">
              {s.packages.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.08} className="h-full">
                  <div className={`relative flex h-full flex-col rounded-3xl p-7 ${p.highlight ? "glow-border border border-gold/40 bg-gradient-to-b from-gold/10 to-white/[0.03]" : "glass"}`}>
                    {p.highlight && <span className="absolute -top-3 right-7 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">הנמכר ביותר</span>}
                    <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{p.fit}</p>
                    <p className="mt-4 text-sm font-semibold text-teal-300">{p.type}</p>
                    <p className="mt-2 flex items-baseline gap-3">
                      <span className="font-brand text-4xl font-bold text-white">{p.price}</span>
                      <s className="text-slate-500">{p.oldPrice}</s>
                    </p>
                    <p className="text-xs text-slate-500">תשלום חד פעמי</p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="#lead" className={`${p.highlight ? "btn-primary" : "btn-ghost"} mt-7 w-full`}>
                      להזמנה – צרו קשר
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
            {s.note && <p className="mt-6 text-center text-sm text-slate-500">{s.note}</p>}
          </div>
        </section>
      )}

      {/* טופס */}
      <section id="lead" className="section pt-0">
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <span className="eyebrow mb-5">{s.title}</span>
            <h2 className="h-display text-3xl sm:text-5xl">{s.cta}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">השאירו פרטים ונחזור אליכם עם בדיקה ראשונית והמלצה – בלי עלות ובלי התחייבות.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={c.phone.href} className="btn-ghost">
                <Phone className="h-4 w-4 text-teal" aria-hidden="true" /> <span dir="ltr">{c.phone.display}</span>
              </a>
              <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> <span dir="ltr">{c.whatsapp.display}</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm defaultService={matchOption(s.title)} title={`מתעניינים ב${s.title}?`} />
          </Reveal>
        </div>
      </section>

      {s.faq && <FaqSection items={s.faq} title={`שאלות על ${s.title}`} />}

      <section className="section pt-0" aria-labelledby="related">
        <div className="container">
          <h2 id="related" className="mb-8 font-display text-2xl font-bold text-white">
            שירותים נוספים שיכולים לעניין אתכם
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...related, ...more].map((r, i) => (
              <ServiceCard key={r.slug} s={r} i={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
