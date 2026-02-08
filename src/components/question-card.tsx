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
    <div className="w-full sm:w-card">
      <h1 className="text-quiz-gray mb-3 text-center text-4xl font-bold uppercase sm:text-left">
        Country Quiz
      </h1>

      <Card className="relative border-none shadow-none">
        <QuizIllustration className="absolute right-0 -top-[4.5rem] hidden sm:block" />

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
                isAnswered={isAnswered}
                isCorrect={index === question.correctIndex}
                isSelected={option.letter === selectedAnswer}
                onClick={() => answerQuestion(option.letter)}
              />
            ))}

            {isAnswered && (
              <Button
                onClick={continueQuiz}
                className="bg-quiz-yellow shadow-quiz-yellow self-end rounded-xl px-8 py-3 font-bold text-white shadow-sm hover:bg-quiz-yellow/90"
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
