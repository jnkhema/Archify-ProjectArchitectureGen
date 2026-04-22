export interface CreateArchitectureRequest {
    projectTitle: string;
    projectDescription: string;
    architectureLevel: string;
    prompt: string;
}

export interface ArchitectureResponse {   //projectArchitecture
    architectureId: number;
    userId: number;
    projectTitle: string;
    projectDescription: string;
    architectureLevel: string;
    prompt: string;
    techstack: string;
    generatedBlueprint: string;
    createdAt: Date;
}

export interface UpdateArchitectureRequest {
    projectTitle?: string;
    projectDescription?: string;
    architectureLevel?: string;
    prompt?: string;
}

export interface ProjectArchitectureList{
    architectureId: number;
    projectTitle: string;
    projectDescription: string;
    createdAt: Date;
}