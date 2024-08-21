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
    const events = await this.eventService.findAllEvents();
    this.logger.log('[Back] Retornando todos los eventos');
    return events.map((event) => {
      const eventDTO: any = {};
      eventDTO.created = event.created;
      eventDTO.uuid_evento = event.uuid_evento;
      eventDTO.tipo_evento = event.tipo_evento;
      eventDTO.estado_evento = obtenerMensajeEstado(
        event.tipo_evento,
        event.estado_evento,
      );
      eventDTO.serial_dispositivo = event.serial_dispositivo;
      eventDTO.tipo_notificacion = event.tipo_notificacion;
      return eventDTO;
    });
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
    const alerts = await this.eventService.findAllAlerts();
    this.logger.log('[Back] Retornando todas las alertas');
    return alerts.map((alerta) => {
      const alertaDTO: any = {};
      alertaDTO.created = alerta.created;
      alertaDTO.uuid_evento = alerta.uuid_evento;
      alertaDTO.tipo_evento = alerta.tipo_evento;
      alertaDTO.estado_evento = obtenerMensajeEstado(
        alerta.tipo_evento,
        alerta.estado_evento,
      );
      alertaDTO.serial_dispositivo = alerta.serial_dispositivo;
      alertaDTO.tipo_notificacion = alerta.tipo_notificacion;
      return alertaDTO;
    });
  }
}
