import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { QuestionOption as QuestionOptionType } from "@/types/quiz";

interface QuestionOptionProps {
  option: QuestionOptionType;
  index: number;
  isAnswered: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function QuestionOption({
  option,
  index,
  isAnswered,
  isCorrect,
  isSelected,
  onClick,
}: QuestionOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isAnswered}
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isAnswered && isCorrect ? [1, 1.03, 1] : 1,
        x:
          isAnswered && isSelected && !isCorrect
            ? [0, -8, 8, -4, 4, 0]
            : 0,
      }}
      transition={{
        opacity: { duration: 0.3, delay: index * 0.08 },
        y: { duration: 0.3, delay: index * 0.08 },
        scale: { duration: 0.4, ease: "easeInOut" },
        x: { duration: 0.4, ease: "easeInOut" },
      }}
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
    </motion.button>
  );
}
