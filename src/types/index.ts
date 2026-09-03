/**
 * Shared domain types for TaskFlow.
 * Strict typing only — no `any` anywhere in the codebase.
 */

/* ------------------------------------------------------------------ */
/* Tasks                                                               */
/* ------------------------------------------------------------------ */

export type TaskStatus = 'pending' | 'completed';

export type TaskFilter = 'all' | 'pending' | 'completed';

export interface Task {
  readonly id: string;
  title: string;
  status: TaskStatus;
  /** Epoch milliseconds when the task was created. */
  createdAt: number;
  /** Epoch milliseconds of the most recent completion, or `null` while pending. */
  completedAt: number | null;
}

export interface TaskCounts {
  total: number;
  completed: number;
  remaining: number;
}

/** Async lifecycle for the initial fetch. */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/* ------------------------------------------------------------------ */
/* dummyjson.com/todos response contract                              */
/* ------------------------------------------------------------------ */

export interface DummyTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface DummyTodosResponse {
  todos: DummyTodo[];
  total: number;
  skip: number;
  limit: number;
}

/* ------------------------------------------------------------------ */
/* Group challenge & leaderboard                                       */
/* ------------------------------------------------------------------ */

export interface Friend {
  readonly id: string;
  name: string;
  /** Emoji used as an avatar. */
  avatar: string;
  /** Tasks the friend has completed on the current challenge day. */
  dailyCompleted: number;
  /** Cumulative points earned this calendar month. */
  monthlyScore: number;
}

export interface ChallengeState {
  challengeName: string;
  friends: Friend[];
  /** ISO date (YYYY-MM-DD) of the last simulated sync. */
  lastSyncDate: string;
  /** Points the user banked on previous days of the current month. */
  userMonthlyBase: number;
  /** Persisted snapshot of the user's completions for the current day. */
  userDailyCompleted: number;
  /** Consecutive days with at least one completed task. */
  streak: number;
}

export interface LeaderboardEntry {
  readonly id: string;
  name: string;
  avatar: string;
  dailyCompleted: number;
  monthlyScore: number;
  isUser: boolean;
  rank: number;
}
