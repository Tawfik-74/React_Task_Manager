# React Task Manager 🎯

A responsive React + TypeScript task manager featuring a simulated Group Challenge & Leaderboard gamification layer. Built with strict TypeScript and a clean, scalable architecture.

🚀 **Live Demo:** [Insert Vercel/Netlify Link Here]

## ✨ Features

**Core Functionality:**
* **Robust Data Fetching:** Fetches seed tasks on mount with proper loading and error states—ensuring the UI never crashes and offers retry mechanisms.
* **State Management:** Immutable state updates for adding tasks (with non-empty validation), toggling completion, and deletion.
* **Dynamic Filtering:** Live Total / Completed / Remaining counters and views filtered by All / Pending / Completed with contextual empty states.

**Gamification & Group Challenge (Bonus):**
* **Competitive Edge:** Compete against mock friends based on daily completions and monthly scores.
* **Leaderboard & Stats:** Ranked leaderboard displaying personal rank, current streak, and score stats.
* **State Persistence:** Progress is persisted and cross-tab synced via `localStorage`, automatically rolling forward when the calendar day/month changes.

## 🛠 Architecture & Tech Stack

The architecture enforces a strict separation of concerns. Business logic is entirely encapsulated within custom hooks, leaving components strictly presentational. The codebase enforces strict TypeScript with zero `any` types.

* **Frontend:** React, TypeScript, Vite
* **Styling:** Vanilla CSS (Flexbox/Grid, CSS Variables, Media Queries)
* **API Integration:** Fetch API mapping data from DummyJSON

## 🤖 AI Integration

Generative AI (ChatGPT/Claude) was utilized during development to rapidly bootstrap standard TypeScript interfaces and optimize the initial logic for the simulated leaderboard scoring algorithm. All generated code was thoroughly reviewed, refactored for the custom hook architecture, and type-checked to ensure robust application state.

## 🚀 Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
