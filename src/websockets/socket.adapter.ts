import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';

export class SocketAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }
  createIOServer(port: number, options?: ServerOptions) {
    port = this.configService.get<number>('WEBSOCKET_PORT', 3001);
    const origins = this.configService.get<string>(
      'WEBSOCKET_CORS_ORIGIN',
      '*',
    );
    const origin = origins.split(',');
    options!.cors = { origin };
    const server = super.createIOServer(port, options);
    return server;
  }
}
