import { create } from 'zustand';
import { Project } from '../types/Project';
import * as projectsApi from '../api/ProjectsApi';

interface ProjectsStore {
    projects: Project[];
    loading: boolean;
    error: string | null;
    fetchProjects: () => Promise<void>;
    createProject: (project: Partial<Project>) => Promise<void>;
    updateProject: (id: number, update: Partial<Project>) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;
}

export const useProjectsStore = create<ProjectsStore>((set, get) => ({
    projects: [],
    loading: false,
    error: null,

    // Получить список проектов
    fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
            const data = await projectsApi.fetchProjects();
            set({ projects: data, loading: false });
        } catch (e: any) {
            set({ error: e.message || 'Ошибка загрузки проектов', loading: false });
        }
    },

    // Создать проект
    createProject: async (project) => {
        set({ loading: true, error: null });
        try {
            const created = await projectsApi.createProject(project);
            set({ projects: [created, ...get().projects], loading: false });
        } catch (e: any) {
            set({ error: e.message || 'Ошибка создания', loading: false });
        }
    },

    // Обновить проект
    updateProject: async (id, update) => {
        set({ loading: true, error: null });
        try {
            const updated = await projectsApi.updateProject(id, update);
            set({
                projects: get().projects.map(p => p.id === id ? updated : p),
                loading: false
            });
        } catch (e: any) {
            set({ error: e.message || 'Ошибка обновления', loading: false });
        }
    },

    // Удалить проект
    deleteProject: async (id) => {
        set({ loading: true, error: null });
        try {
            await projectsApi.deleteProject(id);
            set({
                projects: get().projects.filter(p => p.id !== id),
                loading: false
            });
        } catch (e: any) {
            set({ error: e.message || 'Ошибка удаления', loading: false });
        }
    },
}));
