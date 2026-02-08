import { create } from "zustand";
import type { Country } from "@/types/country";
import type { Difficulty, Question } from "@/types/quiz";
import { DIFFICULTY_QUESTIONS } from "@/types/quiz";
import { generateQuestion } from "@/lib/quiz";
import { queryClient } from "@/lib/query-client";

function getCountries(): Country[] {
  return queryClient.getQueryData<Country[]>(["countries"]) ?? [];
}

interface QuizState {
  difficulty: Difficulty | null;
  question: Question | null;
  selectedAnswer: string | null;
  usedCountryNames: Set<string>;
  score: number;
  questionNumber: number;
  isGameOver: boolean;
  isWin: boolean;
}

interface QuizActions {
  startQuiz: (difficulty: Difficulty) => void;
  answerQuestion: (letter: string) => void;
  continueQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState & QuizActions>((set, get) => ({
  difficulty: null,
  question: null,
  selectedAnswer: null,
  usedCountryNames: new Set(),
  score: 0,
  questionNumber: 1,
  isGameOver: false,
  isWin: false,

  startQuiz: (difficulty) => {
    const countries = getCountries();
    const usedCountryNames = new Set<string>();
    const question = generateQuestion(countries, usedCountryNames);

    if (question) {
      const correctCountry = question.options[question.correctIndex];
      usedCountryNames.add(correctCountry.name);
    }

    set({
      difficulty,
      question,
      selectedAnswer: null,
      usedCountryNames,
      score: 0,
      questionNumber: 1,
      isGameOver: false,
      isWin: false,
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
    const { question, selectedAnswer, usedCountryNames, difficulty, questionNumber } = get();
    if (!question || selectedAnswer === null || !difficulty) return;

    const isCorrect =
      question.options[question.correctIndex].letter === selectedAnswer;

    if (!isCorrect) {
      set({ isGameOver: true });
      return;
    }

    const totalQuestions = DIFFICULTY_QUESTIONS[difficulty];

    if (questionNumber >= totalQuestions) {
      set({ isGameOver: true, isWin: true });
      return;
    }

    const countries = getCountries();
    const nextQuestion = generateQuestion(countries, usedCountryNames);

    if (!nextQuestion) {
      set({ isGameOver: true, isWin: true });
      return;
    }

    const correctCountry = nextQuestion.options[nextQuestion.correctIndex];
    usedCountryNames.add(correctCountry.name);

    set({
      question: nextQuestion,
      selectedAnswer: null,
      usedCountryNames,
      questionNumber: questionNumber + 1,
    });
  },

  resetQuiz: () => {
    set({
      difficulty: null,
      question: null,
      selectedAnswer: null,
      usedCountryNames: new Set(),
      score: 0,
      questionNumber: 1,
      isGameOver: false,
      isWin: false,
    });
  },
}));
