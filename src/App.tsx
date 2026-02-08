import { AnimatePresence } from "motion/react";
import { useCountries } from "@/hooks/use-countries";
import { useQuizStore } from "@/store/quiz-store";
import { LevelSelectCard } from "@/components/level-select-card";
import { QuestionCard } from "@/components/question-card";
import { ResultsCard } from "@/components/results-card";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { isLoading } = useCountries();
  const difficulty = useQuizStore((state) => state.difficulty);
  const isGameOver = useQuizStore((state) => state.isGameOver);

  if (isLoading) {
    return (
      <div className="flex w-full flex-1 flex-col sm:w-card sm:flex-initial">
        <Skeleton className="mb-3 h-10 w-64" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!difficulty ? (
        <LevelSelectCard key="level-select" />
      ) : isGameOver ? (
        <ResultsCard key="results" />
      ) : (
        <QuestionCard key="question" />
      )}
    </AnimatePresence>
  );
}

export default App;
