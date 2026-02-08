import type { Country } from "./country";

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_QUESTIONS: Record<Difficulty, number> = {
  easy: 5,
  medium: 10,
  hard: 20,
};

export type QuestionType = "capital" | "flag";

export interface QuestionOption extends Country {
  letter: string;
}

export interface Question {
  type: QuestionType;
  text: string;
  options: QuestionOption[];
  correctIndex: number;
}
