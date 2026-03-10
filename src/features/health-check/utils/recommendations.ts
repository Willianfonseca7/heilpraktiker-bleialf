import type {
  CategoryScores,
  HealthCheckLevel,
  HealthCheckResult,
} from "../types";

function getTopCategories(categoryScores: CategoryScores) {
  return Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([category]) => category);
}

function buildSummary(level: HealthCheckLevel, topCategories: string[]): string {
  if (level === "low") {
    return "Ihr Gesundheits-Check zeigt aktuell nur geringe Belastungszeichen. Eine präventive Begleitung kann dennoch sinnvoll sein, um Ihr Wohlbefinden langfristig zu stabilisieren.";
  }

  if (level === "medium") {
    return `Ihr Gesundheits-Check zeigt erste Hinweise auf Belastungen, insbesondere im Bereich ${topCategories.join(" und ")}. Eine frühzeitige ganzheitliche Einschätzung kann hilfreich sein.`;
  }

  return `Ihr Gesundheits-Check zeigt deutliche Hinweise auf eine erhöhte Belastung, insbesondere im Bereich ${topCategories.join(" und ")}. Eine individuelle therapeutische Einschätzung wird empfohlen.`;
}

function buildRecommendations(categoryScores: CategoryScores): string[] {
  const recommendations = new Set<string>();

  if (categoryScores.stress >= 3 || categoryScores.sleep >= 3 || categoryScores.energy >= 3) {
    recommendations.add("VNS-Analyse");
  }

  if (categoryScores.stress >= 3 || categoryScores.sleep >= 3) {
    recommendations.add("Akupunktur");
  }

  if (categoryScores.digestion >= 3 || categoryScores.immune >= 3) {
    recommendations.add("Homöopathie");
    recommendations.add("Vegacheck");
  }

  if (categoryScores.pain >= 3) {
    recommendations.add("Chiropraxis");
    recommendations.add("FOI");
  }

  if (recommendations.size === 0) {
    recommendations.add("Iridologie");
    recommendations.add("VNS-Analyse");
  }

  return Array.from(recommendations);
}

export function enrichHealthCheckResult(
  baseResult: Omit<HealthCheckResult, "summary" | "recommendations">
): HealthCheckResult {
  const topCategories = getTopCategories(baseResult.categoryScores);
  const summary = buildSummary(baseResult.level, topCategories);
  const recommendations = buildRecommendations(baseResult.categoryScores);

  return {
    ...baseResult,
    summary,
    recommendations,
  };
}