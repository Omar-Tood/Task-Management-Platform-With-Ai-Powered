"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task, taskSchema } from "@/lib/types";
import { useTaskStore } from "@/lib/stores/taskStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface TaskFormProps {
  task?: Task;
  onComplete: () => void;
}

const priorities = [
  { value: "1", label: "Low" },
  { value: "2", label: "Medium-Low" },
  { value: "3", label: "Medium" },
  { value: "4", label: "Medium-High" },
  { value: "5", label: "High" }
];

export function TaskForm({ task, onComplete }: TaskFormProps) {
  const { addTask, updateTask } = useTaskStore();
  
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: task || {
      title: "",
      description: "",
      completed: false,
      priority: 3,
      estimatedDuration: 30
    },
  });

  const onSubmit = (data: Task) => {
    if (task) {
      updateTask(task.id, data);
    } else {
      addTask(data);
    }
    onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Task description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className="flex items-center gap-2">
                          <AlertCircle className={`h-4 w-4 ${
                            parseInt(priority.value) >= 4 ? 'text-red-500' :
                            parseInt(priority.value) === 3 ? 'text-yellow-500' :
                            'text-blue-500'
                          }`} />
                          {priority.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={480}
                    placeholder="Estimated duration"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-6">
          <Button type="button" variant="ghost" onClick={onComplete} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            {task ? "Update" : "Create"} Task
          </Button>
        </div>
      </form>
    </Form>
  );
}