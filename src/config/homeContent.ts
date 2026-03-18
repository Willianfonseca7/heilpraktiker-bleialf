import type { FeatureCardItem, HeroSlide } from "../types/home";

export const homeHeroSlides: HeroSlide[] = [
  { key: "akupunktur", label: "Akupunktur & TCM", image: "/images/behandlungen/akupunktur.jpg" },
  { key: "psychotherapie", label: "Psychotherapie", image: "/hero/pinscicologie.jpg" },
  { key: "lerntherapie", label: "Pädagogik & Lerntherapie", image: "/hero/kindertherapie.jpg" },
];

export const homeFeatureCards: FeatureCardItem[] = [
  {
    title: "Iridologie, Homöopathie, Akupunktur",
    image: "/images/behandlungen/irisartzt.png",
    items: [
      "Iridologie",
      "Homöopathie",
      "Akupunktur",
      "Chiropraxis",
      "Funktionelle Osteopathie und Integration (FOI)",
      "Vegacheck",
      "VNS-Analyse",
    ],
    href: "/team",
    buttonLabel: "Mehr erfahren",
  },
  {
    title: "Psychotherapie & Beratung",
    image: "/hero/pinscicologie.jpg",
    items: [
      "Ängste",
      "Stress und Druck",
      "Umgang mit schwierigen Lebensereignissen und Herausforderungen",
      "Selbstwertprobleme / geringer Selbstwert",
      "Paarberatung und Therapie",
    ],
    href: "/team",
    buttonLabel: "Mehr erfahren",
  },
  {
    title: "Pädagogik & Lerntherapie",
    image: "/images/behandlungen/pedagogie.jpg",
    imageObjectPosition: "center 32%",
    items: [
      "Pädagogin und Lerntherapeutin",
      "Lerntherapeutisches Training",
      "bei Lese/Rechtschreibschwäche / Legasthenie",
      "bei Rechenschwäche / Dyskalkulie",
    ],
    href: "/team",
    buttonLabel: "Mehr erfahren",
  },
  {
    title: "Interdisziplinäre Therapie",
    image: "/images/behandlungen/akupunktur.jpg",
    items: [
      "Interdisziplinäre Faszien Therapie (IFT®)",
      "Stress und Schmerz Resilienz nach Gordon Health®",
      "TCM - Traditionelle chinesische Medizin",
      "Akupunktur",
      "Schröpfen",
      "CMD-Kieferbehandlung bei Dysfunktion",
      "Physiotherapie (Selbstzahler)",
    ],
    href: "/team",
    buttonLabel: "Mehr erfahren",
  },
];
