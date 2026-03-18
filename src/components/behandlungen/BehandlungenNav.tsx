const items = [
  { label: "Psychologische Beratung", id: "psychologische-beratung" },
  { label: "Lerntherapie", id: "lerntherapie" },
  { label: "Körpertherapie", id: "koerpertherapie" },
  { label: "Naturheilverfahren", id: "naturheilverfahren" },
  { label: "TCM", id: "tcm" },
  { label: "Spezielle Behandlungen", id: "spezielle-behandlungen" },
];

export default function BehandlungenNav() {
  return (
    <div className="sticky top-0 z-30 border-y border-emerald-100 bg-[rgba(240,249,244,0.95)] shadow-sm backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          aria-label="Behandlungen Navigation"
          className="grid grid-cols-2 gap-2 py-3 sm:grid-cols-3 md:hidden"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-emerald-100 bg-white/80 px-3 py-2 text-center text-sm font-medium text-gray-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <div className="-mx-2 overflow-x-auto px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <nav
              aria-label="Behandlungen Navigation"
              className="flex min-w-max gap-3 py-3"
            >
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="shrink-0 whitespace-nowrap rounded-full border border-emerald-100 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
