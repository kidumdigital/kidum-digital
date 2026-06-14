"use client";
import { motion } from "framer-motion";

const services = [
  {
    icon: "📊",
    title: "קמפיינים ממומנים",
    desc: "ניהול מקצועי של קמפיינים ב-Google Ads, Facebook ו-Instagram. אנחנו מייצרים לידים איכותיים שהופכים ללקוחות.",
    tags: ["Google Ads", "Facebook", "Instagram"],
  },
  {
    icon: "🔍",
    title: "SEO אורגני",
    desc: "קידום אורגני לטווח ארוך — מחקר מילות מפתח, אופטימיזציה טכנית ובניית תוכן שמביא תנועה איכותית.",
    tags: ["On-Page", "Off-Page", "Technical SEO"],
  },
  {
    icon: "💻",
    title: "בניית אתרים",
    desc: "אתרי תדמית, דפי נחיתה וחנויות אונליין מהירים, עיצובים מושכים ומותאמים לנייד.",
    tags: ["Landing Pages", "E-Commerce", "מותאם לנייד"],
  },
  {
    icon: "📱",
    title: "ניהול רשתות חברתיות",
    desc: "ניהול יומיומי של עמודי Facebook ו-Instagram — תוכן, עיצוב, מעורבות ובניית קהילה.",
    tags: ["Facebook", "Instagram", "TikTok"],
  },
  {
    icon: "🎨",
    title: "עיצוב גרפי ומיתוג",
    desc: "בניית זהות מותגית חזקה — לוגו, ספר מותג, עיצוב לרשתות חברתיות וחומרי שיווק.",
    tags: ["לוגו", "ספר מותג", "סושיאל"],
  },
  {
    icon: "🤖",
    title: "CRM וצ'אטבוטים",
    desc: "מערכות לניהול לידים ואוטומציות חכמות — צ'אטבוט WhatsApp, תזכורות ומעקב לקוחות.",
    tags: ["WhatsApp Bot", "CRM", "אוטומציה"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">מה אנחנו עושים</p>
          <h2 className="text-4xl md:text-5xl font-black text-light mb-4">
            השירותים <span className="gradient-text">שלנו</span>
          </h2>
          <p className="text-light/50 text-lg max-w-xl mx-auto">
            פתרון מלא לכל צרכי השיווק הדיגיטלי שלך — מקמפיינים ועד אתרים.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="gradient-border rounded-2xl p-6 bg-white/3 hover:bg-white/5 transition-colors cursor-default group"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-light mb-3 group-hover:gradient-text transition-all">
                {s.title}
              </h3>
              <p className="text-light/50 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
