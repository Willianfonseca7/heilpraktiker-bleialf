export default function VNSSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 rounded-[2.5rem] border border-emerald-100/70 bg-[linear-gradient(135deg,rgba(246,250,244,0.98)_0%,rgba(240,247,237,0.98)_42%,rgba(233,242,229,0.98)_100%)] px-6 py-8 shadow-[0_18px_50px_rgba(34,84,61,0.08)] md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10 lg:py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Diagnostik
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs font-medium text-emerald-800">
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

            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.08] text-emerald-950 md:text-[2.45rem]">
              VNS Analyse – Ihr Nervensystem verstehen
            </h2>

            <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-slate-600 md:text-lg">
              Die VNS Analyse misst die Aktivität Ihres vegetativen Nervensystems und
              zeigt, wie Ihr Körper auf Stress, Belastung und Erholung reagiert. So
              können wir Zusammenhänge besser erkennen und Therapien gezielter planen.
            </p>

            <div className="mt-8 space-y-3.5">
              <div className="rounded-[1.75rem] border border-white/70 bg-white/68 p-5 shadow-[0_12px_32px_rgba(53,94,70,0.06)] backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Was sichtbar wird
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/55 p-3.5">
                    <h3 className="text-base font-semibold text-emerald-950">
                      Stress & Belastung
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Erkennen, wie stark Ihr System unter Spannung steht und wie es auf
                      Anforderungen reagiert.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/55 p-3.5">
                    <h3 className="text-base font-semibold text-emerald-950">
                      Erholung & Regulation
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Sichtbar machen, wie gut Regeneration, Schlaf und vagale Aktivitaet
                      zusammenspielen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-emerald-100/80 bg-[linear-gradient(135deg,rgba(236,253,245,0.95)_0%,rgba(220,252,231,0.82)_100%)] p-5">
                <p className="text-sm font-semibold text-emerald-900">
                  Die Auswertung schafft eine klare Grundlage fuer Therapie, Verlaufskontrolle und Praevention.
                </p>
              </div>
            </div>

            <a
              href="/behandlungen#vns-analyse"
              className="mt-8 inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 font-medium text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)] transition hover:bg-emerald-700"
            >
              Mehr erfahren
            </a>
          </div>

          <div className="relative ml-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(244,249,241,0.96)_100%)] p-5 shadow-[0_18px_45px_rgba(53,94,70,0.10)] md:p-6">
            <div className="absolute inset-x-10 top-6 h-14 rounded-full bg-white/45 blur-2xl" />
            <div className="absolute right-5 top-5 h-24 w-24 rounded-full border border-emerald-100/70" />
            <div className="absolute bottom-6 left-6 h-24 w-24 rounded-full border border-emerald-100/60" />

            <div className="relative rounded-[1.8rem] border border-white/80 bg-[linear-gradient(180deg,rgba(249,252,247,0.99)_0%,rgba(241,247,238,0.98)_100%)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)] md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                    VNS Readout
                  </p>
                  <h3 className="mt-2 text-[1.75rem] font-semibold leading-tight text-emerald-950">
                    Autonome Balance
                  </h3>
                </div>
                <span className="rounded-full border border-emerald-200/80 bg-white/85 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-sm">
                  HRV / Regulation
                </span>
              </div>

              <div className="mt-8">
                <div className="relative mx-auto flex h-64 w-full max-w-[22rem] items-center justify-center">
                  <div className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(220,252,231,0.98)_0%,rgba(167,243,208,0.7)_44%,rgba(255,255,255,0.96)_72%)]" />
                  <div className="absolute h-48 w-48 rounded-full border border-emerald-200/80" />
                  <div className="absolute h-36 w-36 rounded-full border border-emerald-300/70" />
                  <div className="absolute h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.98)_0%,rgba(6,95,70,1)_100%)] shadow-[0_0_28px_rgba(16,185,129,0.22)]" />
                  <div className="absolute h-0.5 w-44 bg-emerald-300/70" />
                  <div className="absolute h-44 w-0.5 bg-emerald-300/70" />
                  <div className="absolute h-52 w-52 rounded-full border border-dashed border-emerald-200/70" />
                  <div className="absolute h-64 w-64 rounded-full border border-emerald-100/55" />

                  <div className="absolute right-0 top-10 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
                    Stress
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
                    Regulation
                  </div>
                  <div className="absolute bottom-7 right-7 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
                    Erholung
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/70 bg-white/80 p-4 text-center shadow-[0_10px_24px_rgba(53,94,70,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                    Lesen
                  </p>
                  <p className="mt-2 text-sm font-medium text-emerald-950">
                    Zustand des Nervensystems
                  </p>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/80 p-4 text-center shadow-[0_10px_24px_rgba(53,94,70,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                    Verstehen
                  </p>
                  <p className="mt-2 text-sm font-medium text-emerald-950">
                    Belastung und Erholung
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-100/80 bg-[linear-gradient(180deg,rgba(236,253,245,0.95)_0%,rgba(220,252,231,0.86)_100%)] p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                    Handeln
                  </p>
                  <p className="mt-2 text-sm font-medium text-emerald-950">
                    Therapie gezielt planen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
