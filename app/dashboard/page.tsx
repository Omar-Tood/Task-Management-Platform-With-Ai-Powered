"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { TaskList } from "@/components/dashboard/TaskList";
import { TaskStats } from "@/components/dashboard/TaskStats";
import { TaskForm } from "@/components/dashboard/TaskForm";
import { TaskAnalytics } from "@/components/dashboard/TaskAnalytics";
import { SmartScheduler } from "@/components/dashboard/SmartScheduler";
import { ProjectGantt } from "@/components/projects/ProjectGantt";
import { ResourceAllocation } from "@/components/projects/ResourceAllocation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTaskStore } from "@/lib/stores/taskStore";

export default function Dashboard() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <Button onClick={() => setIsAddingTask(true)} className="w-full sm:w-auto">
              <Plus className="h-5 w-5 mr-2" />
              Add Task
            </Button>
          </div>

          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
            <div className="lg:col-span-2">
              <TaskStats />
            </div>
            <div className="lg:col-span-1">
              <SmartScheduler />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
            <div className="lg:col-span-2">
              <ProjectGantt tasks={tasks} />
            </div>
            <div className="lg:col-span-1">
              <ResourceAllocation tasks={tasks} />
            </div>
          </div>
          
          {isAddingTask && (
            <div className="mb-8">
              <TaskForm onComplete={() => setIsAddingTask(false)} />
            </div>
          )}

          <TaskList />
        </div>
      </main>
    </div>
  );
}