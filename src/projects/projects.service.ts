import { CreateProjectDTO, UpdateProjectDTO } from './dtos/project.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECTS_REPOSITORY,
  ProjectsRepository,
} from './repositories/projects-repository';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(PROJECTS_REPOSITORY)
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async createProject(createProjectDTO: CreateProjectDTO) {
    return await this.projectsRepository.createProject(createProjectDTO);
  }

  async findAll() {
    return await this.projectsRepository.findAll();
  }

  async findById(id: string) {
    return this.projectsRepository.findById(id);
  }

  async findByName(name: string) {
    return this.projectsRepository.findByName(name);
  }

  async updateProject(id: string, updateProjectDTO: UpdateProjectDTO) {
    return this.projectsRepository.updateProject(id, updateProjectDTO);
  }

  async deleteProject(id: string) {
    return this.projectsRepository.deleteProject(id);
  }
}
