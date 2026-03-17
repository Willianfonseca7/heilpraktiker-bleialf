export type ClinicPractitioner = {
  name: string;
  treatments: string[];
};

export const clinicTreatments = [
  "Iridologie",
  "Homöopathie",
  "Akupunktur",
  "Vegacheck",
  "VNS Analyse",
  "Chiropraxis",
  "Funktionelle Osteopathie (FOI)",
  "Faszientherapie",
  "Stress- und Schmerzresilienz",
  "TCM - Traditionelle chinesische Medizin",
  "Schröpfen",
  "CMD-Kieferbehandlung",
  "Physiotherapie",
  "Ängste",
  "Stress und Druck",
  "Schwierige Lebensereignisse",
  "Selbstwertprobleme",
  "Paarberatung",
  "Legasthenie",
  "Dyskalkulie",
  "Lerntherapeutisches Training",
] as const;

export type ClinicTreatment = (typeof clinicTreatments)[number];

export const clinicPractitioners: ClinicPractitioner[] = [
  {
    name: "Johannes Willems",
    treatments: [
      "Iridologie",
      "Homöopathie",
      "Akupunktur",
      "Vegacheck",
      "VNS Analyse",
      "Chiropraxis",
      "Funktionelle Osteopathie (FOI)",
    ],
  },
  {
    name: "Miriam Schweisthal",
    treatments: [
      "Akupunktur",
      "Faszientherapie",
      "Stress- und Schmerzresilienz",
      "TCM - Traditionelle chinesische Medizin",
      "Schröpfen",
      "CMD-Kieferbehandlung",
      "Physiotherapie",
    ],
  },
  {
    name: "Manuel Posch",
    treatments: [
      "Ängste",
      "Stress und Druck",
      "Schwierige Lebensereignisse",
      "Selbstwertprobleme",
      "Paarberatung",
    ],
  },
  {
    name: "Ellen Ernst",
    treatments: [
      "Legasthenie",
      "Dyskalkulie",
      "Lerntherapeutisches Training",
    ],
  },
];

const treatmentAliases: Record<string, ClinicTreatment> = {
  "VNS-Analyse": "VNS Analyse",
  "TCM – Traditionelle chinesische Medizin":
    "TCM - Traditionelle chinesische Medizin",
  "Funktionelle Osteopathie und Integration (FOI)":
    "Funktionelle Osteopathie (FOI)",
};

export function normalizeClinicTreatment(value: string): string {
  return treatmentAliases[value] ?? value;
}

export function isClinicTreatment(value: string): value is ClinicTreatment {
  const normalized = normalizeClinicTreatment(value);
  return clinicTreatments.includes(normalized as ClinicTreatment);
}

export function getPractitionersForTreatment(
  treatment: string
): ClinicPractitioner[] {
  const normalized = normalizeClinicTreatment(treatment);
  return clinicPractitioners.filter((practitioner) =>
    practitioner.treatments.includes(normalized)
  );
}

export function isValidPractitionerForTreatment(
  treatment: string,
  practitionerName: string
): boolean {
  return getPractitionersForTreatment(treatment).some(
    (practitioner) => practitioner.name === practitionerName
  );
}

export function getPreferredClinicTreatment(preferredTreatments: string[]): string {
  return (
    preferredTreatments
      .map((treatment) => normalizeClinicTreatment(treatment))
      .find((treatment) => isClinicTreatment(treatment)) ??
    clinicTreatments[0]
  );
}
