import { memo } from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/** A single row: completion toggle, title, status badge, delete. */
function TaskItemComponent({
  task,
  onToggle,
  onDelete,
}: TaskItemProps): JSX.Element {
  const isCompleted = task.status === 'completed';

  return (
    <li className={`task${isCompleted ? ' task--completed' : ''}`}>
      <label className="task__toggle">
        <input
          type="checkbox"
          className="task__checkbox"
          checked={isCompleted}
          onChange={() => onToggle(task.id)}
        />
        <span className="task__title">{task.title}</span>
      </label>

      <span className={`task__badge task__badge--${task.status}`}>
        {isCompleted ? 'Done' : 'To do'}
      </span>

      <button
        type="button"
        className="task__delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Take down the note “${task.title}”`}
      >
        <span aria-hidden="true">✕</span>
      </button>
    </li>
  );
}

export const TaskItem = memo(TaskItemComponent);
