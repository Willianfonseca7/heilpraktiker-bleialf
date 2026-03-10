"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/features/health-check/data/questions";
import type { AnswersMap } from "@/features/health-check/types";
import { calculateHealthCheckResult } from "@/features/health-check/utils/scoring";
import { enrichHealthCheckResult } from "@/features/health-check/utils/recommendations";
import {
  saveHealthCheckAnswers,
  saveHealthCheckResult,
} from "@/features/health-check/utils/storage";
import ProgressBar from "./ProgressBar";
import QuestionStep from "./QuestionStep";

export default function HealthCheckWizard() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>({});

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];

  const selectedValue = answers[currentQuestion.id];
  const isLastStep = currentStep === totalSteps - 1;

  const isCurrentStepAnswered = useMemo(() => {
    return answers[currentQuestion.id] !== undefined;
  }, [answers, currentQuestion.id]);

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!isCurrentStepAnswered) return;

    if (isLastStep) {
      const baseResult = calculateHealthCheckResult(answers);
      const fullResult = enrichHealthCheckResult(baseResult);

      saveHealthCheckAnswers(answers);
      saveHealthCheckResult(fullResult);

      router.push("/gesundheits-check/result");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-8">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <QuestionStep
          question={currentQuestion}
          selectedValue={selectedValue}
          onSelect={handleSelect}
        />

        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Zurück
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isCurrentStepAnswered}
            className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLastStep ? "Abschließen" : "Weiter"}
          </button>
        </div>
      </div>
    </div>
  );
}