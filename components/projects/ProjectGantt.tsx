"use client";

import { Task } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, addMinutes } from "date-fns";

interface ProjectGanttProps {
  tasks: Task[];
}

export function ProjectGantt({ tasks }: ProjectGanttProps) {
  const scheduledTasks = tasks.filter(task => task.scheduledStart);

  if (scheduledTasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Task Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            No tasks scheduled yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduledTasks.map((task) => {
            const startTime = new Date(task.scheduledStart!);
            const endTime = task.estimatedDuration 
              ? addMinutes(startTime, task.estimatedDuration)
              : addMinutes(startTime, 30);
            
            const progress = task.completed ? 100 : task.progress || 0;
            
            return (
              <div key={task.id} className="relative bg-white border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-500">
                      {format(startTime, "MMM d, h:mm a")} - {format(endTime, "h:mm a")}
                    </p>
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    task.completed 
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {task.completed ? "Completed" : `${progress}%`}
                  </span>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                    <div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    />
                  </div>
                </div>
                
                {task.dependencies && task.dependencies.length > 0 && (
                  <div className="mt-2 text-sm text-gray-500">
                    Dependencies: {task.dependencies.join(", ")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}