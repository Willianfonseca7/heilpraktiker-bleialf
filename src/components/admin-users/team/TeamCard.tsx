import Image from "next/image";

type TeamCardProps = {
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties: string[];
};

export default function TeamCard({
  name,
  title,
  image,
  bio,
  specialties,
}: TeamCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_16px_32px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(15,23,42,0.08)]">
      <div className="relative h-80 w-full bg-emerald-50">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-2xl font-semibold text-slate-900">{name}</h2>
        <p className="mt-1 font-medium text-emerald-700">{title}</p>

        <p className="mt-4 min-h-[96px] text-sm leading-7 text-slate-600">
          {bio}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <span
              key={specialty}
              className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
