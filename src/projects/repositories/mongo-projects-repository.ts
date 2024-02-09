import { CreateProjectDTO, UpdateProjectDTO } from '../dtos/project.dto';
import { HttpMongoError } from '../../utils/exceptions/http.exception';
import { Project, ProjectModel } from '../schemas/project.schema';
import { ProjectsRepository } from './projects-repository';
import { Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export class MongoProjectsRepository implements ProjectsRepository {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    @InjectModel(Project.name)
    private readonly projectModel: ProjectModel,
  ) {}

  async createProject(createProjectDTO: CreateProjectDTO, image: string) {
    return await this.projectModel
      .create({ ...createProjectDTO, image })
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findAll() {
    return await this.projectModel
      .find({ isActive: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findById(id: string) {
    return await this.projectModel
      .findById(id)
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findByName(name: string) {
    return await this.projectModel
      .findOne({ name, isActive: true })
      .exec()
      .catch(() => {
        return HttpMongoError('Error en la base de datos');
      });
  }

  async updateProject(id: string, updateProjectDTO: UpdateProjectDTO) {
    return await this.projectModel
      .findByIdAndUpdate(id, updateProjectDTO, {
        new: true,
      })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async deleteProject(id: string) {
    return await this.projectModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }
}
