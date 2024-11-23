"use client";

import { useTaskStore } from "@/lib/stores/taskStore";
import { CheckCircle, Circle, Clock } from "lucide-react";

export function TaskStats() {
  const tasks = useTaskStore((state) => state.tasks);
  
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.completed}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-sm font-medium text-gray-600">Active</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.active}</p>
          </div>
        </div>
      </div>
    </div>
  );
}