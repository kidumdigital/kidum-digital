import Link from "next/link";
import { Phone, Send } from "lucide-react";
import { WhatsAppIcon } from "./Icon";
import { site } from "@/lib/site";

// כפתור וואטסאפ צף (דסקטופ) + פס פעולות קבוע בתחתית (מובייל)
export function FloatingActions() {
  const c = site.contact;
  return (
    <>
      <a
        href={c.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שלחו לנו הודעה בוואטסאפ"
        className="fixed bottom-6 left-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition hover:scale-110 md:grid"
      >
        <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>

      <nav aria-label="פעולות מהירות" className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <div className="glass-strong grid grid-cols-3 gap-1 rounded-2xl p-1.5 shadow-2xl shadow-black/60">
          <a href={c.phone.href} className="flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-semibold text-white active:bg-white/10">
            <Phone className="h-5 w-5 text-teal" aria-hidden="true" />
            חייגו
          </a>
          <a
            href={c.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-semibold text-white active:bg-white/10"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            וואטסאפ
          </a>
          <Link href="/contact#lead" className="flex flex-col items-center gap-1 rounded-xl bg-gold py-2 text-xs font-bold text-ink">
            <Send className="h-5 w-5" aria-hidden="true" />
            השאירו פרטים
          </Link>
        </div>
      </nav>
    </>
  );
}
