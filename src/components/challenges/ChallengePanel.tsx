import type { LeaderboardEntry } from '../../types';
import { Leaderboard } from './Leaderboard';

interface ChallengePanelProps {
  challengeName: string;
  leaderboard: LeaderboardEntry[];
  userEntry: LeaderboardEntry | undefined;
  streak: number;
  pointsPerTask: number;
  completedToday: number;
  onReset: () => void;
}

/** Gamification sidebar: user stats plus the group leaderboard. */
export function ChallengePanel({
  challengeName,
  leaderboard,
  userEntry,
  streak,
  pointsPerTask,
  completedToday,
  onReset,
}: ChallengePanelProps): JSX.Element {
  const stats: ReadonlyArray<{ label: string; value: string }> = [
    { label: 'Your place', value: userEntry ? `#${userEntry.rank}` : '—' },
    { label: 'Helped today', value: `${completedToday}` },
    { label: 'Month points', value: `${userEntry?.monthlyScore ?? 0}` },
    { label: 'Day streak', value: `${streak} 🔥` },
  ];

  return (
    <section className="challenge" aria-labelledby="challenge-heading">
      <div className="challenge__header">
        <h2 id="challenge-heading" className="challenge__title">
          Family board
        </h2>
        <button type="button" className="challenge__reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <p className="challenge__name">{challengeName}</p>

      <div className="challenge__stats">
        {stats.map((stat) => (
          <div key={stat.label} className="challenge__stat">
            <span className="challenge__stat-value">{stat.value}</span>
            <span className="challenge__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <p className="challenge__hint">
        Every job someone finishes is worth <strong>{pointsPerTask} points</strong>.
        The board is saved on this device.
      </p>

      <Leaderboard entries={leaderboard} />
    </section>
  );
}
