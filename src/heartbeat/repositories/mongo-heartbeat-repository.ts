import { Heartbeat, HeartbeatModel } from '../schemas/heartbeat.schema';
import { HttpMongoError } from '../../utils/exceptions/http.exception';
import { HeartbeatDTO } from '../../websockets/dtos/heartbeat.dto';
import { HeartbeatRepository } from './heartbeat-repository';
import { Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export class MongoHeartbeatRepository implements HeartbeatRepository {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    @InjectModel(Heartbeat.name)
    private readonly heartbeatModel: HeartbeatModel,
  ) {}

  async createHeartbeat(createHeartbeatDTO: HeartbeatDTO) {
    return await this.heartbeatModel.create(createHeartbeatDTO).catch(() => {
      this.logger.error(`[Back] Error en la base de datos`);
      return HttpMongoError('Error en la base de datos');
    });
  }

  async findAll() {
    return await this.heartbeatModel
      .find()
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findBySerial(serial: string) {
    const documents = await this.heartbeatModel
      .find({ 'contenido.serial_dispositivo': serial })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
    const sortedDocuments = documents.sort(
      (a: any, b: any) => b.created - a.created,
    );
    return sortedDocuments.length > 0 ? sortedDocuments[0] : null;
  }
}
