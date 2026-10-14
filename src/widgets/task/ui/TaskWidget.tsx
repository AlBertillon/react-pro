import { TaskList } from "features/taskList";
import { useTasks } from "features/taskList/model/useTask";

import styles from "./TaskWidget.module.css";

export function TaskWidget() {
  const { tasks, filter, setFilter, removeTask } = useTasks();

  return (
    <section className={styles.wrapper}>
      <TaskList
        tasks={tasks}
        filter={filter}
        onFilterChange={setFilter}
        onRemoveTask={removeTask}
      />
    </section>
  );
}
