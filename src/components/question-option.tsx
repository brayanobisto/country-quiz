import { cn } from "@/lib/utils";
import type { QuestionOption as QuestionOptionType } from "@/types/quiz";

interface QuestionOptionProps {
  option: QuestionOptionType;
  isAnswered: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function QuestionOption({
  option,
  isAnswered,
  isCorrect,
  isSelected,
  onClick,
}: QuestionOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isAnswered}
      className={cn(
        "flex w-full items-center gap-x-11 rounded-xl border px-5 py-3 text-left font-medium transition-colors duration-200 ease-in-out",
        {
          "border-quiz-violet text-quiz-violet hover:border-transparent hover:bg-quiz-yellow hover:text-white":
            !isAnswered,
          "justify-between border-transparent bg-quiz-green-200 text-white":
            isAnswered && isCorrect,
          "justify-between border-transparent bg-quiz-red text-white":
            isAnswered && isSelected && !isCorrect,
          "border-quiz-violet text-quiz-violet opacity-60":
            isAnswered && !isCorrect && !isSelected,
        },
      )}
    >
      <div className="flex gap-x-11">
        <span className="text-2xl font-medium">{option.letter}</span>
        {option.name}
      </div>

      {isAnswered && isCorrect && (
        <span className="material-symbols-outlined text-white">check_circle</span>
      )}
      {isAnswered && isSelected && !isCorrect && (
        <span className="material-symbols-outlined text-white">cancel</span>
      )}
    </button>
  );
}
