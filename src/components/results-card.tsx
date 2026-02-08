import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResultsIllustration from "@/components/results-illustration";
import { useQuizStore } from "@/store/quiz-store";

export function ResultsCard() {
  const score = useQuizStore((state) => state.score);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  return (
    <div className="w-full sm:w-card">
      <h1 className="text-quiz-gray mb-3 text-center text-4xl font-bold uppercase sm:text-left">
        Country Quiz
      </h1>

      <Card className="border-none shadow-none">
        <CardContent className="py-12 pb-8">
          <div className="flex flex-col items-center">
            <ResultsIllustration className="mb-20" />

            <h2 className="text-quiz-blue-200 mb-4 text-center text-5xl font-bold">
              Results
            </h2>

            <p className="text-quiz-blue-200 mb-20">
              You got{" "}
              <span className="text-quiz-green-100 text-4xl font-bold">
                {score}
              </span>{" "}
              correct answers
            </p>

            <Button
              variant="outline"
              onClick={resetQuiz}
              className="h-auto text-quiz-blue-200 border-quiz-blue-200 rounded-xl border-2 px-16 py-4 text-lg font-semibold hover:bg-quiz-blue-200/10"
            >
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
