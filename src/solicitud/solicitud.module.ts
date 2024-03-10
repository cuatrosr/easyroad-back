import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudService } from './solicitud.service';
import { Solicitud, SolicitudSchema } from './schemas/solicitud.schema';
import { SOLICITUD_REPOSITORY } from './repositories/solicitud-repository';
import { MongoSolicitudRepository } from './repositories/mongo-solicitud-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Solicitud.name,
        schema: SolicitudSchema,
      },
    ]),
  ],
  providers: [
    SolicitudService,
    {
      provide: SOLICITUD_REPOSITORY,
      useClass: MongoSolicitudRepository,
    },
  ],
  exports: [SolicitudService],
})
export class SolicitudModule {}
