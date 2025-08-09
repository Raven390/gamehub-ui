export interface Project {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    technologyNames?: string[];
    roleNames?: string[];
    type?: ProjectType;
    status?: 'DRAFT' | 'ACTIVE' | 'RECRUITING' | 'ARCHIVED';
    membersCount?: number;
    ownerId?: string;
    ownerName: string;
    avatarUrl?: string;
    createdAt?: string;
}

export interface ProjectType {
    id: string;   // UUID
    name: string;
}