"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { leadServiceOptions } from "@/lib/services";
import { validateLead } from "@/lib/validate-lead";
import { site } from "@/lib/site";

// ─────────────────────────────────────────────────────────────
//  טופס השארת פרטים. נשלח ל-/api/lead (ראו lib/lead-config.ts לחיבור Fix CRM).
//  שמות השדות (name / phone / email / service / message) קבועים ויציבים.
// ─────────────────────────────────────────────────────────────

type Errors = ReturnType<typeof validateLead>;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function LeadForm({
  defaultService = "",
  title = "השאירו פרטים ונחזור אליכם בהקדם",
  subtitle = "שיחת ייעוץ ראשונה – ללא עלות וללא התחייבות.",
  compact = false,
}: {
  defaultService?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});

  // שמירת פרמטרי UTM מהקמפיין (נשמרים גם במעבר בין עמודים)
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const fromUrl: Record<string, string> = {};
      UTM_KEYS.forEach((k) => p.get(k) && (fromUrl[k] = p.get(k)!));
      if (Object.keys(fromUrl).length) sessionStorage.setItem("kidum-utm", JSON.stringify(fromUrl));
      setUtm(Object.keys(fromUrl).length ? fromUrl : JSON.parse(sessionStorage.getItem("kidum-utm") || "{}"));
    } catch {}
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""), // honeypot
      source_page: window.location.pathname,
      ...utm,
    };
    const errs = validateLead(data);
    setErrors(errs);
    setServerError("");
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        formRef.current?.reset();
        // אירוע המרה – לשימוש ב-Google Tag Manager / פיקסל
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "lead_submit", service: data.service });
      } else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error || "משהו השתבש. נסו שוב או התקשרו אלינו.");
        setStatus("error");
      }
    } catch {
      setServerError("אין חיבור לרשת. נסו שוב או התקשרו אלינו.");
      setStatus("error");
    }
  }

  const fieldProps = (name: keyof Errors) => ({
    id: `${uid}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-err` : undefined,
  });
  const Err = ({ name }: { name: keyof Errors }) =>
    errors[name] ? (
      <p id={`${uid}-${name}-err`} className="mt-1.5 text-sm text-red-300">
        {errors[name]}
      </p>
    ) : null;

  return (
    <div className="glass glow-border relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[22rem] flex-col items-center justify-center text-center"
            role="status"
            aria-live="polite"
          >
            <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 220, damping: 14 }}>
              <CheckCircle2 className="h-16 w-16 text-teal" aria-hidden="true" />
            </motion.div>
            <h3 className="mt-5 font-display text-2xl font-bold text-white">תודה! הפרטים התקבלו</h3>
            <p className="mt-2 max-w-sm text-slate-300">נציג מצוות קידום דיגיטל יחזור אליכם בהקדם. רוצים לדבר כבר עכשיו?</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={site.contact.phone.href} className="btn-primary !py-2.5">
                <span dir="ltr">{site.contact.phone.display}</span>
              </a>
              <button type="button" onClick={() => setStatus("idle")} className="btn-ghost !py-2.5">
                שליחת פנייה נוספת
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" ref={formRef} onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-describedby={`${uid}-desc`}>
            <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
            <p id={`${uid}-desc`} className="mt-1.5 text-slate-400">
              {subtitle}
            </p>

            <div className={`mt-6 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
              <div>
                <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-medium text-slate-300">
                  שם מלא <span aria-hidden="true" className="text-gold">*</span>
                </label>
                <input {...fieldProps("name")} type="text" autoComplete="name" required className="field" placeholder="ישראל ישראלי" />
                <Err name="name" />
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-sm font-medium text-slate-300">
                  טלפון <span aria-hidden="true" className="text-gold">*</span>
                </label>
                <input {...fieldProps("phone")} type="tel" inputMode="tel" autoComplete="tel" required dir="ltr" className="field text-right" placeholder="050-0000000" />
                <Err name="phone" />
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-medium text-slate-300">
                  אימייל
                </label>
                <input {...fieldProps("email")} type="email" inputMode="email" autoComplete="email" dir="ltr" className="field text-right" placeholder="name@example.com" />
                <Err name="email" />
              </div>
              <div>
                <label htmlFor={`${uid}-service`} className="mb-1.5 block text-sm font-medium text-slate-300">
                  סוג השירות המבוקש
                </label>
                <select id={`${uid}-service`} name="service" defaultValue={defaultService} className="field appearance-none">
                  <option value="" className="bg-ink">
                    בחרו שירות
                  </option>
                  {leadServiceOptions.map((o) => (
                    <option key={o} value={o} className="bg-ink">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className={compact ? "" : "sm:col-span-2"}>
                <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-medium text-slate-300">
                  הודעה
                </label>
                <textarea {...fieldProps("message")} rows={compact ? 3 : 4} className="field resize-none" placeholder="ספרו לנו בקצרה על העסק ועל מה שאתם צריכים" />
                <Err name="message" />
              </div>
            </div>

            {/* honeypot – מוסתר מגולשים אמיתיים */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                אתר
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              בשליחת הטופס אני מאשר/ת שקראתי את{" "}
              <Link href="/privacy" className="text-teal-300 underline underline-offset-4">
                מדיניות הפרטיות
              </Link>{" "}
              ומסכים/ה שיחזרו אליי.
            </p>

            <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full !py-4 text-lg disabled:opacity-70">
              {status === "sending" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> שולח...
                </>
              ) : (
                <>
                  שלחו ונחזור אליכם <Send className="h-5 w-5 -scale-x-100" aria-hidden="true" />
                </>
              )}
            </button>

            <p role="alert" aria-live="assertive" className={`mt-3 text-center text-sm text-red-300 ${serverError ? "" : "sr-only"}`}>
              {serverError}
            </p>
            <p className="mt-3 text-center text-sm text-slate-500">
              או התקשרו:{" "}
              <a href={site.contact.phone.href} className="text-slate-300 hover:text-teal-300" dir="ltr">
                {site.contact.phone.display}
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
