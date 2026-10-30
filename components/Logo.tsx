import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Kidum Digital – לדף הבית">
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={40}
        height={40}
        priority
        className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105 sm:h-10 sm:w-10"
      />
      <span dir="ltr" className="font-brand text-lg font-semibold tracking-tight text-white sm:text-xl">
        Kidum <span className="text-teal">Digital</span>
      </span>
    </Link>
  );
}
