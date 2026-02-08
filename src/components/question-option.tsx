import { cn } from "@/lib/utils";
import type { QuestionOption as QuestionOptionType } from "@/types/quiz";

interface QuestionOptionProps {
  option: QuestionOptionType;
  isAnswered: boolean;
  onClick: () => void;
}

export function QuestionOption({ option, isAnswered, onClick }: QuestionOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-x-11 rounded-xl border px-5 py-3 text-left font-medium transition-colors duration-200 ease-in-out",
        !isAnswered &&
          "border-quiz-violet text-quiz-violet hover:border-transparent hover:bg-quiz-yellow hover:text-white",
        isAnswered && option.status === "correct" &&
          "justify-between border-transparent bg-quiz-green-200 text-white",
        isAnswered && option.status === "incorrect" &&
          "justify-between border-transparent bg-quiz-red text-white",
        isAnswered && option.status === "default" &&
          "border-quiz-violet text-quiz-violet opacity-60",
      )}
    >
      <div className="flex gap-x-11">
        <span className="text-2xl font-medium">{option.letter}</span>
        {option.name}
      </div>

      {isAnswered && option.status === "correct" && (
        <span className="material-symbols-outlined text-white">check_circle</span>
      )}
      {isAnswered && option.status === "incorrect" && (
        <span className="material-symbols-outlined text-white">cancel</span>
      )}
    </button>
  );
}
