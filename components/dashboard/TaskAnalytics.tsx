"use client";

import { useTaskStore } from "@/lib/stores/taskStore";
import { CompletionTrendChart } from "./charts/CompletionTrendChart";
import { TaskDistributionChart } from "./charts/TaskDistributionChart";

export function TaskAnalytics() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <CompletionTrendChart tasks={tasks} />
      <TaskDistributionChart tasks={tasks} />
    </div>
  );
}