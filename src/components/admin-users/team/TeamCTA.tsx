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
      <div className="rounded-3xl bg-emerald-700 px-8 py-12 text-white">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-3 max-w-2xl text-white/90">{description}</p>

        <Link
          href={href}
          className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-medium text-emerald-700 transition hover:bg-slate-100"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
