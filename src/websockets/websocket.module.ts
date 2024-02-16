import { HeartbeatModule } from '../heartbeat/heartbeat.module';
import { WebsocketGateway } from './websocket.gateway';
import { PolesModule } from '../poles/poles.module';
import { EventModule } from '../event/event.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HeartbeatModule, EventModule, PolesModule],
  providers: [WebsocketGateway],
})
export class GatewayModule {}
