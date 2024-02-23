import MongooseClassSerializerInterceptor from '../utils/interceptors/mongooseClassSerializer.interceptor';
import { CreateProjectDTO, UpdateProjectDTO } from './dtos/project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';
import { unlinkSync } from 'fs';
import {
  UseInterceptors,
  Controller,
  HttpCode,
  Logger,
  Inject,
  Delete,
  Patch,
  Param,
  Post,
  Body,
  Get,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  HttpBadRequest,
  HttpNotFound,
} from '../utils/exceptions/http.exception';

@ApiTags('Projects')
@Controller('projects')
@UseInterceptors(MongooseClassSerializerInterceptor(Project))
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'El proyecto fue creado exitosamente',
  })
  @ApiBadRequestResponse({
    description: 'El nombre del proyecto ya existe',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @UseInterceptors(FileInterceptor('image'))
  async createProject(
    @UploadedFile() image: Express.Multer.File,
    @Body() createProjectDTO: CreateProjectDTO,
  ) {
    this.logger.log('[Back] Project endpoint called!');
    await this.checkIfProjectNameExists(createProjectDTO.name, image);
    const project = await this.projectsService.createProject(
      createProjectDTO,
      image.filename,
    );
    this.logger.log(`[Back] Proyecto creado: ${project.name}`);
    return project;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El proyecto fue encontrado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    this.logger.log('[Back] Project endpoint called!');
    const project = await this.projectsService.findById(id);
    this.logger.log(`[Back] Retornando el proyecto ${project?._id || null}`);
    return project;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Todos los proyectos fueron encontrados exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get()
  async findAll() {
    this.logger.log('[Back] Project endpoint called!');
    const projects = await this.projectsService.findAll();
    this.logger.log('[Back] Retornando todos los proyectos');
    return projects;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El proyecto fue actualizado exitosamente',
  })
  @ApiNotFoundResponse({
    description: 'El proyecto no existe',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Patch(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDTO: UpdateProjectDTO,
  ) {
    this.logger.log('[Back] Project endpoint called!');
    await this.checkIfProjectExists(id);
    const project = await this.projectsService.updateProject(
      id,
      updateProjectDTO,
    );
    this.logger.log(`[Back] Proyecto actualizado: ${id}`);
    return project;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El proyecto fue eliminado exitosamente',
  })
  @ApiNotFoundResponse({
    description: 'El proyecto no existe',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    this.logger.log('[Back] Project endpoint called!');
    await this.checkIfProjectExists(id);
    const project = await this.projectsService.deleteProject(id);
    this.logger.log(`[Back] Proyecto eliminado: ${id}`);
    return project;
  }

  private async checkIfProjectNameExists(
    name: string,
    image: Express.Multer.File,
  ) {
    this.logger.log(
      `[Back] Validando si el nombre del proyecto ya existe: ${name}`,
    );
    if (await this.projectsService.findByName(name)) {
      this.logger.warn(`[Back] El nombre del proyecto ya existe: ${name}`);
      unlinkSync(image.path);
      HttpBadRequest('El nombre del proyecto ya existe');
    }
  }

  private async checkIfProjectExists(id: string) {
    this.logger.log(`[Back] Validando si el proyecto ya existe: ${id}`);
    if (!(await this.projectsService.findById(id))) {
      this.logger.warn(`[Back] El proyecto no existe: ${id}`);
      HttpNotFound('El proyecto no existe');
    }
  }
}
