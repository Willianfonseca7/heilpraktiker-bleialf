export type TeamMember = {
  name: string
  title: string
  image: string
  bio: string
  specialties: string[]
}

export const teamMembers: TeamMember[] = [
  {
    name: "Johannes Willems",
    title: "Heilpraktiker",
    image: "/images/team/johannes-willems.png",
    bio: "Johannes Willems begleitet seit vielen Jahren Menschen auf ihrem Weg zu mehr Gesundheit und Wohlbefinden. Sein Ansatz basiert auf einer ganzheitlichen Betrachtung des Menschen und verbindet moderne Diagnostik mit bewährten naturheilkundlichen Methoden.",
    specialties: [
      "Iridologie",
      "Homöopathie",
      "Akupunktur",
      "Chiropraxis",
      "Funktionelle Osteopathie (FOI)",
      "Vegacheck",
      "VNS Analyse"
    ]
  },

  {
    name: "Manuel Posch",
    title: "Heilpraktiker für Psychotherapie",
    image: "/images/team/manuel-posch.png",
    bio: "Manuel Posch begleitet Menschen in herausfordernden Lebenssituationen und unterstützt sie dabei, neue Perspektiven zu entwickeln. Sein therapeutischer Ansatz basiert auf Vertrauen, Wertschätzung und der Stärkung persönlicher Ressourcen.",
    specialties: [
      "Ängste",
      "Stress und Druck",
      "Schwierige Lebensereignisse",
      "Selbstwertprobleme",
      "Paarberatung"
    ]
  },

  {
    name: "Ellen Ernst",
    title: "Pädagogin und Lerntherapeutin",
    image: "/images/team/ellen-ernst.jpeg",
    bio: "Ellen Ernst verfügt über langjährige Erfahrung in der Förderung von Kindern mit Lernschwierigkeiten. Sie unterstützt Kinder mit Legasthenie und Dyskalkulie dabei, ihre Fähigkeiten zu entwickeln und wieder Freude am Lernen zu finden.",
    specialties: [
      "Legasthenie",
      "Dyskalkulie",
      "Lerntherapeutisches Training"
    ]
  },

  {
    name: "Miriam Schweisthal",
    title: "Heilpraktikerin",
    image: "/images/team/miriam-schweisthal.png",
    bio: "Miriam Schweisthal ergänzt das Team mit ihrem Schwerpunkt auf ganzheitlicher Körpertherapie. Sie verbindet moderne Ansätze der Faszien- und Schmerztherapie mit Elementen der traditionellen chinesischen Medizin.",
    specialties: [
      "Faszientherapie",
      "Stress- und Schmerzresilienz",
      "TCM – Traditionelle chinesische Medizin",
      "Akupunktur",
      "Schröpfen",
      "CMD-Kieferbehandlung",
      "Physiotherapie"
    ]
  }
]
