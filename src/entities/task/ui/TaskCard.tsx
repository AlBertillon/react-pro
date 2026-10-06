import styles from "./TaslCard.module.css";

interface TaskCardProps {
  title: string;
  completed: boolean;
}

export function TaskCard({ title, completed }: TaskCardProps) {
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
}
