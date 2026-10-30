// רקע אווירה: כתמי אור צבעוניים + רשת עדינה. סטטי ב-CSS – לא מכביד על הטעינה.
export function Backdrop({ variant = "hero" }: { variant?: "hero" | "soft" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute -top-40 right-[-10%] h-[38rem] w-[38rem] animate-aurora rounded-full opacity-60 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(48,173,190,.55), transparent 65%)" }}
      />
      {variant === "hero" && (
        <div
          className="absolute -bottom-40 left-[-10%] h-[32rem] w-[32rem] animate-aurora rounded-full opacity-40 blur-[120px] [animation-delay:-6s]"
          style={{ background: "radial-gradient(circle, rgba(237,181,72,.45), transparent 65%)" }}
        />
      )}
      <div
        className="absolute left-1/3 top-1/3 h-[24rem] w-[24rem] animate-aurora rounded-full opacity-40 blur-[120px] [animation-delay:-12s]"
        style={{ background: "radial-gradient(circle, rgba(3,37,58,.9), transparent 70%)" }}
      />
    </div>
  );
}
