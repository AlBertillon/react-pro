import { memo } from "react";

import { TaskCard } from "entities/task";
import type { Task } from "entities/task";
import { FilterButtons } from "shared/ui/filterButtons";

import type { Filter } from "../model/useTask";
import styles from "./TaskList.module.css";

export interface TaskListProps {
  tasks: Task[];
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onRemoveTask?: (id: number) => void;
}

export const TaskList = memo(
  ({ tasks, filter, onFilterChange, onRemoveTask }: TaskListProps) => {
    return (
      <div className={styles.container}>
        <FilterButtons filter={filter} onFilterChange={onFilterChange} />

        <div className={styles.list}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.item}>
              <TaskCard title={task.title} completed={task.completed} />
              {onRemoveTask && (
                <button
                  className={styles.removeBtn}
                  onClick={() => onRemoveTask(task.id)}
                >
                  Удалить
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);