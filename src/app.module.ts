import { GatewayModule } from './websockets/websocket.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import configuration from './config/enviroment.config';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { StatesModule } from './states/states.module';
import { PolesModule } from './poles/poles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: `${config.get('database.host')}`,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    HealthModule,
    LoggerModule,
    GatewayModule,
    ProjectsModule,
    StatesModule,
    PolesModule,
  ],
})
export class AppModule {}
