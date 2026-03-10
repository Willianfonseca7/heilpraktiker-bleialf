export type HealthCategory =
  | "stress"
  | "sleep"
  | "digestion"
  | "pain"
  | "energy"
  | "immune";

export type QuestionOption = {
  label: string;
  value: number;
};

export type HealthQuestion = {
  id: string;
  question: string;
  category: HealthCategory;
  options: QuestionOption[];
};

export type AnswersMap = Record<string, number>;

export type HealthCheckLevel = "low" | "medium" | "high";

export type CategoryScores = Record<HealthCategory, number>;

export type HealthCheckResult = {
  totalScore: number;
  level: HealthCheckLevel;
  categoryScores: CategoryScores;
  summary: string;
  recommendations: string[];
};