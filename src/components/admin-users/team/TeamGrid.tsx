import TeamCard from "./TeamCard";
import type { TeamMember } from "@/data/team-members";

type TeamGridProps = {
  members: TeamMember[];
};

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-600">
          Therapeuten
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-emerald-800 md:text-4xl">
          Fachlich stark. Menschlich nah.
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Lernen Sie die Menschen kennen, die Sie in unserer Praxis begleiten.
          Jede Fachrichtung bringt eigene Schwerpunkte mit, verbunden durch
          einen gemeinsamen ganzheitlichen Anspruch.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {members.map((member) => (
          <TeamCard
            key={member.name}
            name={member.name}
            title={member.title}
            image={member.image}
            bio={member.bio}
            specialties={member.specialties}
          />
        ))}
      </div>
    </section>
  );
}
