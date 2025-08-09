// src/types/dto.ts

export type UUID = string;

export interface UserDto {
    id: UUID;
    name: string;
    avatarUrl?: string;
}

export interface RoleDto {
    id: number;
    name: string;
}

export interface TechnologyDto {
    id: number;
    name: string;
}

export interface TypeDto {
    id: UUID;
    name: string;
}

export interface MemberDto {
    id: UUID;                 // предполагаю, что Member тоже имеет id
    name: string;
    avatarUrl?: string;
    roles?: RoleDto[];        // в списке мог быть UserDto, но для Get — роли есть
}

export interface GetProjectResponse {
    id: UUID;
    name: string;
    shortDescription: string;
    description: string;
    owner: UserDto;
    type: TypeDto;
    status: 'DRAFT' | 'ACTIVE' | 'RECRUITING' | 'ARCHIVED' | string;
    technologyNames: TechnologyDto[]; // бек так назвал — оставляем как есть
    roleNames: RoleDto[];             // бек так назвал — оставляем как есть
    members: MemberDto[];
    createdAt: string; // ISO (OffsetDateTime)
}

export interface CreateProjectResponse {
    id: UUID;
    name: string;
    description: string;
    shortDescription: string;
    status: 'DRAFT' | 'ACTIVE' | 'RECRUITING' | 'ARCHIVED' | string;
    type: TypeDto;
    owner: UserDto;
    technologies: TechnologyDto[];
    roles: RoleDto[];
    members: MemberDto[];
    createdAt: string;
    updatedAt: string;
}

export interface ProjectListItemDto {
    id: UUID;
    name: string;
    shortDescription: string;
    owner: UserDto;
    typeName: TypeDto;              // бек-нейминг
    status: 'DRAFT' | 'ACTIVE' | 'RECRUITING' | 'ARCHIVED' | string;
    technologyNames: TechnologyDto[];
    roleNames: RoleDto[];
    members: UserDto[];
    createdAt: string;
}

export interface ListProjectResponseDto {
    projects: ProjectListItemDto[];
    total: number;
    page: number;
    size: number;
}
