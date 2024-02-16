import { Server, Socket } from 'socket.io';
import { HeartbeatDTO } from './dtos/heartbeat.dto';
import { Status } from '../utils/enums/status.enum';
import { PolesService } from '../poles/poles.service';
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
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@UseFilters(WsExceptionFilter)
@WebSocketGateway(81, { cors: { origin: '*' } })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly heartbeatService: HeartbeatService,
    private readonly polesService: PolesService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`[WS] Client connected: ${client.id}`);
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
  }

  private async checkIfSerialExists(serial: string) {
    if (!(await this.polesService.findBySerial(serial)))
      HttpBadRequest('Pole not found');
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`[WS] Client disconnected: ${client.id}`);
    await this.polesService.updateStateHeartbeat(
      client.id,
      Status.DISCONNECTED,
    );
    await this.polesService.updateSocketById(client.id, '');
  }
}
