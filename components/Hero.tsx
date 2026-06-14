"use client";
import { motion } from "framer-motion";
import CardCarousel from "./CardCarousel";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#000000]">
      {/* 3D Card Carousel — full background */}
      <CardCarousel />

      {/* Overlay gradient so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/60 to-black/90 pointer-events-none z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          סוכנות שיווק דיגיטלי מובילה בישראל
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-7xl font-black leading-tight mb-6"
        >
          <span className="gradient-text">מדברים</span>
          <br />
          <span className="text-light">רק תוצאות</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-xl md:text-2xl text-light/60 max-w-2xl mx-auto mb-4"
        >
          ההצלחה שלך היא ההצלחה שלנו
        </motion.p>
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-base text-light/40 max-w-xl mx-auto mb-12"
        >
          קמפיינים ממומנים, SEO, ניהול רשתות חברתיות ובניית אתרים — הכל תחת קורת גג אחת.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 rounded-full transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105"
          >
            ייעוץ חינם עכשיו
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-primary/60 text-light/80 hover:text-light font-semibold text-lg px-8 py-4 rounded-full transition-all hover:bg-primary/10"
          >
            הצלחות לקוחות
          </a>
        </motion.div>

        {/* ROI proof */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-16 inline-flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-8 py-4"
        >
          <div className="text-center">
            <div className="text-sm text-light/50 mb-1">השקעה</div>
            <div className="text-2xl font-black text-light">₪7,849</div>
          </div>
          <div className="text-3xl text-primary font-black">→</div>
          <div className="text-center">
            <div className="text-sm text-light/50 mb-1">הכנסה</div>
            <div className="text-2xl font-black gradient-text">₪118,259</div>
          </div>
          <div className="hidden sm:block h-10 w-px bg-white/10 mx-2" />
          <div className="hidden sm:block text-center">
            <div className="text-sm text-light/50 mb-1">ROI</div>
            <div className="text-2xl font-black text-accent">×15</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
