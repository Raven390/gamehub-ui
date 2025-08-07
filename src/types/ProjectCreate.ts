export interface ProjectCreate {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    technologyIds?: number[];
    roleIds?: number[];
    typeId?: string;
    status?: 'DRAFT' | 'ACTIVE' | 'RECRUITING' | 'ARCHIVED';
    membersCount?: number;
    ownerName: string;
    avatarUrl?: string;
    createdAt?: string;
    members?: string[]
}
