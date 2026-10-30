import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Backdrop } from "@/components/Backdrop";
import { HeroVisual } from "@/components/HeroVisual";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppIcon } from "@/components/Icon";
import { ClientsMarquee, CtaBand, FaqSection, ProcessSection, ResultHighlights, ServiceCard, TestimonialsSection } from "@/components/blocks";
import { caseStory, faq, values } from "@/lib/content";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const featured = [
  "social-media-campaigns",
  "google-ads-ppc",
  "web-building",
  "content-creative",
  "video-production",
  "strategy",
  "seo",
  "whatsapp-chatbot",
  "branding-graphics",
];

export default function Home() {
  const c = site.contact;
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="noise relative overflow-hidden pb-20 pt-36 sm:pt-44 lg:min-h-[100svh] lg:pb-28">
        <Backdrop />
        <div className="container grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal" /> סוכנות הדיגיטל שלך
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="h-display mt-6 text-[2.6rem] sm:text-6xl xl:text-7xl">
                ההצלחה שלך
                <br />
                <span className="text-gradient">היא ההצלחה שלנו.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                מחפשים יותר לקוחות, יותר ודאות עסקית ויותר הכנסות? קידום דיגיטל היא סוכנות פרסום ושיווק שמתמחה בכל זירות הפרסום – ויודעת לקחת עסק ולהפוך אותו
                לרווחי בזמן קצר.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#lead" className="btn-primary !px-8 !py-4 text-lg">
                  לשיחת ייעוץ חינם
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link href="/results" className="btn-ghost !px-7 !py-4 text-lg">
                  לתוצאות שלנו
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                {["בודקים היתכנות לפני שמתחילים", "אופטימיזציה יומית", "דוח חודשי שקוף"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.2} y={40}>
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      {/* ───────── לקוחות ───────── */}
      <section aria-labelledby="clients-title" className="relative py-10">
        <div className="container">
          <h2 id="clients-title" className="mb-6 text-center text-sm font-semibold tracking-wide text-slate-400">
            שותפים לדרך – עסקים, רשתות ומותגים שצמחו איתנו
          </h2>
        </div>
        <ClientsMarquee />
      </section>

      {/* ───────── היכרות ───────── */}
      <section className="section" aria-labelledby="intro-title">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow mb-5">היכרות קצרה לפני שמתחילים</span>
            <h2 id="intro-title" className="h-display text-3xl sm:text-5xl">
              סוכנות פרסום ושיווק שמודדת את עצמה <span className="text-gold-gradient">בשקלים</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              קידום דיגיטל מתמחה בכל זירות הפרסום – אונליין ואופליין. אנחנו מאמינים שהלקוחות הם שותפים לדרך, ובעזרת הידע והניסיון שצברנו אנחנו עוזרים להצמיח
              עשרות עסקים, ארגונים ומוסדות.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              בין אם אתם עסק שצריך לידים חמים או חנות שרוצה יותר מכירות באתר – יש רק מסר אחד שמעניין: <strong className="text-white">תוצאות.</strong>
            </p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-teal">
              עוד עלינו <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="glass rounded-3xl p-6">
                <span className="font-brand text-sm font-bold text-gold">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-white">{v.title}</h3>
                <p className="mt-2 leading-7 text-slate-400">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── שירותים ───────── */}
      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading
            eyebrow="המומחיות שלנו"
            title={<span id="services-title">כל מה שהעסק צריך בדיגיטל – תחת קורת גג אחת</span>}
            text="מקמפיינים ממומנים ועד אתרים, תוכן, וידאו ואוטומציות. צוות אחד שמחובר ליעדים העסקיים שלכם."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((slug, i) => {
              const s = services.find((x) => x.slug === slug)!;
              return <ServiceCard key={slug} s={s} i={i} />;
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-ghost">
              לכל {services.length} השירותים <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── תוצאות ───────── */}
      <section className="section" aria-labelledby="results-title">
        <div className="container">
          <SectionHeading
            eyebrow="עזבו מילים, נדבר תכל׳ס"
            title={
              <span id="results-title">
                תוצאות. <span className="text-gradient">אמיתיות.</span>
              </span>
            }
            text="צילומי מסך מתוך מערכות הפרסום והמכירות של לקוחות שלנו – כמה יצא, וכמה נכנס."
          />
          <ResultHighlights />
          <div className="mt-10 text-center">
            <Link href="/results" className="btn-primary">
              לכל התוצאות והפרויקטים <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── סיפור לקוח ───────── */}
      <section className="section pt-0" aria-labelledby="case-title">
        <div className="container">
          <Reveal>
            <div className="glass grid items-center gap-10 overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="eyebrow mb-5">מנקודת מבט של לקוח</span>
                <h2 id="case-title" className="h-display text-3xl sm:text-4xl">
                  {caseStory.title}
                </h2>
                <ol className="mt-8 space-y-4">
                  {caseStory.steps.map((s, i) => (
                    <li key={s} className="flex items-start gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-teal/40 bg-teal/10 font-brand font-bold text-teal-300">{i + 1}</span>
                      <span className="pt-1.5 text-lg text-slate-200">{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 font-display text-xl font-bold text-white">
                  גם אתם יכולים לסיים את השנה ככה. <span className="text-gold">אצלנו לא סוגרים עסקה – פותחים מערכת יחסים.</span>
                </p>
                <Link href="#lead" className="btn-primary mt-6">
                  תיאום שיחת ייעוץ בחינם
                </Link>
              </div>
              <div className="relative mx-auto w-full max-w-[17rem]">
                <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-[3rem] bg-teal/30 blur-3xl" />
                <Image
                  src={caseStory.image}
                  alt="צילום מסך מדשבורד המכירות של הלקוח – גרף מכירות בעלייה"
                  width={540}
                  height={960}
                  className="w-full rounded-[2.2rem] border border-white/10 shadow-2xl shadow-black/60"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ProcessSection />
      <TestimonialsSection />

      {/* ───────── טופס לידים ───────── */}
      <section id="lead" className="section" aria-labelledby="lead-title">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <span className="eyebrow mb-5">הגיע הזמן שנשמע אתכם</span>
            <h2 id="lead-title" className="h-display text-3xl sm:text-5xl">
              בואו נדבר על <span className="text-gradient">הצמיחה שלכם</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">השאירו פרטים, התקשרו או שלחו הודעה – ונחזור אליכם בהקדם.</p>
            <ul className="mt-8 space-y-3">
              <li>
                <a href={c.phone.href} className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-teal/40">
                  <Phone className="h-5 w-5 text-teal" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-slate-400">התקשרו עכשיו</span>
                    <span dir="ltr" className="font-brand text-lg font-bold text-white">
                      {c.phone.display}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-teal/40">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                  <span>
                    <span className="block text-sm text-slate-400">שלחו הודעה בוואטסאפ</span>
                    <span dir="ltr" className="font-brand text-lg font-bold text-white">
                      {c.whatsapp.display}
                    </span>
                  </span>
                </a>
              </li>
              <li className="grid gap-3 sm:grid-cols-2">
                <a href={`mailto:${c.email}`} className="glass flex items-center gap-3 rounded-2xl p-4 text-sm text-slate-300 transition hover:border-teal/40">
                  <Mail className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" /> {c.email}
                </a>
                <a href={c.waze} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-3 rounded-2xl p-4 text-sm text-slate-300 transition hover:border-teal/40">
                  <MapPin className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" /> {c.address}
                </a>
              </li>
              <li className="flex items-center gap-3 px-1 text-sm text-slate-400">
                <Clock className="h-4 w-4 text-teal" aria-hidden="true" />
                {c.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
              </li>
            </ul>
            <a href={c.calendar} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">
              לתזמון שיחת ייעוץ ביומן
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm />
          </Reveal>
        </div>
      </section>

      <FaqSection items={faq} />
      <CtaBand />
    </>
  );
}
