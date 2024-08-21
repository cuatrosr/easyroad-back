import { obtenerMensajeEstado } from 'src/utils/enums/tipo-evento.enum';
import { Controller, HttpCode, Logger, Inject, Get } from '@nestjs/common';
import { EventService } from './event.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
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
  async findAllEvents() {
    this.logger.log('[Back] Event endpoint called!');
    let events = await this.eventService.findAllEvents();
    events = events.map((event) => {
      return {
        ...event,
        estado_evento: obtenerMensajeEstado(
          event.tipo_evento,
          event.estado_evento,
        ),
      };
    });
    this.logger.log('[Back] Retornando todos los eventos');
    return events;
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Todas las alertas fueron encontradas exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get('alerts')
  async findAllAlerts() {
    this.logger.log('[Back] Alert endpoint called!');
    let alerts = await this.eventService.findAllAlerts();
    alerts = alerts.map((alert) => {
      return {
        ...alert,
        estado_evento: obtenerMensajeEstado(
          alert.tipo_evento,
          alert.estado_evento,
        ),
      };
    });
    this.logger.log('[Back] Retornando todas las alertas');
    return alerts;
  }
}
