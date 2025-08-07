import {Project} from "./Project";

export interface ProjectPageResponse {
    projects: Project[];
    total: number;
    page: number;
    size: number;
}
