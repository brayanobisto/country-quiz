import { create } from "zustand";
import type { Country } from "@/types/country";
import type { Question } from "@/types/quiz";
import { generateQuestion } from "@/lib/quiz";
import { queryClient } from "@/lib/query-client";

function getCountries(): Country[] {
  return queryClient.getQueryData<Country[]>(["countries"]) ?? [];
}

interface QuizState {
  question: Question | null;
  selectedAnswer: string | null;
  usedCountryNames: Set<string>;
  score: number;
  isGameOver: boolean;
}

interface QuizActions {
  startQuiz: () => void;
  answerQuestion: (letter: string) => void;
  continueQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState & QuizActions>((set, get) => ({
  question: null,
  selectedAnswer: null,
  usedCountryNames: new Set(),
  score: 0,
  isGameOver: false,

  startQuiz: () => {
    const countries = getCountries();
    const usedCountryNames = new Set<string>();
    const question = generateQuestion(countries, usedCountryNames);

    if (question) {
      const correctCountry = question.options[question.correctIndex];
      usedCountryNames.add(correctCountry.name);
    }

    set({
      question,
      selectedAnswer: null,
      usedCountryNames,
      score: 0,
      isGameOver: false,
    });
  },

  answerQuestion: (letter) => {
    const { question, selectedAnswer, score } = get();
    if (!question || selectedAnswer !== null) return;

    const isCorrect = question.options[question.correctIndex].letter === letter;

    set({
      selectedAnswer: letter,
      score: isCorrect ? score + 1 : score,
    });
  },

  continueQuiz: () => {
    const { question, selectedAnswer, usedCountryNames } = get();
    if (!question || selectedAnswer === null) return;

    const isCorrect =
      question.options[question.correctIndex].letter === selectedAnswer;

    if (!isCorrect) {
      set({ isGameOver: true });
      return;
    }

    const countries = getCountries();
    const nextQuestion = generateQuestion(countries, usedCountryNames);

    if (!nextQuestion) {
      set({ isGameOver: true });
      return;
    }

    const correctCountry = nextQuestion.options[nextQuestion.correctIndex];
    usedCountryNames.add(correctCountry.name);

    set({
      question: nextQuestion,
      selectedAnswer: null,
      usedCountryNames,
    });
  },

  resetQuiz: () => {
    get().startQuiz();
  },
}));
