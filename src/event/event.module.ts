import { MongoEventRepository } from './repositories/mongo-event-repository';
import { EVENT_REPOSITORY } from './repositories/event-repository';
import { Event, EventSchema } from './schemas/event.schema';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './event.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [EventController],
  providers: [
    EventService,
    {
      provide: EVENT_REPOSITORY,
      useClass: MongoEventRepository,
    },
  ],
  exports: [EventService],
})
export class EventModule {}
