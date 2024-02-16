import { HeartbeatModule } from '../heartbeat/heartbeat.module';
import { WebsocketGateway } from './websocket.gateway';
import { PolesModule } from '../poles/poles.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HeartbeatModule, PolesModule],
  providers: [WebsocketGateway],
})
export class GatewayModule {}
