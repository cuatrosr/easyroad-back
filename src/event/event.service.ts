import { Inject, Injectable } from '@nestjs/common';
import { EventoDTO } from '../websockets/dtos/evento.dto';
import {
  EventRepository,
  EVENT_REPOSITORY,
} from './repositories/event-repository';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
  ) {}

  async createEvent(createEventDTO: EventoDTO) {
    return await this.eventRepository.createEvento(createEventDTO);
  }

  async findAllEvents() {
    return await this.eventRepository.findAllEvents();
  }

  async findAllAlerts() {
    return await this.eventRepository.findAllAlerts();
  }
}
