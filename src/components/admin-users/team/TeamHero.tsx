type TeamHeroProps = {
  title: string;
  subtitle: string;
};

export default function TeamHero({ title, subtitle }: TeamHeroProps) {
  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-emerald-100 bg-[linear-gradient(135deg,rgba(247,252,248,0.98)_0%,rgba(237,247,241,0.98)_48%,rgba(231,243,235,0.98)_100%)] px-5 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:px-8 md:px-12 md:py-12">
          <div className="max-w-4xl">
            <span className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-600">
              Unser Team
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-emerald-800 sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              {subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Persoenliche Begleitung",
                "Ganzheitlicher Blick",
                "Interdisziplinaeres Team",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-emerald-100 bg-white/75 px-4 py-2 text-sm font-semibold text-emerald-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
