import { Socket } from 'socket.io';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import {
  Catch,
  Inject,
  Logger,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(WsException, HttpException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: Logger) {
    super();
  }

  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient() as Socket;
    const data = host.switchToWs().getData();
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    const details = error instanceof Object ? { ...error } : { message: error };
    this.logger.error(`[WS] Error on client request: ${client.id}`);
    client.emit('error', {
      uuid: data.uuid,
      ...details,
    });
  }
}
