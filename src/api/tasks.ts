import type { DummyTodosResponse, Task } from '../types';
import { createId } from '../utils/id';

const TODOS_ENDPOINT = 'https://dummyjson.com/todos?limit=10';

/** Narrows an unknown JSON payload to the dummyjson todos contract. */
function isTodosResponse(value: unknown): value is DummyTodosResponse {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as { todos?: unknown };
  return Array.isArray(candidate.todos);
}

/**
 * Fetches the seed task list from dummyjson.com and maps it onto the
 * internal `Task` shape. Throws on network or contract failures so the
 * caller can surface an error state.
 */
export async function fetchInitialTasks(signal?: AbortSignal): Promise<Task[]> {
  const response = await fetch(TODOS_ENDPOINT, { signal });

  if (!response.ok) {
    throw new Error(`Could not load tasks (HTTP ${response.status}).`);
  }

  const payload: unknown = await response.json();

  if (!isTodosResponse(payload)) {
    throw new Error('Received an unexpected response while loading tasks.');
  }

  return payload.todos.map((todo) => ({
    id: createId('seed'),
    title: todo.todo,
    status: todo.completed ? 'completed' : 'pending',
    createdAt: Date.now(),
    // Seed completions are not attributed to "today" so the daily
    // challenge only reflects work the user does inside the app.
    completedAt: null,
  }));
}
