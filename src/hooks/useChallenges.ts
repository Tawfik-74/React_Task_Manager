import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { ChallengeState, Friend, LeaderboardEntry } from '../types';
import { toDateKey, toMonthKey } from '../utils/date';

const STORAGE_KEY = 'taskflow:challenge:v2';
const POINTS_PER_TASK = 10;

const USER_ENTRY_ID = 'user';
const USER_AVATAR = '🚀';

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const DEFAULT_FRIENDS: readonly Friend[] = [
  { id: 'family-sam', name: 'Sam', avatar: '🌻', dailyCompleted: 4, monthlyScore: 320 },
  { id: 'family-ava', name: 'Ava', avatar: '🦖', dailyCompleted: 3, monthlyScore: 260 },
  { id: 'family-leo', name: 'Leo', avatar: '⚽', dailyCompleted: 2, monthlyScore: 180 },
  { id: 'family-gran', name: 'Gran', avatar: '🧶', dailyCompleted: 3, monthlyScore: 205 },
];

function createInitialState(): ChallengeState {
  return {
    challengeName: 'This month at home',
    friends: DEFAULT_FRIENDS.map((friend) => ({ ...friend })),
    lastSyncDate: toDateKey(),
    userMonthlyBase: 0,
    userDailyCompleted: 0,
    streak: 0,
  };
}

/** Simulates one more day of activity for a mock friend. */
function advanceFriend(friend: Friend, monthChanged: boolean): Friend {
  const bankedScore = monthChanged
    ? 0
    : friend.monthlyScore + friend.dailyCompleted * POINTS_PER_TASK;
  return {
    ...friend,
    monthlyScore: bankedScore,
    dailyCompleted: randomInt(0, 6),
  };
}

export interface UseChallengesResult {
  challengeName: string;
  leaderboard: LeaderboardEntry[];
  userEntry: LeaderboardEntry | undefined;
  streak: number;
  pointsPerTask: number;
  resetChallenge: () => void;
}

/**
 * Owns the gamification layer: a simulated group challenge with mock
 * friends and a leaderboard, persisted to `localStorage`. Rolls the
 * simulation forward whenever the calendar day changes.
 *
 * @param completedToday number of tasks the user has completed today
 */
export function useChallenges(completedToday: number): UseChallengesResult {
  const [state, setState] = useLocalStorage<ChallengeState>(
    STORAGE_KEY,
    createInitialState(),
  );

  useEffect(() => {
    setState((previous) => {
      const today = toDateKey();

      if (previous.lastSyncDate === today) {
        // Same day — just keep the persisted daily count fresh.
        return previous.userDailyCompleted === completedToday
          ? previous
          : { ...previous, userDailyCompleted: completedToday };
      }

      // A new day (or month) has started — advance the simulation.
      const monthChanged =
        toMonthKey(previous.lastSyncDate) !== toMonthKey(today);

      return {
        ...previous,
        friends: previous.friends.map((friend) =>
          advanceFriend(friend, monthChanged),
        ),
        userMonthlyBase: monthChanged
          ? 0
          : previous.userMonthlyBase +
            previous.userDailyCompleted * POINTS_PER_TASK,
        streak:
          previous.userDailyCompleted > 0 ? previous.streak + 1 : 0,
        userDailyCompleted: completedToday,
        lastSyncDate: today,
      };
    });
  }, [completedToday, setState]);

  const resetChallenge = useCallback((): void => {
    setState(createInitialState());
  }, [setState]);

  const leaderboard = useMemo<LeaderboardEntry[]>(() => {
    const userMonthlyScore =
      state.userMonthlyBase + completedToday * POINTS_PER_TASK;

    const rows: Omit<LeaderboardEntry, 'rank'>[] = [
      ...state.friends.map((friend) => ({
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
        dailyCompleted: friend.dailyCompleted,
        monthlyScore: friend.monthlyScore,
        isUser: false,
      })),
      {
        id: USER_ENTRY_ID,
        name: 'You',
        avatar: USER_AVATAR,
        dailyCompleted: completedToday,
        monthlyScore: userMonthlyScore,
        isUser: true,
      },
    ];

    return rows
      .sort(
        (a, b) =>
          b.monthlyScore - a.monthlyScore ||
          b.dailyCompleted - a.dailyCompleted ||
          a.name.localeCompare(b.name),
      )
      .map((row, index) => ({ ...row, rank: index + 1 }));
  }, [state.friends, state.userMonthlyBase, completedToday]);

  const userEntry = useMemo<LeaderboardEntry | undefined>(
    () => leaderboard.find((entry) => entry.isUser),
    [leaderboard],
  );

  return {
    challengeName: state.challengeName,
    leaderboard,
    userEntry,
    streak: state.streak,
    pointsPerTask: POINTS_PER_TASK,
    resetChallenge,
  };
}
