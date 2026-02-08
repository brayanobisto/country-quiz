import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuizIllustration from "@/components/quiz-illustration";
import { useQuizStore } from "@/store/quiz-store";
import type { Difficulty } from "@/types/quiz";
import { DIFFICULTY_QUESTIONS } from "@/types/quiz";

const DIFFICULTY_OPTIONS: { difficulty: Difficulty; label: string }[] = [
  { difficulty: "easy", label: "Easy" },
  { difficulty: "medium", label: "Medium" },
  { difficulty: "hard", label: "Hard" },
];

export function LevelSelectCard() {
  const startQuiz = useQuizStore((state) => state.startQuiz);

  return (
    <motion.div
      className="flex w-full flex-1 flex-col sm:w-card sm:flex-initial"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-quiz-gray mb-3 hidden text-4xl font-bold uppercase sm:block sm:text-left">
        Country Quiz
      </h1>

      <Card className="relative flex-1 rounded-none border-none py-0 shadow-none sm:flex-initial sm:rounded-xl sm:py-6">
        <QuizIllustration className="absolute right-0 -top-[4.5rem] hidden sm:block" />

        <CardContent className="flex flex-1 flex-col items-center px-8 py-16 sm:flex-initial">
          <h2 className="text-quiz-blue-200 mb-2 text-center text-2xl font-bold">
            Select Difficulty
          </h2>
          <p className="text-quiz-blue-100/70 mb-10 text-center text-sm">
            Choose the number of questions
          </p>

          <div className="flex w-full flex-col gap-y-4">
            {DIFFICULTY_OPTIONS.map(({ difficulty, label }, index) => (
              <motion.div
                key={difficulty}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.1 * index }}
              >
                <Button
                  onClick={() => startQuiz(difficulty)}
                  className="bg-quiz-violet hover:bg-quiz-violet/90 h-auto w-full rounded-xl px-6 py-4 text-base font-bold text-white shadow-sm"
                >
                  {label}
                  <span className="ml-2 font-normal opacity-80">
                    ({DIFFICULTY_QUESTIONS[difficulty]} questions)
                  </span>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
