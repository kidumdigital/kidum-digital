// ─────────────────────────────────────────────────────────────
//  הגדרות טופס הלידים – כל החיבורים מוגדרים כאן במקום אחד
// ─────────────────────────────────────────────────────────────
//
//  זרימת ליד:
//  טופס באתר  →  POST /api/lead  →  (1) שמירה בטבלת leads ב-Supabase (גיבוי)
//                                  →  (2) שליחה ל-Fix CRM (Webhook)
//
//  ▶ איך מחברים את Fix CRM:
//    1. מבקשים מ-Fix CRM את כתובת ה-Webhook / API לקליטת לידים מאתר
//       (נקרא לפעמים "Lead Webhook", "קליטת לידים מאתר" או "API Key + URL").
//    2. ב-Vercel → Project → Settings → Environment Variables מוסיפים:
//         FIX_CRM_WEBHOOK_URL = הכתובת שקיבלתם
//         FIX_CRM_API_KEY     = (רק אם Fix CRM נתנו מפתח)
//    3. Redeploy – וזהו. כל ליד חדש יישלח אוטומטית ל-Fix CRM.
//
//    אם Fix CRM דורשים שמות שדות אחרים (למשל fullname במקום name) –
//    משנים רק את הפונקציה toFixCrmPayload למטה.
// ─────────────────────────────────────────────────────────────

export const leadConfig = {
  fixCrm: {
    webhookUrl: process.env.FIX_CRM_WEBHOOK_URL || "",
    apiKey: process.env.FIX_CRM_API_KEY || "",
    // אם Fix CRM מצפים ל-form-urlencoded במקום JSON – לשנות ל-"form"
    format: (process.env.FIX_CRM_FORMAT as "json" | "form") || "json",
  },
  supabase: {
    url: process.env.SUPABASE_URL || "",
    // מפתח publishable/anon – הטבלה מוגנת ב-RLS ומאפשרת הוספה בלבד (בלי קריאה)
    key: process.env.SUPABASE_ANON_KEY || "",
    table: "leads",
  },
};

// שמות השדות היציבים של הטופס – לא לשנות בלי לעדכן גם את ה-CRM
export type Lead = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  source_page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

// מיפוי הליד למבנה ש-Fix CRM מקבל
export function toFixCrmPayload(lead: Lead): Record<string, string> {
  return {
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    service: lead.service,
    message: lead.message,
    source: "kidum.digital",
    source_page: lead.source_page,
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_term: lead.utm_term,
    utm_content: lead.utm_content,
  };
}
