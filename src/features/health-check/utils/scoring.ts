import { questions } from "../data/questions";
import type {
  AnswersMap,
  CategoryScores,
  HealthCheckLevel,
  HealthCheckResult,
} from "../types";

function createEmptyCategoryScores(): CategoryScores {
  return {
    stress: 0,
    sleep: 0,
    digestion: 0,
    pain: 0,
    energy: 0,
    immune: 0,
  };
}

function getLevel(totalScore: number): HealthCheckLevel {
  if (totalScore <= 6) return "low";
  if (totalScore <= 14) return "medium";
  return "high";
}

export function calculateHealthCheckResult(answers: AnswersMap): Omit<HealthCheckResult, "summary" | "recommendations"> {
  const categoryScores = createEmptyCategoryScores();

  let totalScore = 0;

  for (const question of questions) {
    const answerValue = answers[question.id] ?? 0;

    totalScore += answerValue;
    categoryScores[question.category] += answerValue;
  }

  const level = getLevel(totalScore);

  return {
    totalScore,
    level,
    categoryScores,
  };
}