import type { Metadata } from "next";
import { ClientsMarquee, CtaBand, PageHero, ResultHighlights, TestimonialsSection } from "@/components/blocks";
import { ResultsGallery } from "@/components/ResultsGallery";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/Spotlight";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "תוצאות ופרויקטים",
  description: "צילומי מסך אמיתיים של תוצאות קמפיינים – הכנסות, החזר על הוצאות פרסום ועלות לליד – ופרויקטים נבחרים של קידום דיגיטל.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="עזבו מילים"
        title={
          <>
            נדבר תכל׳ס: <span className="text-gradient">תוצאות.</span>
          </>
        }
        text="אצלנו ההצלחה נמדדת בשקלים. הנה חלק מהמספרים – ישירות מתוך מערכות הפרסום והמכירות של הלקוחות שלנו."
        crumbs={[{ href: "/results", label: "תוצאות" }]}
      />

      <section className="section pt-4" aria-label="תוצאות נבחרות">
        <div className="container">
          <ResultHighlights />
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="gallery">
        <div className="container">
          <SectionHeading eyebrow="צילומי מסך" title={<span id="gallery">עוד תוצאות מהשטח</span>} text="לחצו על תמונה להגדלה. ניתן לסנן לפי סוג קמפיין." />
          <ResultsGallery />
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="projects">
        <div className="container">
          <SectionHeading eyebrow="פרויקטים נבחרים" title={<span id="projects">טעימה קטנה מהפעילות שלנו</span>} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.name} delay={(i % 3) * 0.07}>
                <Spotlight className="glass h-full rounded-3xl p-7">
                  <h3 className="font-display text-xl font-bold text-white">{p.name}</h3>
                  <p className="mt-2 leading-7 text-slate-400">{p.work}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-300">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-6" aria-label="לקוחות">
        <ClientsMarquee />
      </section>

      <TestimonialsSection />
      <CtaBand title="גם אתם יכולים לסיים את השנה ככה" text="ספרו לנו על העסק, ונבדוק יחד מה אפשר להשיג." />
    </>
  );
}
