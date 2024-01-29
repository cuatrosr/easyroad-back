import { WebsocketGateway } from './websocket.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [WebsocketGateway],
})
export class GatewayModule {}
