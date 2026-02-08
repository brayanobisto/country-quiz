import type { Country } from "@/types/country";
import type { Question, QuestionOption, QuestionType } from "@/types/quiz";

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;
const OPTIONS_COUNT = 4;

function getQuestionType(): QuestionType {
  return Math.random() < 0.5 ? "capital" : "flag";
}

// Partial Fisher-Yates shuffle: swaps `count` elements to the front to pick unique random items in O(count)
function pickRandom<T>(array: T[], count: number): T[] {
  const copy = [...array];

  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, count);
}

export function generateQuestion(
  countries: Country[],
  usedCountryNames: Set<string>,
): Question | null {
  const available = countries.filter((c) => !usedCountryNames.has(c.name));

  if (available.length < OPTIONS_COUNT) return null;

  const selected = pickRandom(available, OPTIONS_COUNT);
  const correctIndex = Math.floor(Math.random() * OPTIONS_COUNT);
  const correctCountry = selected[correctIndex];

  const options: QuestionOption[] = selected.map((country, i) => ({
    ...country,
    letter: OPTION_LETTERS[i],
  }));

  const type = getQuestionType();
  const text =
    type === "capital"
      ? `${correctCountry.capital} is the capital of`
      : "Which country does this flag belong to?";

  return { type, text, options, correctIndex };
}
