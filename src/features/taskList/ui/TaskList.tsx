import { TaskCard } from "entities/task";
import { FilterButtons } from "shared/ui/filterButtons";

import { useTasks } from "../model/useTask";
import styles from "./TaskList.module.css";

export function TaskList() {
  const { tasks, filter, setFilter, removeTask } = useTasks();

  return (
    <div className={styles.container}>
      <FilterButtons filter={filter} onFilterChange={setFilter} />

      <div className={styles.list}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.item}>
            <TaskCard title={task.title} completed={task.completed} />
            <button
              className={styles.removeBtn}
              onClick={() => removeTask(task.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
