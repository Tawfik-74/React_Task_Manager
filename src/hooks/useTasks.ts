import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchInitialTasks } from '../api/tasks';
import type { RequestStatus, Task, TaskCounts, TaskFilter } from '../types';
import { createId } from '../utils/id';
import { isSameDay } from '../utils/date';

export interface UseTasksResult {
  /** Every task, newest first. */
  tasks: Task[];
  /** Tasks after the active filter is applied (derived state). */
  visibleTasks: Task[];
  filter: TaskFilter;
  counts: TaskCounts;
  /** Completions made today — feeds the group challenge. */
  completedToday: number;
  status: RequestStatus;
  error: string | null;
  setFilter: (filter: TaskFilter) => void;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reload: () => void;
}

/**
 * Owns all task business logic: the initial fetch, immutable CRUD
 * operations, filtering and summary counts.
 */
export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setError(null);

    fetchInitialTasks(controller.signal)
      .then((seed) => {
        setTasks(seed);
        setStatus('success');
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          cause instanceof Error
            ? cause.message
            : 'Something went wrong while loading tasks.',
        );
        setStatus('error');
      });

    return () => controller.abort();
  }, [reloadToken]);

  const addTask = useCallback((title: string): void => {
    const trimmed = title.trim();
    if (trimmed.length === 0) return;

    setTasks((previous) => [
      {
        id: createId(),
        title: trimmed,
        status: 'pending',
        createdAt: Date.now(),
        completedAt: null,
      },
      ...previous,
    ]);
  }, []);

  const toggleTask = useCallback((id: string): void => {
    setTasks((previous) =>
      previous.map((task) => {
        if (task.id !== id) return task;
        const nowCompleted = task.status !== 'completed';
        return {
          ...task,
          status: nowCompleted ? 'completed' : 'pending',
          completedAt: nowCompleted ? Date.now() : null,
        };
      }),
    );
  }, []);

  const deleteTask = useCallback((id: string): void => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }, []);

  const reload = useCallback((): void => {
    setReloadToken((token) => token + 1);
  }, []);

  const counts = useMemo<TaskCounts>(() => {
    const completed = tasks.reduce(
      (total, task) => (task.status === 'completed' ? total + 1 : total),
      0,
    );
    return { total: tasks.length, completed, remaining: tasks.length - completed };
  }, [tasks]);

  const completedToday = useMemo<number>(() => {
    const now = Date.now();
    return tasks.reduce((total, task) => {
      const done =
        task.status === 'completed' &&
        task.completedAt !== null &&
        isSameDay(task.completedAt, now);
      return done ? total + 1 : total;
    }, 0);
  }, [tasks]);

  const visibleTasks = useMemo<Task[]>(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return {
    tasks,
    visibleTasks,
    filter,
    counts,
    completedToday,
    status,
    error,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    reload,
  };
}
