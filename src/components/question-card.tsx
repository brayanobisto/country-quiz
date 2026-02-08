import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionOption } from "@/components/question-option";
import QuizIllustration from "@/components/quiz-illustration";
import { useQuizStore } from "@/store/quiz-store";

export function QuestionCard() {
  const question = useQuizStore((state) => state.question);
  const selectedAnswer = useQuizStore((state) => state.selectedAnswer);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);
  const continueQuiz = useQuizStore((state) => state.continueQuiz);

  if (!question) return null;

  const isAnswered = selectedAnswer !== null;
  const correctOption = question.options[question.correctIndex];

  return (
    <motion.div
      className="w-full sm:w-card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-quiz-gray mb-3 text-center text-4xl font-bold uppercase sm:text-left">
        Country Quiz
      </h1>

      <Card className="relative border-none shadow-none">
        <QuizIllustration className="absolute right-0 -top-[4.5rem] hidden sm:block" />

        <AnimatePresence mode="wait">
          <motion.div
            key={correctOption.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <CardContent
              className={cn("px-8", {
                "pt-16 pb-8": isAnswered,
                "py-16": !isAnswered,
              })}
            >
              {question.type === "capital" ? (
                <p
                  className={cn(
                    "mb-8 text-center text-2xl font-bold sm:text-left",
                    {
                      "text-quiz-blue-100": isAnswered,
                      "text-quiz-blue-200": !isAnswered,
                    },
                  )}
                >
                  {question.text}
                </p>
              ) : (
                <>
                  <img
                    src={correctOption.flag}
                    alt="Flag of a country"
                    className="mx-auto mb-7 block h-auto w-20 shadow sm:mx-0"
                  />
                  <p
                    className={cn(
                      "mb-8 text-center text-2xl font-bold sm:text-left",
                      {
                        "text-quiz-blue-100": isAnswered,
                        "text-quiz-blue-200": !isAnswered,
                      },
                    )}
                  >
                    Which country does this flag belong to?
                  </p>
                </>
              )}

              <div className="flex flex-col gap-y-7">
                {question.options.map((option, index) => (
                  <QuestionOption
                    key={option.letter}
                    option={option}
                    index={index}
                    isAnswered={isAnswered}
                    isCorrect={index === question.correctIndex}
                    isSelected={option.letter === selectedAnswer}
                    onClick={() => {
                      answerQuestion(option.letter);
                      if (question.options[question.correctIndex].letter === option.letter) {
                        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
                      }
                    }}
                  />
                ))}

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      className="self-end"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, delay: 0.15 }}
                    >
                      <Button
                        onClick={continueQuiz}
                        className="h-auto bg-quiz-yellow shadow-quiz-yellow rounded-xl px-8 py-3 text-base font-bold text-white shadow-sm hover:bg-quiz-yellow/90"
                      >
                        Next
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
