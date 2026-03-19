const treatmentSectionMap: Record<string, string> = {
  "aengste": "psychologische-beratung",
  "angste": "psychologische-beratung",
  "paarberatung": "psychologische-beratung",
  "stress-und-druck": "psychologische-beratung",
  "stress": "psychologische-beratung",
  "schwierige-lebensereignisse": "psychologische-beratung",
  "umgang-mit-schwierigen-lebensereignissen-und-herausforderungen":
    "psychologische-beratung",
  "selbstwertprobleme": "psychologische-beratung",
  "selbstwertprobleme-geringer-selbstwert": "psychologische-beratung",
  "legasthenie": "lerntherapie",
  "dyskalkulie": "lerntherapie",
  "lerntherapeutisches-training": "lerntherapie",
  "padagogin-und-lerntherapeutin": "lerntherapie",
  "padagogik-und-lerntherapie": "lerntherapie",
  "bei-lese-rechtschreibschwache-legasthenie": "lerntherapie",
  "bei-rechenschwache-dyskalkulie": "lerntherapie",
  "faszientherapie": "koerpertherapie",
  "interdisziplinare-faszien-therapie-ift": "koerpertherapie",
  "stress-und-schmerzresilienz": "koerpertherapie",
  "stress-und-schmerz-resilienz-nach-gordon-health": "koerpertherapie",
  "physiotherapie": "koerpertherapie",
  "physiotherapie-selbstzahler": "koerpertherapie",
  "iridologie": "naturheilverfahren",
  "homoeopathie": "naturheilverfahren",
  "homopathie": "naturheilverfahren",
  "homoopathie": "naturheilverfahren",
  "vegacheck": "naturheilverfahren",
  "vns-analyse": "naturheilverfahren",
  "tcm-traditionelle-chinesische-medizin": "tcm",
  "traditionelle-chinesische-medizin": "tcm",
  "akupunktur": "tcm",
  "schroepfen": "tcm",
  "schropfen": "tcm",
  "cmd-kieferbehandlung": "spezielle-behandlungen",
  "cmd-kieferbehandlung-bei-dysfunktion": "spezielle-behandlungen",
  "chiropraxis": "spezielle-behandlungen",
  "funktionelle-osteopathie-und-integration-foi": "spezielle-behandlungen",
  "foi": "spezielle-behandlungen",
};

const treatmentItemMap: Record<string, string> = {
  "aengste": "aengste",
  "angste": "aengste",
  "paarberatung": "paarberatung",
  "paarberatung-und-therapie": "paarberatung",
  "stress-und-druck": "stress-und-druck",
  "stress": "stress-und-druck",
  "schwierige-lebensereignisse": "schwierige-lebensereignisse",
  "umgang-mit-schwierigen-lebensereignissen-und-herausforderungen":
    "schwierige-lebensereignisse",
  "selbstwertprobleme": "selbstwertprobleme",
  "selbstwertprobleme-geringer-selbstwert": "selbstwertprobleme",
  "legasthenie": "legasthenie",
  "dyskalkulie": "dyskalkulie",
  "lerntherapeutisches-training": "lerntherapeutisches-training",
  "padagogin-und-lerntherapeutin": "lerntherapeutisches-training",
  "padagogik-und-lerntherapie": "lerntherapeutisches-training",
  "bei-lese-rechtschreibschwache-legasthenie": "legasthenie",
  "bei-rechenschwache-dyskalkulie": "dyskalkulie",
  "faszientherapie": "faszientherapie",
  "interdisziplinare-faszien-therapie-ift": "faszientherapie",
  "stress-und-schmerzresilienz": "stress-und-schmerzresilienz",
  "stress-und-schmerz-resilienz-nach-gordon-health": "stress-und-schmerzresilienz",
  "physiotherapie": "physiotherapie",
  "physiotherapie-selbstzahler": "physiotherapie",
  "iridologie": "iridologie",
  "homoeopathie": "homopathie",
  "homopathie": "homopathie",
  "homoopathie": "homopathie",
  "vegacheck": "vegacheck",
  "vns-analyse": "vns-analyse",
  "tcm-traditionelle-chinesische-medizin": "tcm-traditionelle-chinesische-medizin",
  "traditionelle-chinesische-medizin": "tcm-traditionelle-chinesische-medizin",
  "akupunktur": "akupunktur",
  "schroepfen": "schropfen",
  "schropfen": "schropfen",
  "cmd-kieferbehandlung": "cmd-kieferbehandlung",
  "cmd-kieferbehandlung-bei-dysfunktion": "cmd-kieferbehandlung",
  "chiropraxis": "chiropraxis",
  "funktionelle-osteopathie-und-integration-foi":
    "funktionelle-osteopathie-und-integration-foi",
  "foi": "funktionelle-osteopathie-und-integration-foi",
};

export function slugifyTreatment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getRecommendationLearnMoreHref(recommendation: string) {
  const slug = slugifyTreatment(recommendation);
  const sectionId = treatmentSectionMap[slug];
  const itemId = treatmentItemMap[slug];

  if (sectionId && itemId) {
    return `/behandlungen#${itemId}`;
  }

  return sectionId ? `/behandlungen#${sectionId}` : null;
}

export function getTreatmentCardHref(treatment: string) {
  return getRecommendationLearnMoreHref(treatment);
}
