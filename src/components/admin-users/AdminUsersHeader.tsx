type Props = {
  title: string;
  description: string;
  buttonLabel: string;
  onCreateClick: () => void;
};

export default function AdminUsersHeader({
  title,
  description,
  buttonLabel,
  onCreateClick,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        onClick={onCreateClick}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        {buttonLabel}
      </button>
    </div>
  );
}