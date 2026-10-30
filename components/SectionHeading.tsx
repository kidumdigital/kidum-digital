import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-12 max-w-3xl sm:mb-16 ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
      <h2 className="h-display text-3xl sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-slate-400">{text}</p>}
    </Reveal>
  );
}
