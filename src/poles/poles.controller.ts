import MongooseClassSerializerInterceptor from '../utils/interceptors/mongooseClassSerializer.interceptor';
import { HttpBadRequest } from '../utils/exceptions/http.exception';
import { ProjectsService } from 'src/projects/projects.service';
import { CreatePoleDTO, UpdatePoleDTO } from './dtos/pole.dto';
import { PolesService } from './poles.service';
import { Pole } from './schemas/pole.schema';
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
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Poles')
@Controller('poles')
@UseInterceptors(MongooseClassSerializerInterceptor(Pole))
export class PolesController {
  constructor(
    private readonly polesService: PolesService,
    private readonly projectsService: ProjectsService,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'El poste fue creado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  async createPole(@Body() createPoleDTO: CreatePoleDTO) {
    this.logger.log('[Back] Pole endpoint called!');
    await this.checkIfProjectExists(createPoleDTO.project);
    const pole = await this.polesService.createPole(createPoleDTO);
    this.logger.log(`[Back] Poste creado: ${pole.serial}`);
    return pole;
  }

  private async checkIfProjectExists(project: string) {
    if (!(await this.projectsService.findById(project)))
      HttpBadRequest('El proyecto no existe');
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Todos los postes fueron encontrados exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get()
  async findAll() {
    this.logger.log('[Back] Pole endpoint called!');
    const poles = await this.polesService.findAll();
    this.logger.log('[Back] Retornando todos los postes');
    return poles;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description:
      'Los postes del proyecto especifico fueron encontrados exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get('project/:project')
  async findByProject(@Param('project') project: string) {
    this.logger.log('[Back] Pole endpoint called!');
    const poles = await this.polesService.findByProject(project);
    this.logger.log(
      `[Back] Retornando todos lo postes del proyecto ${project}`,
    );
    return poles;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El poste del serial especifico fue encontrado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get('serial/:serial')
  async findBySerial(@Param('serial') serial: string) {
    this.logger.log('[Back] Pole endpoint called!');
    const pole = await this.polesService.findBySerial(serial);
    this.logger.log(`[Back] Retornando el poste del serial ${serial}`);
    return pole;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El poste fue actualizado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Patch(':id')
  async updatePole(
    @Param('id') id: string,
    @Body() updatePoleDTO: UpdatePoleDTO,
  ) {
    this.logger.log('[Back] Pole endpoint called!');
    const pole = await this.polesService.updatePole(id, updatePoleDTO);
    this.logger.log(`[Back] Poste actualizado: ${id}`);
    return pole;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Los postes fueron eliminados exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Delete()
  async deletePoles(@Body('ids') ids: string[]) {
    this.logger.log('[Back] Pole endpoint called!');
    const poles = await this.polesService.deletePoles(ids);
    this.logger.log(`[Back] Postes eliminados: ${ids}`);
    return poles;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El poste fue eliminado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Delete(':id')
  async deletePole(@Param('id') id: string) {
    this.logger.log('[Back] Pole endpoint called!');
    const pole = await this.polesService.deletePole(id);
    this.logger.log(`[Back] Poste eliminado: ${id}`);
    return pole;
  }
}
