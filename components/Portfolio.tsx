"use client";
import { motion } from "framer-motion";

const projects = [
  { name: "La Goffre", category: "מסעדנות", result: "+340% לידים", color: "from-purple-500/20 to-pink-500/20" },
  { name: "Shila Shoes", category: "אופנה / E-Commerce", result: "₪280K מכירות בחודש", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "LetMeBe", category: "אפליקציה", result: "×12 ROI", color: "from-green-500/20 to-emerald-500/20" },
  { name: "Wheely", category: "תחבורה", result: "+800 לקוחות חדשים", color: "from-orange-500/20 to-yellow-500/20" },
  { name: "Global Ski", category: "תיירות", result: "₪118K הכנסה מ-₪7.8K", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "Unique Jewelry", category: "תכשיטים", result: "+520% מכירות אונליין", color: "from-pink-500/20 to-purple-500/20" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">תיק עבודות</p>
          <h2 className="text-4xl md:text-5xl font-black text-light mb-4">
            הצלחות <span className="gradient-text">מוכחות</span>
          </h2>
          <p className="text-light/50 text-lg max-w-xl mx-auto">
            מעל 15 מותגים שינו את הביצועים השיווקיים שלהם איתנו.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.color} border border-white/10 p-8 cursor-default`}
            >
              <div className="absolute inset-0 bg-dark/60" />
              <div className="relative z-10">
                <span className="text-xs text-light/40 font-medium uppercase tracking-wider">{p.category}</span>
                <h3 className="text-2xl font-black text-light mt-2 mb-6">{p.name}</h3>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-light font-bold text-sm">{p.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-primary/40 hover:border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-3 rounded-full transition-all"
          >
            רוצה תוצאות כאלה? דבר איתנו
          </a>
        </motion.div>
      </div>
    </section>
  );
}
