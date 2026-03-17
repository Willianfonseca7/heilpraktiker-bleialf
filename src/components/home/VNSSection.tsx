export default function VNSSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 rounded-[2.5rem] border border-emerald-100/70 bg-[linear-gradient(135deg,rgba(246,250,244,0.98)_0%,rgba(240,247,237,0.98)_42%,rgba(233,242,229,0.98)_100%)] px-8 py-10 shadow-[0_18px_50px_rgba(34,84,61,0.08)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10 lg:py-12">

          {/* Texto */}
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">
              Diagnostik
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-emerald-800">
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.08)] backdrop-blur-sm">
                Moderne Diagnostik
              </span>

              <span className="rounded-full bg-white/70 px-3 py-1 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.08)] backdrop-blur-sm">
                HRV Messung
              </span>

              <span className="rounded-full bg-white/70 px-3 py-1 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.08)] backdrop-blur-sm">
                Wissenschaftlich basiert
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold leading-tight text-emerald-900 md:text-[2.45rem]">
              VNS Analyse – Ihr Nervensystem verstehen
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Die VNS Analyse misst die Aktivität Ihres vegetativen Nervensystems und
              zeigt, wie Ihr Körper auf Stress, Belastung und Erholung reagiert. So
              können wir Zusammenhänge besser erkennen und Therapien gezielter planen.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-white/60 bg-[rgba(255,255,255,0.55)] p-4 shadow-[0_10px_30px_rgba(53,94,70,0.06)] backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-emerald-900">
                  Stress erkennen
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Belastungen des Nervensystems frühzeitig sichtbar machen.
                </p>
              </div>

              <div className="rounded-2xl border border-white/60 bg-[rgba(255,255,255,0.55)] p-4 shadow-[0_10px_30px_rgba(53,94,70,0.06)] backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-emerald-900">
                  Regeneration messen
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Verstehen, wie gut Ihr Körper sich erholen kann.
                </p>
              </div>

              <div className="rounded-2xl border border-white/60 bg-[rgba(255,255,255,0.55)] p-4 shadow-[0_10px_30px_rgba(53,94,70,0.06)] backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-emerald-900">
                  Therapie anpassen
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Behandlungen gezielt auf Ihre Situation abstimmen.
                </p>
              </div>
            </div>

            <a
              href="/behandlungen#vns-analyse"
              className="mt-10 inline-block rounded-full bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
            >
              Mehr erfahren
            </a>
          </div>

          {/* Imagem ou gráfico */}
          <div className="relative ml-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(250,248,242,0.92)_0%,rgba(240,245,234,0.94)_100%)] p-3 shadow-[0_18px_45px_rgba(53,94,70,0.12)]">
            <div className="absolute inset-x-10 top-6 h-16 rounded-full bg-white/35 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,transparent_52%,rgba(240,245,234,0.3)_68%,rgba(231,240,226,0.65)_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,rgba(236,244,232,0.85)_0%,rgba(236,244,232,0.35)_48%,transparent_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,rgba(236,244,232,0.8)_0%,rgba(236,244,232,0.28)_48%,transparent_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(246,249,242,0.82)_0%,rgba(246,249,242,0.3)_48%,transparent_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,rgba(231,240,226,0.72)_0%,rgba(231,240,226,0.28)_45%,transparent_100%)]" />
            <img
              src="/images/home/vns.png"
              alt="VNS Analyse Messung"
              className="relative h-auto w-full rounded-[1.6rem] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
