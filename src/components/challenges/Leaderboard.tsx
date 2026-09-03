import type { LeaderboardEntry } from '../../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const rankLabel = (rank: number): string => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

/** Ranked list of the family, the user's row highlighted. */
export function Leaderboard({ entries }: LeaderboardProps): JSX.Element {
  return (
    <ol className="leaderboard" aria-label="Family leaderboard">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className={`leaderboard__row${
            entry.isUser ? ' leaderboard__row--user' : ''
          }`}
        >
          <span className="leaderboard__rank">{rankLabel(entry.rank)}</span>
          <span className="leaderboard__avatar" aria-hidden="true">
            {entry.avatar}
          </span>
          <span className="leaderboard__name">{entry.name}</span>
          <span className="leaderboard__daily">
            {entry.dailyCompleted}
            <span className="leaderboard__unit"> today</span>
          </span>
          <span className="leaderboard__score">
            {entry.monthlyScore}
            <span className="leaderboard__unit"> pts</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
