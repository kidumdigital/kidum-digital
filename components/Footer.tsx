export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#050508] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black mb-3">
              <span className="gradient-text">קידום</span>
              <span className="text-light"> דיגיטל</span>
            </div>
            <p className="text-light/40 text-sm leading-relaxed max-w-xs">
              סוכנות שיווק דיגיטלי מובילה בישראל. מדברים רק תוצאות.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-light font-semibold mb-4">שירותים</h4>
            <ul className="space-y-2 text-light/40 text-sm">
              {["קמפיינים ממומנים", "SEO אורגני", "בניית אתרים", "ניהול סושיאל", "עיצוב ומיתוג", "CRM וצ'אטבוטים"].map((s) => (
                <li key={s}><a href="#services" className="hover:text-primary transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-light font-semibold mb-4">צור קשר</h4>
            <ul className="space-y-3 text-light/40 text-sm">
              <li><a href="tel:0772313548" className="hover:text-primary transition-colors">077-2313548</a></li>
              <li>ימים א׳–ו׳ | 8:00–20:00</li>
              <li>
                <a
                  href="https://wa.me/972772313548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  WhatsApp ←
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-light/25 text-sm">© {year} קידום דיגיטל. כל הזכויות שמורות.</p>
          <div className="flex gap-6 text-light/25 text-sm">
            <a href="#" className="hover:text-light/50 transition-colors">מדיניות פרטיות</a>
            <a href="#" className="hover:text-light/50 transition-colors">תנאי שימוש</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
