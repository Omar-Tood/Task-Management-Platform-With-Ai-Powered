"use client";

import { useState } from "react";
import { Task } from "@/lib/types";
import { TaskItem } from "./TaskItem";
import { useTaskStore } from "@/lib/stores/taskStore";

export function TaskList() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const tasks = useTaskStore((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex space-x-4">
          {["all", "active", "completed"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option as typeof filter)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                filter === option
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No tasks found
          </div>
        )}
      </div>
    </div>
  );
}