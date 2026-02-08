# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (Vite)
pnpm build      # Production build
pnpm preview    # Preview production build
```

Note: The project has a `yarn.lock` but per user preference, use `pnpm` for all operations.

## Architecture

Country Quiz is a single-page React quiz app (React 18, Vite, JSX — no TypeScript). Users answer multiple-choice questions about country capitals and flags. An incorrect answer ends the game and shows the results screen.

### Data Flow

1. On mount, `getCountries()` thunk fetches all countries from `https://restcountries.com/v3.1/all`
2. Country data (name, capital, flag SVG) is stored in Redux
3. `generateQuestion()` (in `src/utils/index.js`) creates questions with 4 random options — type is randomly "capital" or "flag"
4. Correct answer → score increments, next question. Wrong answer → game over → results screen

### State Management

Single Redux Toolkit slice (`src/redux/slices/global/globalSlice.js`) with flat store structure (no combined reducers — the slice reducer IS the root reducer).

Key state shape:
- `countries[]` — fetched country data
- `question` — current question with `type`, `options[]`, `correctAnswer`, `isAnswered`, `isCorrectlyAnswered`
- `score`, `isGameOver`, `isLoading`

Thunks live in `src/redux/slices/global/thunks.js`. Actions are exported from `globalSlice.js`.

### UI Layer

- **Tailwind CSS** with custom color palette and `font-poppins` (see `tailwind.config.js`)
- **Framer Motion** for card transitions and animations
- **canvas-confetti** for correct-answer celebration
- Custom card width tokens: `w-card` / `max-w-card` (29rem)
- No routing — conditional rendering in `App.jsx` switches between `QuestionCard` and `ResultsCard`

### ESLint

Config extends `standard` + `prettier` + `plugin:react/recommended`. Rules `react/react-in-jsx-scope` and `react/prop-types` are off.
