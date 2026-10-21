import { useEffect, useMemo, useState } from "react";

import type { Task } from "entities/task";
import { useGetTasksQuery } from "entities/task/api/tasksApi";

export type Filter = "all" | "completed" | "incomplete";

export function useTasks() {
  const { data: apiTasks } = useGetTasksQuery();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (apiTasks) {
      setTasks(apiTasks);
    }
  }, [apiTasks]);

  const filtered = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "incomplete") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks: filtered, filter, setFilter, removeTask };
}