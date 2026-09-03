import { Header } from './components/Header';
import { TaskSummary } from './components/TaskSummary';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { ChallengePanel } from './components/challenges/ChallengePanel';
import { useTasks } from './hooks/useTasks';
import { useChallenges } from './hooks/useChallenges';

export default function App(): JSX.Element {
  const {
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
  } = useTasks();

  const { challengeName, leaderboard, userEntry, streak, pointsPerTask, resetChallenge } =
    useChallenges(completedToday);

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <section className="app__panel" aria-label="Task manager">
          <TaskSummary counts={counts} />
          <AddTaskForm onAdd={addTask} />
          <TaskFilters active={filter} counts={counts} onChange={setFilter} />
          <TaskList
            tasks={visibleTasks}
            filter={filter}
            status={status}
            error={error}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onRetry={reload}
          />
        </section>

        <aside className="app__sidebar" aria-label="Group challenge">
          <ChallengePanel
            challengeName={challengeName}
            leaderboard={leaderboard}
            userEntry={userEntry}
            streak={streak}
            pointsPerTask={pointsPerTask}
            completedToday={completedToday}
            onReset={resetChallenge}
          />
        </aside>
      </main>

      <footer className="app__footer">
        <p>Made for the whole household · Starter notes from dummyjson.com</p>
      </footer>
    </div>
  );
}
