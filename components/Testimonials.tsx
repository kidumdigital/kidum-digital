"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "קידום דיגיטל שינו לגמרי את פני העסק שלנו. תוך 3 חודשים ראינו עלייה של 300% בפניות איכותיות. צוות מקצועי, זמין ושקוף.",
    name: "יוסי כהן",
    company: "Venis Group",
    role: "מנכ\"ל",
  },
  {
    quote: "הם לא רק מנהלים קמפיינים — הם שותפים אמיתיים לדרך. תמיד זמינים, תמיד דוחפים לתוצאות טובות יותר. ממליץ בחום.",
    name: "שירה לוי",
    company: "LetMeBe",
    role: "מייסדת",
  },
  {
    quote: "הייתי סקפטי בהתחלה, אבל המספרים דיברו בעד עצמם. החזר ×15 על השקעה בקמפיין הראשון. לא מחפשים אף אחד אחר.",
    name: "דני אברהם",
    company: "La Goffre",
    role: "בעלים",
  },
  {
    quote: "השירות, הזמינות, והתוצאות — הכל ברמה הגבוהה ביותר. הם מתייחסים לעסק שלך כאילו הוא שלהם.",
    name: "מיכל רוזן",
    company: "Educa",
    role: "CEO",
  },
  {
    quote: "קידום SEO שלנו זינק תוך חצי שנה. אתר מביא לנו לקוחות אורגניים כל יום בלי להוציא שקל על פרסום.",
    name: "אורי שפירא",
    company: "Songevent",
    role: "מנהל שיווק",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-[#080810] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">לקוחות מרוצים</p>
          <h2 className="text-4xl md:text-5xl font-black text-light mb-4">
            מה הם <span className="gradient-text">אומרים</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="gradient-border rounded-3xl p-10 text-center bg-white/2"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-light/80 leading-relaxed mb-8 font-light">
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>

              <div>
                <div className="font-bold text-light">{testimonials[active].name}</div>
                <div className="text-primary text-sm">{testimonials[active].role}, {testimonials[active].company}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 hover:border-primary/60 flex items-center justify-center text-light/60 hover:text-light transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-primary w-6" : "bg-white/20"}`}
                />
              ))}
            </div>

            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 hover:border-primary/60 flex items-center justify-center text-light/60 hover:text-light transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
