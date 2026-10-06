import { useState } from "react";

import type { Task } from "entities/task";

export type Filter = "all" | "completed" | "incomplete";

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Создать репозиторий", completed: true },
  { id: "2", title: "Настроить Vite", completed: true },
  { id: "3", title: "Реализовать taskList", completed: false },
  { id: "4", title: "Написать тесты", completed: false },
  { id: "5", title: "Подготовить деплой", completed: false },
];

export function useTasks(initial: Task[] = INITIAL_TASKS) {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks: filtered, filter, setFilter, removeTask };
}
