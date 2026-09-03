# TaskFlow

A responsive **React + TypeScript** task manager with a simulated
**Group Challenge & Leaderboard** gamification layer.

> Organize your tasks. Stay productive.

## Features

**Core**

- Fetches seed tasks from `https://dummyjson.com/todos` on mount (`useEffect`)
- Loading and error states — the UI never crashes on a failed request, and offers a retry
- Add tasks with non-empty validation; immutable state updates
- Toggle complete / uncomplete, delete
- Live Total / Completed / Remaining counters (derived state)
- Filter by All / Pending / Completed (derived state)
- Contextual empty states per filter

**Bonus — Group Challenge**

- Compete against mock friends on daily completions and monthly score
- Ranked leaderboard, personal rank / streak / score stats
- Progress persisted and cross-tab synced via `localStorage`
- Simulation rolls forward automatically when the calendar day (or month) changes

## Architecture

Business logic lives entirely in custom hooks; components are presentational.
Strict TypeScript is enabled and there is no `any` in the codebase.

```
React_Task_Manager/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx                     # React entry point
    ├── App.tsx                      # Composition root
    ├── vite-env.d.ts
    ├── types/
    │   └── index.ts                 # All shared interfaces / unions
    ├── api/
    │   └── tasks.ts                 # dummyjson fetch + mapping
    ├── hooks/
    │   ├── useLocalStorage.ts       # Generic persisted state
    │   ├── useTasks.ts              # Task CRUD, fetch, filter, counts
    │   └── useChallenges.ts         # Challenge state + leaderboard
    ├── utils/
    │   ├── date.ts                  # Date-key / same-day helpers
    │   └── id.ts                    # Unique id generation
    ├── components/
    │   ├── Header.tsx
    │   ├── TaskSummary.tsx
    │   ├── AddTaskForm.tsx
    │   ├── TaskFilters.tsx
    │   ├── TaskList.tsx
    │   ├── TaskItem.tsx
    │   └── challenges/
    │       ├── ChallengePanel.tsx
    │       └── Leaderboard.tsx
    └── styles/
        └── global.css               # CSS variables, Flex/Grid, media queries
```

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server           |
| `npm run build`   | Type-check (`tsc -b`) + prod build  |
| `npm run preview` | Preview the production build        |
