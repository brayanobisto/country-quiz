import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionOption } from "@/components/question-option";
import QuizIllustration from "@/components/quiz-illustration";
import { useQuizStore } from "@/store/quiz-store";
import type { Country } from "@/types/country";

interface QuestionCardProps {
  countries: Country[];
}

export function QuestionCard({ countries }: QuestionCardProps) {
  const { question, answerQuestion, nextQuestion } = useQuizStore();

  if (!question) return null;

  const handleAnswer = (letter: string) => {
    if (question.isAnswered) return;
    answerQuestion(letter);
  };

  const handleNext = () => {
    nextQuestion(countries);
  };

  return (
    <div className="w-full sm:w-card">
      <h1 className="text-quiz-gray mb-3 text-center text-4xl font-bold uppercase sm:text-left">
        Country Quiz
      </h1>

      <Card className="relative border-none shadow-none">
        <QuizIllustration className="absolute right-0 -top-[4.5rem] hidden sm:block" />

        <CardContent
          className={`px-8 ${question.isAnswered ? "pt-16 pb-8" : "py-16"}`}
        >
          {question.type === "capital" ? (
            <p
              className={`mb-8 text-center text-2xl font-bold sm:text-left ${
                question.isAnswered ? "text-quiz-blue-100" : "text-quiz-blue-200"
              }`}
            >
              {question.text}
            </p>
          ) : (
            <>
              <img
                src={question.correctAnswer.flag}
                alt={question.correctAnswer.name}
                className="mx-auto mb-7 block h-auto w-20 shadow sm:mx-0"
              />
              <p
                className={`mb-8 text-center text-2xl font-bold sm:text-left ${
                  question.isAnswered ? "text-quiz-blue-100" : "text-quiz-blue-200"
                }`}
              >
                Which country does this flag belong to?
              </p>
            </>
          )}

          <div className="flex flex-col gap-y-7">
            {question.options.map((option) => (
              <QuestionOption
                key={option.letter}
                option={option}
                isAnswered={question.isAnswered}
                onClick={() => handleAnswer(option.letter)}
              />
            ))}

            {question.isAnswered && (
              <Button
                onClick={handleNext}
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
