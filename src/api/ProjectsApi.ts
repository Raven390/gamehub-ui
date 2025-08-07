import {apiFetch, FetchProjectsParams} from './http';
import { Project } from '../types/Project';
import {ProjectPageResponse} from "../types/ProjectPageResponse";
import {ProjectCreate} from "../types/ProjectCreate";


export async function fetchProjects(params: FetchProjectsParams = {}): Promise<ProjectPageResponse> {
    const { page = 0, size = 10, search } = params;

    const query = new URLSearchParams();
    query.append('page', String(page));
    query.append('size', String(size));
    if (search) query.append('search', search);

    return apiFetch<ProjectPageResponse>(`/projects?${query.toString()}`, { method: 'GET' });
}

export async function createProject(project: Partial<ProjectCreate>): Promise<Project> {
    console.log(JSON.stringify(project));
    return apiFetch<Project>('/projects', {
        method: 'POST',
        body: JSON.stringify(project),
    });

}


export async function updateProject(id: number, update: Partial<Project>): Promise<Project> {
    return apiFetch<Project>(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(update),
    });
}

// Новый: удалить проект (DELETE)
export async function deleteProject(id: number): Promise<void> {
    await apiFetch(`/projects/${id}`, { method: 'DELETE' });
}
