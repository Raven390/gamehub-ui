export interface Project {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    technologyNames?: string[];
    roleNames?: string[];
    typeName?: string;
    status?: 'DRAFT' | 'ACTIVE' | 'RECRUITING' | 'ARCHIVED';
    membersCount?: number;
    ownerName: string;
    avatarUrl?: string;
    createdAt?: string;
}
