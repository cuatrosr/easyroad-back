import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { TipoSolicitud } from '../../utils/enums/tipo-solicitud.enum';

export class SolicitudDTO {
  @IsUUID()
  @IsNotEmpty()
  uuid_solicitud: string;

  @IsString()
  @IsNotEmpty()
  tipo_solicitud: TipoSolicitud;

  @IsString()
  @IsNotEmpty()
  valor_solicitud: string;

  @IsString()
  @IsNotEmpty()
  serial_dispositivo: string;
}
