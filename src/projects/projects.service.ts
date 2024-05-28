import { CreateProjectDTO, UpdateProjectDTO } from './dtos/project.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECTS_REPOSITORY,
  ProjectsRepository,
} from './repositories/projects-repository';
import { GridFSBucket } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

@Injectable()
export class ProjectsService {
  private gfs: GridFSBucket;

  constructor(
    @Inject(PROJECTS_REPOSITORY)
    private readonly projectsRepository: ProjectsRepository,
    @InjectConnection() private connection: Connection,
  ) {
    this.gfs = new GridFSBucket(this.connection.db as any, {
      bucketName: 'fs',
    });
  }

  async createProject(createProjectDTO: CreateProjectDTO, image: string) {
    return await this.projectsRepository.createProject(createProjectDTO, image);
  }

  async getImage(imageId: string) {
    const _id = new Types.ObjectId(imageId);
    return this.gfs.openDownloadStream(_id);
  }

  async findAll() {
    return await this.projectsRepository.findAll();
  }

  async findById(id: string) {
    return await this.projectsRepository.findById(id);
  }

  async findByName(name: string) {
    return await this.projectsRepository.findByName(name);
  }

  async updateProject(id: string, updateProjectDTO: UpdateProjectDTO) {
    return await this.projectsRepository.updateProject(id, updateProjectDTO);
  }

  async deleteProject(id: string) {
    return await this.projectsRepository.deleteProject(id);
  }
}
