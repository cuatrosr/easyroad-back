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
