import type { TaskCounts } from '../types';

interface TaskSummaryProps {
  counts: TaskCounts;
}

type SummaryCard = {
  label: string;
  value: number;
  modifier: 'total' | 'completed' | 'remaining';
};

/** Dynamic Total / Completed / Remaining counters. */
export function TaskSummary({ counts }: TaskSummaryProps): JSX.Element {
  const cards: SummaryCard[] = [
    { label: 'Total', value: counts.total, modifier: 'total' },
    { label: 'Completed', value: counts.completed, modifier: 'completed' },
    { label: 'Remaining', value: counts.remaining, modifier: 'remaining' },
  ];

  return (
    <dl className="summary">
      {cards.map((card) => (
        <div
          key={card.modifier}
          className={`summary__card summary__card--${card.modifier}`}
        >
          <dt className="summary__label">{card.label}</dt>
          <dd className="summary__value">{card.value}</dd>
        </div>
      ))}
    </dl>
  );
}
