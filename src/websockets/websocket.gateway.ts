import { Server, Socket } from 'socket.io';
import { EventoDTO } from './dtos/evento.dto';
import { SolicitudDTO } from './dtos/solicitud.dto';
import { HeartbeatDTO } from './dtos/heartbeat.dto';
import { Status } from '../utils/enums/status.enum';
import { PolesService } from '../poles/poles.service';
import { EventService } from '../event/event.service';
import { SolicitudService } from '../solicitud/solicitud.service';
import { HeartbeatService } from '../heartbeat/heartbeat.service';
import { HttpBadRequest } from '../utils/exceptions/http.exception';
import { WsExceptionFilter } from '../utils/filters/wsException.filter';
import {
  Inject,
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { TipoNotificacion } from 'src/utils/enums/tipo-notificacion.enum';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@UseFilters(WsExceptionFilter)
@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly heartbeatService: HeartbeatService,
    private readonly eventService: EventService,
    private readonly solicitudService: SolicitudService,
    private readonly polesService: PolesService,
  ) {}

  @WebSocketServer()
  server: Server;
  wsClients: Socket[] = [];

  handleConnection(client: Socket) {
    this.logger.log(`[WS] Client connected: ${client.id}`);
    this.wsClients.push(client);
  }

  @SubscribeMessage('heartbeat')
  async handleHeartbeat(client: Socket, payload: HeartbeatDTO) {
    this.logger.log(`[WS] Heartbeat received from: ${client.id}`);
    await this.checkIfSerialExists(payload.contenido.serial_dispositivo);
    await this.polesService.updateSocket(
      payload.contenido.serial_dispositivo,
      client.id,
    );
    await this.heartbeatService.createHeartbeat(payload);
    await this.polesService.updateStateHeartbeat(client.id, Status.OK);
    this.server.emit(payload.contenido.serial_dispositivo, payload);
  }

  @SubscribeMessage('serial')
  async relateSerial(client: Socket, serial: string) {
    this.logger.log(`[WS] Serial received from: ${client.id}`);
    await this.checkIfSerialExists(serial);
    client.join(serial);
  }

  private async checkIfSerialExists(serial: string) {
    if (!(await this.polesService.findBySerial(serial)))
      HttpBadRequest('Pole not found');
  }

  @SubscribeMessage('evento')
  async handleEvent(client: Socket, payload: EventoDTO) {
    this.logger.log(`[WS] Evento received from: ${client.id}`);
    await this.checkIfSerialExists(payload.serial_dispositivo);
    await this.polesService.updateSocket(payload.serial_dispositivo, client.id);
    await this.eventService.createEvent(payload);
    const status =
      payload.tipo_notificacion === TipoNotificacion.ALERTA
        ? Status.ALERT
        : Status.OK;
    await this.polesService.updateStateHeartbeat(client.id, status);
    if (payload.tipo_notificacion === TipoNotificacion.ALERTA)
      this.server.emit(`alert`, payload);
  }

  @SubscribeMessage('solicitud')
  async handleSolicitud(_client: Socket, payload: SolicitudDTO) {
    this.logger.log('[WS] Solicitud received from server');
    await this.checkIfSerialExists(payload.serial_dispositivo);
    const pole = await this.polesService.findBySerial(
      payload.serial_dispositivo,
    );
    await this.solicitudService.createSolicitud(payload);
    this.wsClients
      .filter((c) => c.id === pole!.socket)
      .forEach((c) => {
        c.emit('solicitud', payload);
      });
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`[WS] Client disconnected: ${client.id}`);
    await this.polesService.updateStateHeartbeat(
      client.id,
      Status.DISCONNECTED,
    );
    await this.polesService.updateSocketById(client.id, '');
    const index = this.wsClients.findIndex((c) => c.id === client.id);
    if (index !== -1) {
      this.wsClients.splice(index, 1);
    }
  }
}
