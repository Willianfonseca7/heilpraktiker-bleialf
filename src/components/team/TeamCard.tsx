import Image from "next/image"

type TeamCardProps = {
  name: string
  title: string
  image: string
  bio: string
  specialties: string[]
}

export default function TeamCard({
  name,
  title,
  image,
  bio,
  specialties,
}: TeamCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">

      {/* Image */}
      <div className="relative h-80 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      

      <div className="p-6">

          {/* Name */}
          <h2 className="text-2xl font-semibold text-slate-900">
            {name}
          </h2>

          {/* Title */}
          <p className="mt-1 font-medium text-green-700">
            {title}
          </p>

          {/* Bio */}
          <p className="mt-4 text-sm leading-relaxed text-slate-600 min-h-[72px]">
            {bio}
          </p>

          {/* Specialties */}
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {specialties.map((specialty) => (
              <li key={specialty} className="flex gap-2">
                <span className="text-green-600">•</span>
                {specialty}
              </li>
            ))}
          </ul>

      </div>
    </article>
  )
} 