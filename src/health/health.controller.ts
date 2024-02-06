import { Controller, Get, HttpCode, Inject, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Health endpoint check',
  })
  run() {
    this.logger.log('[Back] Health endpoint called!');
    return { status: 'ok' };
  }
}
