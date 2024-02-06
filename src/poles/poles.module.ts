import { MongoPolesRepository } from './repositories/mongo-poles-repository';
import { POLES_REPOSITORY } from './repositories/poles-repository';
import { Pole, PoleSchema } from './schemas/pole.schema';
import { PolesController } from './poles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PolesService } from './poles.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pole.name,
        schema: PoleSchema,
      },
    ]),
  ],
  controllers: [PolesController],
  providers: [
    PolesService,
    {
      provide: POLES_REPOSITORY,
      useClass: MongoPolesRepository,
    },
  ],
})
export class PolesModule {}
