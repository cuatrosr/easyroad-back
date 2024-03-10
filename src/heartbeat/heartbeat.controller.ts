import { HeartbeatService } from './heartbeat.service';
import {
  Controller,
  HttpCode,
  Logger,
  Inject,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Heartbeat')
@Controller('heartbeat')
export class HeartbeatController {
  constructor(
    private readonly heartbeatService: HeartbeatService,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @HttpCode(200)
  @ApiOkResponse({
    description: 'El heartbeat fue encontrado exitosamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error en la base de datos',
  })
  @Get(':serial')
  async findBySerial(@Param('serial') serial: string) {
    this.logger.log('[Back] Heartbeat endpoint called!');
    const heartbeat = await this.heartbeatService.findBySerial(serial);
    this.logger.log(
      `[Back] Retornando el ultimo heartbeat del serial: ${serial}`,
    );
    return heartbeat;
  }
}
