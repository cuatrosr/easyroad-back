import { InjectModel } from '@nestjs/mongoose';
import { Inject, Logger } from '@nestjs/common';
import { SolicitudRepository } from './solicitud-repository';
import { SolicitudDTO } from '../../websockets/dtos/solicitud.dto';
import { HttpMongoError } from '../../utils/exceptions/http.exception';
import { Solicitud, SolicitudModel } from '../schemas/solicitud.schema';

export class MongoSolicitudRepository implements SolicitudRepository {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    @InjectModel(Solicitud.name)
    private readonly solicitudModel: SolicitudModel,
  ) {}

  async createSolicitud(createSolicitudDTO: SolicitudDTO) {
    return await this.solicitudModel.create(createSolicitudDTO).catch(() => {
      this.logger.error(`[Back] Error en la base de datos`);
      return HttpMongoError('Error en la base de datos');
    });
  }
}
