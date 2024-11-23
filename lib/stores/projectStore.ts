import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project, projectSchema } from "@/lib/types";
import { toast } from "sonner";

interface ProjectStore {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      addProject: (project) => {
        const newProject = {
          ...project,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          projects: [...state.projects, newProject],
        }));
        toast.success("Project created successfully");
      },
      updateProject: (id, updatedProject) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          ),
        }));
        toast.success("Project updated successfully");
      },
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
        toast.success("Project deleted successfully");
      },
      getProject: (id) => {
        return get().projects.find((project) => project.id === id);
      },
    }),
    {
      name: "project-store",
    }
  )
);