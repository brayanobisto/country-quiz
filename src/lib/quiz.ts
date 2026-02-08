import type { Country } from "@/types/country";
import type { Question, QuestionOption, QuestionType } from "@/types/quiz";

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQuestionType(): QuestionType {
  return Math.random() < 0.5 ? "capital" : "flag";
}

function getQuestionOptions(countries: Country[]): [QuestionOption[], QuestionOption] {
  const indices = new Set<number>();

  while (indices.size < 4) {
    indices.add(getRandomInt(0, countries.length - 1));
  }

  const correctIndex = getRandomInt(0, 3);
  const selectedIndices = [...indices];

  const options: QuestionOption[] = selectedIndices.map((countryIndex, i) => ({
    ...countries[countryIndex],
    letter: OPTION_LETTERS[i],
    isCorrect: i === correctIndex,
    status: "default",
  }));

  return [options, options[correctIndex]];
}

export function generateQuestion(countries: Country[]): Question {
  const type = getQuestionType();
  const [options, correctAnswer] = getQuestionOptions(countries);

  const text =
    type === "capital"
      ? `${correctAnswer.capital} is the capital of`
      : "Which country does this flag belong to?";

  return {
    type,
    text,
    options,
    correctAnswer,
    isAnswered: false,
    isCorrectlyAnswered: true,
  };
}
