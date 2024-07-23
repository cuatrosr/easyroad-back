import { Event } from '../schemas/event.schema';
import { EventoDTO } from '../../websockets/dtos/evento.dto';

export const EVENT_REPOSITORY = 'EventRepository';

export interface EventRepository {
  createEvento(createEventDTO: EventoDTO): Promise<Event>;
  findAllEvents(): Promise<Event[]>;
  findAllAlerts(): Promise<Event[]>;
}
