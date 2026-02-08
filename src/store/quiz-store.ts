import { create } from "zustand";
import type { Country } from "@/types/country";
import type { Question } from "@/types/quiz";
import { generateQuestion } from "@/lib/quiz";

interface QuizState {
  question: Question | null;
  score: number;
  isGameOver: boolean;
}

interface QuizActions {
  startQuiz: (countries: Country[]) => void;
  answerQuestion: (letter: string) => void;
  nextQuestion: (countries: Country[]) => void;
  resetQuiz: (countries: Country[]) => void;
}

export const useQuizStore = create<QuizState & QuizActions>((set) => ({
  question: null,
  score: 0,
  isGameOver: false,

  startQuiz: (countries) => {
    set({ question: generateQuestion(countries), score: 0, isGameOver: false });
  },

  answerQuestion: (letter) => {
    set((state) => {
      if (!state.question || state.question.isAnswered) return state;

      const isCorrect = state.question.correctAnswer.letter === letter;

      const options = state.question.options.map((option) => {
        if (option.isCorrect) return { ...option, status: "correct" as const };
        if (option.letter === letter && !isCorrect)
          return { ...option, status: "incorrect" as const };
        return option;
      });

      return {
        question: {
          ...state.question,
          options,
          isAnswered: true,
          isCorrectlyAnswered: isCorrect,
        },
        score: isCorrect ? state.score + 1 : state.score,
      };
    });
  },

  nextQuestion: (countries) => {
    set((state) => {
      if (state.question && !state.question.isCorrectlyAnswered) {
        return { isGameOver: true };
      }
      return { question: generateQuestion(countries) };
    });
  },

  resetQuiz: (countries) => {
    set({
      question: generateQuestion(countries),
      score: 0,
      isGameOver: false,
    });
  },
}));
