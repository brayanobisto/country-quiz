import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResultsIllustration from "@/components/results-illustration";
import { useQuizStore } from "@/store/quiz-store";

export function ResultsCard() {
  const score = useQuizStore((state) => state.score);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

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

      <Card className="flex-1 rounded-none border-none py-0 shadow-none sm:flex-initial sm:rounded-xl sm:py-6">
        <CardContent className="flex flex-1 flex-col justify-center py-12 pb-8 sm:flex-initial">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-20"
            >
              <ResultsIllustration />
            </motion.div>

            <motion.h2
              className="text-quiz-blue-200 mb-4 text-center text-5xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Results
            </motion.h2>

            <motion.p
              className="text-quiz-blue-200 mb-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              You got{" "}
              <span className="text-quiz-green-100 text-4xl font-bold">
                {score}
              </span>{" "}
              correct answers
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button
                variant="outline"
                onClick={resetQuiz}
                className="h-auto text-quiz-blue-200 border-quiz-blue-200 rounded-xl border-2 px-16 py-4 text-lg font-semibold hover:bg-quiz-blue-200/10"
              >
                Try again
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
