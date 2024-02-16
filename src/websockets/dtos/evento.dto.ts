import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { TipoEvento } from '../../utils/enums/tipo-evento.enum';

export class EventoDTO {
  @IsUUID()
  @IsNotEmpty()
  uuid_evento: string;

  @IsString()
  @IsNotEmpty()
  tipo_evento: TipoEvento;

  @IsString()
  @IsNotEmpty()
  estado_evento: string;

  @IsString()
  @IsNotEmpty()
  serial_dispositivo: string;
}
