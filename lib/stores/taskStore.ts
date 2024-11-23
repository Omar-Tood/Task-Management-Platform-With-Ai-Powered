import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, taskSchema } from "@/lib/types";
import { toast } from "sonner";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => {
        const newTask = {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
        toast.success("Task created successfully");
      },
      updateTask: (id, updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        }));
        toast.success("Task updated successfully");
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
        toast.success("Task deleted successfully");
      },
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
    }),
    {
      name: "task-store",
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const { state } = JSON.parse(str);
            return {
              state: {
                ...state,
                tasks: state.tasks.map((task: any) => ({
                  ...task,
                  createdAt: new Date(task.createdAt),
                })),
              },
            };
          } catch (e) {
            return null;
          }
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);