const recommendationSectionMap: Record<string, string> = {
  "aengste": "psychologische-beratung",
  "angste": "psychologische-beratung",
  "paarberatung": "psychologische-beratung",
  "stress-und-druck": "psychologische-beratung",
  "stress": "psychologische-beratung",
  "schwierige-lebensereignisse": "psychologische-beratung",
  "selbstwertprobleme": "psychologische-beratung",
  "legasthenie": "lerntherapie",
  "dyskalkulie": "lerntherapie",
  "lerntherapeutisches-training": "lerntherapie",
  "faszientherapie": "koerpertherapie",
  "stress-und-schmerzresilienz": "koerpertherapie",
  "physiotherapie": "koerpertherapie",
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
  "chiropraxis": "spezielle-behandlungen",
  "funktionelle-osteopathie-und-integration-foi": "spezielle-behandlungen",
  "foi": "spezielle-behandlungen",
};

function slugifyRecommendation(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getRecommendationLearnMoreHref(recommendation: string) {
  const sectionId = recommendationSectionMap[slugifyRecommendation(recommendation)];

  return sectionId ? `/behandlungen#${sectionId}` : null;
}
