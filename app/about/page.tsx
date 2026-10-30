import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientsMarquee, CtaBand, PageHero, ProcessSection, TestimonialsSection } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/Spotlight";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "אודות",
  description: "קידום דיגיטל – סוכנות פרסום ושיווק שמתמחה בכל זירות הפרסום, אונליין ואופליין. ההצלחה שלך היא ההצלחה שלנו.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "בודקים לפני שמתחילים",
    text: "לפני שאנחנו מתחייבים ללקוח, אנחנו בודקים את השוק, את הפוטנציאל ואת הסיכוי המקצועי שלנו להצליח. אנחנו לא רוצים לאכזב – לא אתכם ולא את השם שבנינו.",
  },
  {
    title: "שיטת מולטי צ׳אנל",
    text: "כדי שעסק יפרוץ בדיגיטל צריך ״להקיף״ את הלקוח מכל כיוון. כך העסק נמצא תמיד בתודעה, וכשהלקוח מוכן להזמין – הוא בוחר בכם. זו השיטה המועדפת עלינו, ובצדק.",
  },
  {
    title: "משפך A · B · C",
    text: "שיטת עבודה שפיתחנו ושיפרנו לאורך שנים: בדיקות קריאייטיב, איתור הקהלים הטובים ביותר, וסקייל לתקציב על מה שמביא את הרווח הגבוה ביותר.",
  },
  {
    title: "שקיפות ודוחות",
    text: "בסוף כל חודש – דוח מפורט ושיחת סיכום. כמה יצא, כמה נכנס, מה ה-ROAS, ומה היעדים לחודשיים הבאים.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="אודות קידום דיגיטל"
        title={
          <>
            לא סוגרים עסקה. <span className="text-gradient">פותחים מערכת יחסים.</span>
          </>
        }
        text="קידום דיגיטל היא סוכנות פרסום ושיווק שמתמחה בכל זירות הפרסום – אונליין ואופליין. המטרה שלנו פשוטה: לקחת עסק ולהפוך אותו לרווחי, בזמן קצר."
        crumbs={[{ href: "/about", label: "אודות" }]}
      />

      <section className="section pt-4">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-3xl sm:text-4xl">
              המוטו שלנו הוא גם <span className="text-gold-gradient">מדד ההצלחה שלנו</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-9 text-slate-300">
              <p>
                אנחנו רואים בלקוחות שלנו שותפים לדרך, ומתייחסים אליהם באהבה ובהערכה. לאורך השנים צברנו ידע וניסיון שמאפשרים לנו לעזור לצמוח לעשרות עסקים, ארגונים
                ומוסדות – מעסקים קטנים ועד רשתות שכולנו מכירים.
              </p>
              <p>
                אנחנו לא מחפשים לעבוד עם כל לקוח. חשובה לנו סביבת עבודה נעימה, אנחנו בונים קשר לטווח ארוך – ריצת מרתון ולא ספרינט – ולא נתחיל לעבוד לפני שבדקנו
                את סיכויי ההצלחה.
              </p>
              <p>
                אנחנו ישירים ושקופים. אין לנו עניין למשוך עבודה בלי הצלחות – אנחנו כאן כדי לבנות ולהצמיח עסקים, מותגים וחברות. <strong className="text-white">ההצלחה שלך היא ההצלחה שלנו.</strong>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-md">
              <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-teal/25 blur-[90px]" />
              <Image src="/brand/logo-square.jpg" alt="הלוגו של Kidum Digital" width={630} height={630} className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/60" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="principles">
        <div className="container">
          <SectionHeading eyebrow="איך אנחנו עובדים" title={<span id="principles">העקרונות שמובילים אותנו</span>} />
          <div className="grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <Spotlight className="glass h-full rounded-3xl p-8">
                  <span className="font-brand text-sm font-bold text-gold">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white">{p.title}</h3>
                  <p className="mt-3 text-lg leading-8 text-slate-400">{p.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="values">
        <div className="container">
          <SectionHeading eyebrow="חשוב לדעת" title={<span id="values">מה אנחנו מבטיחים לכם</span>} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.07} className="glass rounded-3xl p-6 text-center">
                <h3 className="font-display text-lg font-bold text-white">{v.title}</h3>
                <p className="mt-2 leading-7 text-slate-400">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* מקום לתוכן שחסר באתר הקיים */}
      <section className="section pt-0" aria-labelledby="team">
        <div className="container">
          <Reveal>
            <div className="rounded-3xl border-2 border-dashed border-white/15 p-8 text-center">
              <h2 id="team" className="font-display text-2xl font-bold text-white">
                הצוות שלנו
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-400">
                [לעדכון: תמונות וכמה מילים על ברק, הבעלים, ועל אנשי הצוות – קמפיינרים, גרפיקה, קופירייטינג ופיתוח. שנת הקמה ומספרי לקוחות אם תרצו להציג.]
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-6" aria-label="לקוחות">
        <ClientsMarquee />
      </section>

      <ProcessSection />
      <TestimonialsSection limit={6} />

      <div className="container text-center">
        <Link href="/results" className="btn-ghost">
          לתוצאות ולפרויקטים <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <CtaBand />
    </>
  );
}
