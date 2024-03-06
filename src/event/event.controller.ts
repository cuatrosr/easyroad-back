import MongooseClassSerializerInterceptor from '../utils/interceptors/mongooseClassSerializer.interceptor';
import { Event } from './schemas/event.schema';
import { EventService } from './event.service';
import {
  UseInterceptors,
  Controller,
  HttpCode,
  Logger,
  Inject,
  Get,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
@UseInterceptors(MongooseClassSerializerInterceptor(Event))
export class EventController {
  constructor(
    private readonly eventService: EventService,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Todos los eventos fueron encontrados exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get()
  async findAll() {
    this.logger.log('[Back] Event endpoint called!');
    const events = await this.eventService.findAll();
    this.logger.log('[Back] Retornando todos los eventos');
    return events;
  }
}
