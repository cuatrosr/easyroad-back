import MongooseClassSerializerInterceptor from '../utils/interceptors/mongooseClassSerializer.interceptor';
import { CreateStateDTO, UpdateStateDTO } from './dtos/state.dto';
import { StatesService } from './states.service';
import { State } from './schemas/state.schema';
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

@ApiTags('States')
@Controller('states')
@UseInterceptors(MongooseClassSerializerInterceptor(State))
export class StatesController {
  constructor(
    private readonly statesService: StatesService,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'El estado fue creado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  async createState(@Body() createStateDTO: CreateStateDTO) {
    this.logger.log('[Back] State endpoint called!');
    const state = await this.statesService.createState(createStateDTO);
    this.logger.log(`[Back] Estado creado: ${state.name}`);
    return state;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Todos los estados fueron encontrados exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get()
  async findAll() {
    this.logger.log('[Back] State endpoint called!');
    const states = await this.statesService.findAll();
    this.logger.log('[Back] Retornando todos los estados');
    return states;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El estado fue actualizado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Patch(':id')
  async updateState(
    @Param('id') id: string,
    @Body() updateStateDTO: UpdateStateDTO,
  ) {
    this.logger.log('[Back] State endpoint called!');
    const state = await this.statesService.updateState(id, updateStateDTO);
    this.logger.log(`[Back] Estado actualizado: ${id}`);
    return state;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El estado fue eliminado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Delete(':id')
  async deleteState(@Param('id') id: string) {
    this.logger.log('[Back] State endpoint called!');
    const state = await this.statesService.deleteState(id);
    this.logger.log(`[Back] Estado eliminado: ${id}`);
    return state;
  }
}
