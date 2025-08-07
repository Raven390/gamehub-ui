import { apiFetch } from './http';

export async function fetchTechnologies() {
    const res = await apiFetch<{ technologies: { id: number; name: string }[], total: number, page: number, size: number }>('/reference/technologies');
    return res.technologies || [];
}
export async function fetchRoles() {
    const res = await apiFetch<{ roles: { id: number; name: string }[], total: number, page: number, size: number }>('/reference/roles');
    return res.roles || [];
}
export async function fetchProjectTypes() {
    const res = await apiFetch<{ types: { id: string; name: string }[], total: number, page: number, size: number }>('/reference/types');
    return res.types || [];
}
