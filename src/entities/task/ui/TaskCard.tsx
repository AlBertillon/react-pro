import { memo, useEffect } from "react";

import styles from "./TaslCard.module.css";

export interface TaskCardProps {
  title: string;
  completed: boolean;
}

export const TaskCard = memo(({ title, completed }: TaskCardProps) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.status}
        title={completed ? "Выполнено" : "Не выполнено"}
      />
      <span className={completed ? styles.titleCompleted : styles.title}>
        {title}
      </span>
    </div>
  );
});
