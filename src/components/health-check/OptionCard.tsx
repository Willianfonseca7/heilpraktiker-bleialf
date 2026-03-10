type OptionCardProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function OptionCard({
  label,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-teal-600 bg-teal-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-teal-300 hover:bg-gray-50"
      }`}
    >
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </button>
  );
}