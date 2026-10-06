import { TaskList } from "features/taskList";

import styles from "./TaskWidget.module.css";

export function TaskWidget() {
  return (
    <section className={styles.wrapper}>
      <TaskList />
    </section>
  );
}
