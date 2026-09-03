import type { TaskCounts, TaskFilter } from '../types';

interface TaskFiltersProps {
  active: TaskFilter;
  counts: TaskCounts;
  onChange: (filter: TaskFilter) => void;
}

const OPTIONS: ReadonlyArray<{ value: TaskFilter; label: string }> = [
  { value: 'all', label: 'Everything' },
  { value: 'pending', label: 'To do' },
  { value: 'completed', label: 'Done' },
];

/** Segmented control for the derived task filter. */
export function TaskFilters({
  active,
  counts,
  onChange,
}: TaskFiltersProps): JSX.Element {
  const countFor = (filter: TaskFilter): number => {
    if (filter === 'completed') return counts.completed;
    if (filter === 'pending') return counts.remaining;
    return counts.total;
  };

  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {OPTIONS.map((option) => {
        const isActive = option.value === active;
        return (
          <button
            key={option.value}
            type="button"
            className={`filters__button${isActive ? ' filters__button--active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.label}
            <span className="filters__count">{countFor(option.value)}</span>
          </button>
        );
      })}
    </div>
  );
}
