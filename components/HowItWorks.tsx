"use client";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "ייעוץ ותכנון",
    desc: "פגישת היכרות חינמית — מבינים את העסק, המטרות, התחרות והקהל שלך.",
  },
  {
    num: "02",
    title: "מחקר שוק ואסטרטגיה",
    desc: "ניתוח מעמיק של השוק, המתחרים ומילות המפתח לבניית אסטרטגיה מנצחת.",
  },
  {
    num: "03",
    title: "הרצה ואופטימיזציה",
    desc: "מרצים את הקמפיינים ומבצעים אופטימיזציה שוטפת על בסיס נתונים בזמן אמת.",
  },
  {
    num: "04",
    title: "דיווח ותוצאות",
    desc: "דוחות שקופים עם נתונים ברורים — כמה הושקע, כמה הוחזר, מה הצעד הבא.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 bg-[#080810]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">איך עובד התהליך</p>
          <h2 className="text-4xl md:text-5xl font-black text-light mb-4">
            4 שלבים <span className="gradient-text">להצלחה</span>
          </h2>
          <p className="text-light/50 text-lg max-w-xl mx-auto">
            תהליך עבודה שקוף, מבוסס נתונים ומוכוון תוצאות.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 right-[12.5%] left-[12.5%] h-px bg-gradient-to-l from-accent to-primary opacity-20" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark border-2 border-primary/40 mb-6 relative z-10">
                <span className="gradient-text text-2xl font-black">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-light mb-3">{step.title}</h3>
              <p className="text-light/50 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
