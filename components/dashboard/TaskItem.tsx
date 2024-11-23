"use client";

import { useState } from "react";
import { Task } from "@/lib/types";
import { useTaskStore } from "@/lib/stores/taskStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar, AlertCircle } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toggleTask, deleteTask } = useTaskStore();

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return "text-red-500";
    if (priority === 3) return "text-yellow-500";
    return "text-blue-500";
  };

  if (isEditing) {
    return (
      <div className="p-3 sm:p-4">
        <TaskForm task={task} onComplete={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => toggleTask(task.id)}
          className="mt-1"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
              {task.title}
            </p>
            <AlertCircle className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
          </div>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          )}
          {task.scheduledStart && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(task.scheduledStart), "MMM d, h:mm a")}</span>
              {task.estimatedDuration && (
                <span className="ml-2">{task.estimatedDuration} min</span>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="h-8 w-8 p-0"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteTask(task.id)}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}