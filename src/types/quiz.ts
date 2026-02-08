import type { Country } from "./country";

export type QuestionType = "capital" | "flag";

export type OptionStatus = "default" | "correct" | "incorrect";

export interface QuestionOption extends Country {
  letter: string;
  isCorrect: boolean;
  status: OptionStatus;
}

export interface Question {
  type: QuestionType;
  text: string;
  options: QuestionOption[];
  correctAnswer: QuestionOption;
  isAnswered: boolean;
  isCorrectlyAnswered: boolean;
}
