import { MongoStatesRepository } from './repositories/mongo-states-repository';
import { STATES_REPOSITORY } from './repositories/states-repository';
import { State, StateSchema } from './schemas/state.schema';
import { StatesController } from './states.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { StatesService } from './states.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: State.name,
        schema: StateSchema,
      },
    ]),
  ],
  controllers: [StatesController],
  providers: [
    StatesService,
    {
      provide: STATES_REPOSITORY,
      useClass: MongoStatesRepository,
    },
  ],
})
export class StatesModule {}
