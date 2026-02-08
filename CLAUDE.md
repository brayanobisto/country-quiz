# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (Vite)
pnpm build      # TypeScript check + production build
pnpm lint       # ESLint (flat config, TS only)
pnpm preview    # Preview production build
```

## Architecture

Country Quiz is a single-page React 19 quiz app built with Vite 7, TypeScript 5.9, and Tailwind v4. Users answer multiple-choice questions about country capitals and flags. An incorrect answer ends the game and shows the results screen.

### Data Flow

1. `useCountries()` hook (TanStack Query) fetches countries from `restcountries.com/v3.1/all`. If the API fails, it falls back to `src/data/countries.json` (246 countries baked in)
2. On data load, `App.tsx` calls `startQuiz()` which generates the first question
3. `generateQuestion()` in `src/lib/quiz.ts` picks a random type ("capital" or "flag") and 4 unique random country options
4. Correct answer → score increments, next question. Wrong answer → game over → results screen

### State Management

**Zustand** store at `src/store/quiz-store.ts` — single flat store with state + actions:
- State: `question` (Question | null), `score`, `isGameOver`
- Actions: `startQuiz`, `answerQuestion`, `nextQuestion`, `resetQuiz` — all take `countries[]` as param except `answerQuestion` (takes `letter`)

**TanStack Query** for server data — `useCountries()` in `src/hooks/use-countries.ts` with `staleTime: Infinity` (country data rarely changes).

### Types

- `Country` (`src/types/country.ts`): `name`, `capital`, `flag`
- `Question`, `QuestionOption`, `QuestionType`, `OptionStatus` (`src/types/quiz.ts`)

### UI Layer

- **Tailwind CSS v4** — config-free, uses `@theme` in `src/index.css`
- **shadcn/ui** (new-york style, non-RSC) — components live in `src/components/ui/`
- Custom quiz colors: `quiz-blue-100`, `quiz-blue-200`, `quiz-violet`, `quiz-yellow`, `quiz-red`, `quiz-green-100`, `quiz-green-200`
- Custom card width: `w-card` (29rem)
- Font: Poppins (loaded via Google Fonts in `index.html`)
- Material Symbols Outlined icons (loaded in `index.html`)
- No routing — conditional rendering in `App.tsx` switches between `QuestionCard` and `ResultsCard`

### Import Aliases

`@/` maps to `./src/` (configured in both `tsconfig.json` and `vite.config.ts`).

### ESLint

Flat config (`eslint.config.js`): `@eslint/js` recommended + `typescript-eslint` recommended + `react-hooks` + `react-refresh`.
