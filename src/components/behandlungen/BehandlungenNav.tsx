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
      <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 py-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="whitespace-nowrap rounded-full border border-emerald-100 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
