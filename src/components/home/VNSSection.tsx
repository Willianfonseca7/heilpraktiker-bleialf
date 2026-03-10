export default function VNSSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">

        {/* Texto */}
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-500">
            Diagnostik
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-emerald-700">
            <span className="rounded-full bg-emerald-50 px-3 py-1">
              Moderne Diagnostik
            </span>

            <span className="rounded-full bg-emerald-50 px-3 py-1">
              HRV Messung
            </span>

            <span className="rounded-full bg-emerald-50 px-3 py-1">
              Wissenschaftlich basiert
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-semibold leading-tight text-emerald-800 md:text-[2.45rem]">
            VNS Analyse – Ihr Nervensystem verstehen
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Die VNS Analyse misst die Aktivität Ihres vegetativen Nervensystems und
            zeigt, wie Ihr Körper auf Stress, Belastung und Erholung reagiert. So
            können wir Zusammenhänge besser erkennen und Therapien gezielter planen.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-emerald-800">
                Stress erkennen
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Belastungen des Nervensystems frühzeitig sichtbar machen.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-emerald-800">
                Regeneration messen
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Verstehen, wie gut Ihr Körper sich erholen kann.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-emerald-800">
                Therapie anpassen
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Behandlungen gezielt auf Ihre Situation abstimmen.
              </p>
            </div>
          </div>

          <a
            href="/behandlungen#vns-analyse"
            className="inline-block mt-10 rounded-full bg-emerald-600 px-6 py-3 text-white font-medium transition hover:bg-emerald-700"
          >
            Mehr erfahren
          </a>
        </div>

        {/* Imagem ou gráfico */}
        <div className="relative ml-auto w-full max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-sm">
          <img
            src="/images/home/vns.png"
            alt="VNS Analyse Messung"
            className="h-auto w-full object-contain"
          />
        </div>

      </div>
    </section>
  );
}
