import { EventoDTO } from 'src/websockets/dtos/evento.dto';
import { HttpMongoError } from '../../utils/exceptions/http.exception';
import { Event, EventModel } from '../schemas/event.schema';
import { EventRepository } from './event-repository';
import { Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export class MongoEventRepository implements EventRepository {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    @InjectModel(Event.name)
    private readonly eventModel: EventModel,
  ) {}

  async createEvento(createEventoDTO: EventoDTO) {
    return await this.eventModel.create(createEventoDTO).catch(() => {
      this.logger.error(`[Back] Error en la base de datos`);
      return HttpMongoError('Error en la base de datos');
    });
  }

  async findAll() {
    return await this.eventModel
      .find()
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }
}
