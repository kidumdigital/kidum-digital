"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", business: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // כאן יש לחבר לשירות שליחת טפסים (Formspree, EmailJS וכו')
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-dark relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">בואו נדבר</p>
          <h2 className="text-4xl md:text-5xl font-black text-light mb-4">
            קבל ייעוץ <span className="gradient-text">חינם</span>
          </h2>
          <p className="text-light/50 text-lg max-w-xl mx-auto">
            ממלאים טופס, ואנחנו חוזרים אליך תוך 24 שעות עם תוכנית מותאמת אישית.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-xl flex-shrink-0">📞</div>
              <div>
                <div className="text-light font-bold mb-1">טלפון</div>
                <a href="tel:0772313548" className="text-light/60 hover:text-primary transition-colors text-lg">077-2313548</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-xl flex-shrink-0">🕐</div>
              <div>
                <div className="text-light font-bold mb-1">שעות פעילות</div>
                <div className="text-light/60">ימים א׳–ו׳ | 8:00–20:00</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-xl flex-shrink-0">💬</div>
              <div>
                <div className="text-light font-bold mb-1">WhatsApp</div>
                <a
                  href="https://wa.me/972772313548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm mt-1"
                >
                  שלח הודעה עכשיו
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {sent ? (
              <div className="gradient-border rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-light mb-2">תודה! קיבלנו את הפנייה שלך</h3>
                <p className="text-light/50">נחזור אליך תוך 24 שעות.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="gradient-border rounded-2xl p-8 space-y-5 bg-white/2">
                <div>
                  <label className="block text-light/70 text-sm mb-2">שם מלא *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="ישראל ישראלי"
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl px-4 py-3 text-light placeholder-light/30 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-light/70 text-sm mb-2">טלפון *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="050-0000000"
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl px-4 py-3 text-light placeholder-light/30 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-light/70 text-sm mb-2">שם העסק</label>
                  <input
                    type="text"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    placeholder="העסק שלי בע״מ"
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl px-4 py-3 text-light placeholder-light/30 outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  שלח וקבל ייעוץ חינם
                </button>
                <p className="text-center text-light/30 text-xs">ללא התחייבות. הפרטים שמורים בסודיות מלאה.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
