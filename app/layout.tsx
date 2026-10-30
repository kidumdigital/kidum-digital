import type { Metadata, Viewport } from "next";
import { Heebo, Rubik, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { A11yWidget } from "@/components/A11yWidget";
import { site } from "@/lib/site";

const body = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-body", display: "swap" });
const display = Rubik({ subsets: ["hebrew", "latin"], weight: ["500", "700", "800"], variable: "--font-display", display: "swap" });
const brand = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-brand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.ogTitle, template: "%s | Kidum Digital" },
  description: site.ogDescription,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: site.url,
    siteName: site.name,
    title: site.ogTitle,
    description: site.ogDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Kidum Digital" }],
  },
  twitter: { card: "summary_large_image", title: site.ogTitle, description: site.ogDescription, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#020a10",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: site.nameHe,
  url: site.url,
  logo: `${site.url}/brand/logo-mark.png`,
  image: `${site.url}/og.jpg`,
  description: site.ogDescription,
  telephone: site.contact.phone.display,
  email: site.contact.email,
  address: { "@type": "PostalAddress", addressLocality: "זכרון יעקב", addressCountry: "IL" },
  areaServed: "IL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${body.variable} ${display.variable} ${brand.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[100] rounded-lg bg-gold px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:right-4 focus:top-4">
          דילוג לתוכן הראשי
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <A11yWidget />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
