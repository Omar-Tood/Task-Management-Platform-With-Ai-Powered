import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  createdAt: z.date().optional().default(() => new Date()),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  priority: z.number().min(1).max(5).default(3),
  estimatedDuration: z.number().min(1).max(480).default(30),
  assignedTo: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  progress: z.number().min(0).max(100).default(0),
  projectId: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["planning", "active", "completed", "on-hold"]),
  team: z.array(z.string()),
  milestones: z.array(z.string()),
});

export type Task = z.infer<typeof taskSchema>;
export type Project = z.infer<typeof projectSchema>;