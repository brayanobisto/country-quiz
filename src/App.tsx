import { AnimatePresence } from "motion/react";
import { useCountries } from "@/hooks/use-countries";
import { useQuizStore } from "@/store/quiz-store";
import { QuestionCard } from "@/components/question-card";
import { ResultsCard } from "@/components/results-card";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { data: countries, isLoading } = useCountries();
  const isGameOver = useQuizStore((state) => state.isGameOver);
  const question = useQuizStore((state) => state.question);
  const startQuiz = useQuizStore((state) => state.startQuiz);

  if (isLoading || !countries) {
    return (
      <div className="flex w-full flex-1 flex-col sm:w-card sm:flex-initial">
        <Skeleton className="mb-3 h-10 w-64" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!question && !isGameOver) {
    startQuiz();
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isGameOver ? (
        <ResultsCard key="results" />
      ) : (
        <QuestionCard key="question" />
      )}
    </AnimatePresence>
  );
}

export default App;
