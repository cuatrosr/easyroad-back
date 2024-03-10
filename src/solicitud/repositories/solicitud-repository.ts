import { Solicitud } from '../schemas/solicitud.schema';
import { SolicitudDTO } from '../../websockets/dtos/solicitud.dto';

export const SOLICITUD_REPOSITORY = 'SolicitudRepository';

export interface SolicitudRepository {
  createSolicitud(createSolicitudDTO: SolicitudDTO): Promise<Solicitud>;
}
