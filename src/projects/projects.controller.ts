import MongooseClassSerializerInterceptor from '../utils/interceptors/mongooseClassSerializer.interceptor';
import { CreateProjectDTO, UpdateProjectDTO } from './dtos/project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';
import {
  UseInterceptors,
  Controller,
  HttpCode,
  Delete,
  Patch,
  Param,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
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
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(201)
  @ApiOkResponse({
    description: 'El proyecto fue creado exitosamente',
  })
  @ApiBadRequestResponse({
    description: 'El nombre del proyecto ya existe',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  createProject(@Body() createProjectDTO: CreateProjectDTO) {
    this.checkIfProjectNameExists(createProjectDTO.name);
    return this.projectsService.createProject(createProjectDTO);
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Todos los proyectos fueron encontrados exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get()
  findAll() {
    return this.projectsService.findAll();
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
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDTO: UpdateProjectDTO,
  ) {
    this.checkIfProjectExists(id);
    return this.projectsService.updateProject(id, updateProjectDTO);
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
  deleteProject(@Param('id') id: string) {
    this.checkIfProjectExists(id);
    return this.projectsService.deleteProject(id);
  }

  private async checkIfProjectNameExists(name: string) {
    if (await this.projectsService.findByName(name))
      HttpBadRequest('El nombre del proyecto ya existe');
  }

  private async checkIfProjectExists(id: string) {
    if (!(await this.projectsService.findById(id)))
      HttpNotFound('El proyecto no existe');
  }
}
