import { useState, type FormEvent } from 'react';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

/** Controlled input with non-empty validation. */
export function AddTaskForm({ onAdd }: AddTaskFormProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (title.trim().length === 0) {
      setError('Write something on the note first.');
      return;
    }
    onAdd(title);
    setTitle('');
    setError(null);
  };

  return (
    <form className="add-task" onSubmit={handleSubmit} noValidate>
      <label className="add-task__label" htmlFor="new-task-input">
        Stick a new note up
      </label>
      <div className="add-task__row">
        <input
          id="new-task-input"
          className="add-task__input"
          type="text"
          autoComplete="off"
          placeholder="e.g. Water the tomato plants"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error !== null}
          aria-describedby={error !== null ? 'new-task-error' : undefined}
        />
        <button className="add-task__submit" type="submit">
          Add
        </button>
      </div>
      {error !== null && (
        <p id="new-task-error" className="add-task__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
