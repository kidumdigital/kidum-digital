import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden pt-24 text-center">
      <Backdrop variant="soft" />
      <div className="container">
        <p className="text-gradient font-brand text-8xl font-bold sm:text-9xl">404</p>
        <h1 className="h-display mt-4 text-3xl sm:text-4xl">העמוד שחיפשתם לא נמצא</h1>
        <p className="mt-4 text-slate-400">אולי הוא עבר מקום – אבל אנחנו עדיין כאן.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            לדף הבית
          </Link>
          <Link href="/contact" className="btn-ghost">
            צור קשר
          </Link>
        </div>
      </div>
    </section>
  );
}
