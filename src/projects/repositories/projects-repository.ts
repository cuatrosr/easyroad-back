import { CreateProjectDTO, UpdateProjectDTO } from '../dtos/project.dto';
import { Project } from '../schemas/project.schema';

export const PROJECTS_REPOSITORY = 'ProjectsRepository';

export interface ProjectsRepository {
  createProject(createProjectDTO: CreateProjectDTO): Promise<Project>;
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  findByName(name: string): Promise<Project | null>;
  updateProject(
    id: string,
    updateProjectDTO: UpdateProjectDTO,
  ): Promise<Project | null>;
  deleteProject(id: string): Promise<Project | null>;
}
