import { MongoEventRepository } from './repositories/mongo-event-repository';
import { EVENT_REPOSITORY } from './repositories/event-repository';
import { Event, EventSchema } from './schemas/event.schema';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
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
