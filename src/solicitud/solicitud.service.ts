import { Inject, Injectable } from '@nestjs/common';
import { SolicitudDTO } from '../websockets/dtos/solicitud.dto';
import {
  SolicitudRepository,
  SOLICITUD_REPOSITORY,
} from './repositories/solicitud-repository';

@Injectable()
export class SolicitudService {
  constructor(
    @Inject(SOLICITUD_REPOSITORY)
    private readonly solicitudRepository: SolicitudRepository,
  ) {}

  async createSolicitud(createSolicitudDTO: SolicitudDTO) {
    return await this.solicitudRepository.createSolicitud(createSolicitudDTO);
  }
}
