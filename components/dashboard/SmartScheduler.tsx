"use client";

import { useState } from "react";
import { useTaskStore } from "@/lib/stores/taskStore";
import { getSmartSchedule } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export function SmartScheduler() {
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<any>(null);
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);

  const generateSchedule = async () => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    
    if (incompleteTasks.length === 0) {
      toast.error("Add some incomplete tasks first to generate a schedule");
      return;
    }

    setIsLoading(true);
    try {
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error("Gemini API key is not configured");
      }

      const result = await getSmartSchedule(incompleteTasks);
      if (result?.scheduledTasks && result.scheduledTasks.length > 0) {
        setSchedule(result);
        toast.success("Schedule generated successfully!");
      } else {
        throw new Error("No tasks were scheduled");
      }
    } catch (error: any) {
      console.error("Scheduling error:", error);
      toast.error(error.message || "Failed to generate schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const applySchedule = () => {
    if (!schedule?.scheduledTasks) {
      toast.error("No schedule to apply");
      return;
    }

    try {
      schedule.scheduledTasks.forEach((scheduledTask: any) => {
        if (scheduledTask.id && scheduledTask.suggestedStartTime) {
          updateTask(scheduledTask.id, {
            scheduledStart: scheduledTask.suggestedStartTime,
            priority: scheduledTask.priority || 1,
            estimatedDuration: scheduledTask.estimatedDuration || 30,
          });
        }
      });

      toast.success("Schedule applied to tasks!");
      setSchedule(null);
    } catch (error: any) {
      console.error("Error applying schedule:", error);
      toast.error(error.message || "Failed to apply schedule to tasks");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Smart Scheduling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!process.env.NEXT_PUBLIC_GEMINI_API_KEY ? (
            <div className="text-sm text-red-500">
              Please configure your Gemini API key in .env.local to use smart scheduling
            </div>
          ) : (
            <Button
              onClick={generateSchedule}
              disabled={isLoading || tasks.filter(t => !t.completed).length === 0}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Schedule...
                </>
              ) : (
                "Generate Smart Schedule"
              )}
            </Button>
          )}

          {schedule?.scheduledTasks && (
            <div className="space-y-4">
              <div className="divide-y divide-gray-200 rounded-lg border">
                {schedule.scheduledTasks.map((task: any) => (
                  <div key={task.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{task.title}</h4>
                      <span className="text-sm text-gray-500">
                        Priority: {task.priority}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(task.suggestedStartTime), "MMM d, h:mm a")}
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {task.estimatedDuration} min
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{task.reasoning}</p>
                  </div>
                ))}
              </div>

              <Button onClick={applySchedule} className="w-full">
                Apply Schedule
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}