import { Module } from '@nestjs/common';
import { PolesModule } from '../poles/poles.module';
import { EventModule } from '../event/event.module';
import { WebsocketGateway } from './websocket.gateway';
import { HeartbeatModule } from '../heartbeat/heartbeat.module';
import { SolicitudModule } from '../solicitud/solicitud.module';

@Module({
  imports: [HeartbeatModule, EventModule, SolicitudModule, PolesModule],
  providers: [WebsocketGateway],
})
export class GatewayModule {}
