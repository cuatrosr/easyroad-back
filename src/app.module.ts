import { GatewayModule } from './websockets/websocket.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import configuration from './config/enviroment.config';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

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
    HealthModule,
    LoggerModule,
    GatewayModule,
    ProjectsModule,
  ],
})
export class AppModule {}
