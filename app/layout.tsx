import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-heebo" });

export const metadata: Metadata = {
  title: "קידום דיגיטל | מדברים רק תוצאות",
  description:
    "סוכנות שיווק דיגיטלי מובילה — ניהול קמפיינים ממומנים, SEO, בניית אתרים, ניהול רשתות חברתיות ועוד. ההצלחה שלך היא ההצלחה שלנו.",
  keywords: "שיווק דיגיטלי, קידום אתרים, SEO, גוגל אדס, פייסבוק אדס, ניהול רשתות חברתיות",
  openGraph: {
    title: "קידום דיגיטל | מדברים רק תוצאות",
    description: "סוכנות שיווק דיגיטלי מובילה — תוצאות מוכחות לעסקים בישראל.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body>{children}</body>
    </html>
  );
}
