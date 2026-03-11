import TeamCard from "./TeamCard"
import type { TeamMember } from "@/data/team-members"

type TeamGridProps = {
  members: TeamMember[]
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      
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
  )
}