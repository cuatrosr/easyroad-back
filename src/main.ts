import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './utils/filters/httpException.filter';
import { SocketAdapter } from './websockets/socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(app.get(Logger)));
  app.useWebSocketAdapter(new SocketAdapter(app, configService));

  const config = new DocumentBuilder()
    .setTitle('Easy Road Back')
    .setDescription('The Easy Road FTS API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<string>('PORT', '3000');
  await app.listen(port);

  const logger = app.get(Logger);
  const wsPort = configService.get<number>('WEBSOCKET_PORT', 3001);
  logger.log(`[Back] App is ready and listening on port ${port} 🚀`);
  logger.log(`[WS] WebSocket is ready and listening on port ${wsPort} 🚀`);
}
bootstrap();
