import OptionCard from "./OptionCard";
import type { HealthQuestion } from "@/features/health-check/types";

type QuestionStepProps = {
  question: HealthQuestion;
  selectedValue?: number;
  onSelect: (value: number) => void;
};

export default function QuestionStep({
  question,
  selectedValue,
  onSelect,
}: QuestionStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <OptionCard
            key={option.label}
            label={option.label}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}