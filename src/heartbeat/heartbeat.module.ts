import { MongoHeartbeatRepository } from './repositories/mongo-heartbeat-repository';
import { HEARTBEAT_REPOSITORY } from './repositories/heartbeat-repository';
import { Heartbeat, HeartbeatSchema } from './schemas/heartbeat.schema';
import { HeartbeatController } from './heartbeat.controller';
import { HeartbeatService } from './heartbeat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Heartbeat.name,
        schema: HeartbeatSchema,
      },
    ]),
  ],
  controllers: [HeartbeatController],
  providers: [
    HeartbeatService,
    {
      provide: HEARTBEAT_REPOSITORY,
      useClass: MongoHeartbeatRepository,
    },
  ],
  exports: [HeartbeatService],
})
export class HeartbeatModule {}
