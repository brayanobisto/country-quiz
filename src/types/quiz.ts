import type { Country } from "./country";

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
