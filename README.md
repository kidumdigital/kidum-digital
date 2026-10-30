# Kidum Digital – אתר החברה

אתר תדמית ולידים של קידום דיגיטל. בנוי ב-Next.js 14 (App Router), עם Tailwind CSS ו-Framer Motion. האתר בעברית ותומך ב-RTL.

## הרצה מקומית

```bash
npm install
cp .env.example .env.local   # ממלאים ערכים
npm run dev                  # http://localhost:3000
```

## מבנה הקבצים

| נתיב | מה יש בו |
| --- | --- |
| `lib/site.ts` | **פרטי קשר** (טלפונים, וואטסאפ, מייל, כתובת, שעות), רשתות חברתיות ותפריט. משנים כאן, וזה מתעדכן בכל האתר. |
| `lib/services.ts` | כל השירותים. כל שירות מקבל עמוד משלו ב-`/services/<slug>`. |
| `lib/content.ts` | המלצות, פרויקטים, תוצאות, שלבי עבודה ושאלות נפוצות. |
| `lib/lead-config.ts` | **חיבור הטופס ל-Fix CRM**, במקום אחד. |
| `app/api/lead/route.ts` | נקודת הקצה שמקבלת לידים, מאמתת אותם, שומרת ב-Supabase ומעבירה ל-Fix CRM. |
| `app/*/page.tsx` | העמודים: בית, שירותים, עמוד שירות, תוצאות, אודות, צור קשר, נגישות ופרטיות. |
| `components/` | רכיבים: כותרת, פוטר, טופס, תפריט נגישות, אנימציות ועוד. |
| `public/` | לוגו, תמונת שיתוף (`og.jpg`), צילומי תוצאות ולוגואים של לקוחות. |

## משתני סביבה

| משתנה | תיאור |
| --- | --- |
| `SUPABASE_URL` | כתובת הפרויקט ב-Supabase (גיבוי לידים בטבלה `leads`). |
| `SUPABASE_ANON_KEY` | מפתח publishable. הטבלה מוגנת ב-RLS, כך שאפשר רק להוסיף לידים ולא לקרוא אותם. |
| `FIX_CRM_WEBHOOK_URL` | כתובת ה-Webhook של Fix CRM לקליטת לידים. |
| `FIX_CRM_API_KEY` | אופציונלי: מפתח, אם Fix CRM דורשים. |
| `FIX_CRM_FORMAT` | `json` (ברירת מחדל) או `form`. |

## חיבור Fix CRM

1. מבקשים מ-Fix CRM כתובת Webhook או API לקליטת לידים מאתר.
2. ב-Vercel נכנסים ל-Settings, משם ל-Environment Variables, ומוסיפים את `FIX_CRM_WEBHOOK_URL` (ואת `FIX_CRM_API_KEY` אם נדרש).
3. מריצים Redeploy.

שדות הליד שנשלחים: `name`, `phone`, `email`, `service`, `message`, `source`, `source_page`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
אם Fix CRM דורשים שמות שדות אחרים, משנים את `toFixCrmPayload` ב-`lib/lead-config.ts`.

## העלאה לאוויר

הפרויקט מחובר ל-Vercel (פרויקט `kidum-digital`). כל push ל-`main` מתפרסם אוטומטית ל-Production, וכל ענף אחר מקבל כתובת Preview.
לחיבור הדומיין: ב-Vercel נכנסים ל-Settings, משם ל-Domains, ומוסיפים `kidum.digital`. אחר כך מעדכנים את רשומות ה-DNS אצל רשם הדומיין לפי ההוראות שמופיעות שם.
