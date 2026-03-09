import TeamCTA from "@/components/team/TeamCTA";
import TeamGrid from "@/components/team/TeamGrid";
import TeamHero from "@/components/team/TeamHero";
import { teamMembers } from "@/data/team-members";

export default function TeamPage() {
  return (
    <>
      <TeamHero
        title="Heilpraktiker-Zentrum Team"
        subtitle="Lernen Sie die Therapeuten des Heilpraktiker-Zentrums Bleialf kennen."
      />

      <TeamGrid members={teamMembers} />

      <TeamCTA
        title="Unsicher welche Behandlung für Sie geeignet ist?"
        description="Starten Sie unseren Gesundheits-Check und erhalten Sie eine erste Empfehlung."
        buttonLabel="Gesundheits-Check starten"
        href="/#health-check"
      />
    </>
  );
}
