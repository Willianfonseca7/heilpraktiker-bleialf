type TeamHeroProps = {
  title: string;
  subtitle: string;
};

export default function TeamHero({ title, subtitle }: TeamHeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-[#568825] md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{subtitle}</p>
      </div>
    </section>
  );
}
