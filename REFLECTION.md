**What did AI help me with?**

- AI helped me rapidly scaffold the component architecture, structure the TypeScript interfaces for tasks and challenges, and implement the initial boilerplate for the custom hooks (`useTasks` and `useChallenges`) to keep the codebase clean and maintainable.

**2. What did I have to understand and verify myself?**

- I had to thoroughly understand and manually verify how state updates flow immutably across parent and child components, how the `useEffect` hook handles asynchronous data fetching from the DummyJSON API without crashing on failure, and how to synchronize the local state with `localStorage` for the challenge leaderboard.

**3. Which AI suggestion did I reject or modify, and why?**

- The initial AI suggestion placed all the state and business logic directly inside the `App.tsx` file. I rejected this and modified it to use the Custom Hooks architecture to separate concerns, keeping the components purely focused on UI rendering and making the code much easier to test and maintain.

**4. How did I decide where state should live?**

- Core states like `tasks`, `filter`, `loading`, and `error` live in the top-level App or custom hook because they need to be shared across multiple sibling components (like the `TaskSummary`, `TaskFilters`, and `TaskList`). Local UI states, such as the input value for the add task form, were kept local inside their respective components (`AddTaskForm`) where they are actually used. اي رأيك في ده
