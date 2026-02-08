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
      <div className="w-full sm:w-card">
        <Skeleton className="mb-3 h-10 w-64" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!question && !isGameOver) {
    startQuiz();
    return null;
  }

  if (isGameOver) {
    return <ResultsCard />;
  }

  return <QuestionCard />;
}

export default App;
