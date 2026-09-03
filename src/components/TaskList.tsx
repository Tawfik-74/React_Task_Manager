import type { RequestStatus, Task, TaskFilter } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  status: RequestStatus;
  error: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRetry: () => void;
}

const EMPTY_MESSAGE: Record<TaskFilter, string> = {
  all: 'The fridge is clear. Stick a note up above to get started.',
  pending: 'Nothing left to do — the whole family is caught up! 🎉',
  completed: 'Nothing done yet. Check a note off and it lands here.',
};

/** Renders loading, error, empty and populated states for the task list. */
export function TaskList({
  tasks,
  filter,
  status,
  error,
  onToggle,
  onDelete,
  onRetry,
}: TaskListProps): JSX.Element {
  if (status === 'loading' || status === 'idle') {
    return (
      <p className="tasklist__notice" role="status">
        Getting the family's notes…
      </p>
    );
  }

  if (status === 'error') {
    return (
      <div className="tasklist__notice tasklist__notice--error" role="alert">
        <p>{error ?? 'Unable to load tasks.'}</p>
        <button type="button" className="tasklist__retry" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <p className="tasklist__notice">{EMPTY_MESSAGE[filter]}</p>;
  }

  return (
    <ul className="tasklist">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
