import Link from "next/link";

type TeamCTAProps = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export default function TeamCTA({
  title,
  description,
  buttonLabel,
  href,
}: TeamCTAProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-[2rem] border border-emerald-100 bg-[linear-gradient(135deg,rgba(247,252,248,0.98)_0%,rgba(237,247,241,0.98)_48%,rgba(231,243,235,0.98)_100%)] px-8 py-12 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-600">
          Naechster Schritt
        </p>
        <h2 className="mt-3 text-3xl font-bold text-emerald-800">{title}</h2>
        <p className="mt-3 max-w-2xl text-slate-600">{description}</p>

        <Link
          href={href}
          className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
