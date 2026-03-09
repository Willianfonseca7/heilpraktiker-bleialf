export type TeamMember = {
  name: string;
  title: string;
  image: string;
  specialties: string[];
};

export const teamMembers: TeamMember[] = [
  {
    name: "Johannes Willems",
    title: "Heilpraktiker",
    image: "/hero/images/team/johannes-willems.png",
    specialties: [
      "Iridologie",
      "Homöopathie",
      "Akupunktur",
      "Chiropraxis",
      "FOI – Funktionelle Osteopathie",
      "Vegacheck",
      "VNS-Analyse",
    ],
  },
  {
    name: "Manuel Posch",
    title: "Heilpraktiker für Psychotherapie",
    image: "/hero/images/team/manuel-posch.png",
    specialties: [
      "Ängste",
      "Stress und Druck",
      "Schwierige Lebensereignisse",
      "Selbstwertprobleme",
      "Paarberatung",
    ],
  },
  {
    name: "Ellen Ernst",
    title: "Pädagogin und Lerntherapeutin",
    image: "/hero/images/team/ellen-ernst.jpeg",
    specialties: [
      "Legasthenie",
      "Dyskalkulie",
      "Lerntherapeutisches Training",
    ],
  },
  {
    name: "Miriam Schweisthal",
    title: "Heilpraktikerin",
    image: "/hero/images/team/miriam-schweisthal.png",
    specialties: [
      "Faszientherapie",
      "Stress- und Schmerzresilienz",
      "TCM – Traditionelle chinesische Medizin",
      "Akupunktur",
      "Schröpfen",
      "CMD-Kieferbehandlung",
      "Physiotherapie",
    ],
  },
];
