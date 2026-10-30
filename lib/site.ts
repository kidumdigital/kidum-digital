// ─────────────────────────────────────────────────────────────
// פרטי העסק – נלקחו כפי שהם מהאתר kidum.digital.
// לשינוי טלפון / מייל / כתובת – מעדכנים כאן בלבד וזה מתעדכן בכל האתר.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Kidum Digital",
  nameHe: "קידום דיגיטל",
  url: "https://kidum.digital",
  slogan: "ההצלחה שלך היא ההצלחה שלנו",
  tagline: "מדברים רק תוצאות.",
  // כותרת ותיאור לשיתוף ברשתות / וואטסאפ
  ogTitle: "ההצלחה שלך היא ההצלחה שלנו | סוכנות פרסום ושיווק בדיגיטל - Kidum Digital",
  ogDescription:
    "סוכנות פרסום ושיווק, המתמחה בכל זירות הפרסום אונליין ואופליין. ביכולתנו לקחת עסק ובזמן קצר להפוך אותו לרווחי מאוד. מדברים רק תוצאות.",

  contact: {
    // טלפון ראשי (מופיע בכותרת האתר הקיים)
    phone: { display: "077-2313548", href: "tel:0772313548" },
    // טלפונים נוספים שמופיעים באתר הקיים
    phoneAlt: { display: "077-2316152", href: "tel:0772316152" },
    phoneHours: { display: "077-8040984", href: "tel:0778040984", note: "20:00 - 8:00" },
    mobile: { display: "050-909-2293", href: "tel:0509092293" },
    whatsapp: {
      display: "050-909-2293",
      href: "https://wa.me/972509092293?text=" + encodeURIComponent("היי, הגעתי מהאתר ואשמח לשמוע פרטים"),
    },
    email: "kidum.digital@gmail.com",
    address: "מושבת זכרון יעקב",
    waze: "https://www.waze.com/ul?ll=32.575176,34.948364&navigate=yes",
    hours: [
      { days: "ימי א׳ - ה׳", time: "9:00 - 18:00" },
      { days: "ימי שישי", time: "9:00 - 18:00" },
    ],
    // תיאום שיחה ביומן (TidyCal) – הקישור מהאתר הקיים
    calendar: "https://tidycal.com/kidumdigital/web",
  },

  // רשתות חברתיות – לא נמצאו באתר הקיים. להוספה: מלאו כתובת והיא תוצג בפוטר.
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
  },
} as const;

export const nav = [
  { href: "/", label: "דף הבית" },
  { href: "/services", label: "שירותים" },
  { href: "/results", label: "תוצאות" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
] as const;
