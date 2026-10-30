import type { Metadata } from "next";
import { CtaBand, PageHero, ServiceCard } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { serviceCategories, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "השירותים שלנו",
  description: "ניהול קמפיינים ברשתות ובגוגל, קידום אורגני, בניית אתרים ודפי נחיתה, גרפיקה ומיתוג, תוכן וקריאייטיב, הפקת ימי צילום, צ׳אטבוטים ו-CRM.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="המומחיות שלנו"
        title={
          <>
            כל השירותים. <span className="text-gradient">מטרה אחת.</span>
          </>
        }
        text="פרסום, אתרים, תוכן ומערכות – שעובדים יחד כדי להביא לעסק שלכם יותר לקוחות ויותר הכנסות."
        crumbs={[{ href: "/services", label: "שירותים" }]}
      />
      <div className="container space-y-20 pb-10">
        {serviceCategories.map((cat) => (
          <section key={cat} aria-labelledby={`cat-${cat}`}>
            <Reveal>
              <h2 id={`cat-${cat}`} className="mb-8 flex items-center gap-4 font-display text-2xl font-bold text-white sm:text-3xl">
                <span className="h-px w-10 bg-gradient-to-l from-teal to-transparent" aria-hidden="true" />
                {cat}
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === cat)
                .map((s, i) => (
                  <ServiceCard key={s.slug} s={s} i={i} />
                ))}
            </div>
          </section>
        ))}
      </div>
      <CtaBand title="לא בטוחים מה מתאים לכם?" text="בשיחת ייעוץ קצרה נבין את העסק ונמליץ על השילוב הנכון – ללא עלות וללא התחייבות." />
    </>
  );
}
