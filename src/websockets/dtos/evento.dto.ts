import {
  IsUUID,
  IsString,
  IsNotEmpty,
  Validate,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';
import {
  EstadoPorTipoEvento,
  TipoEvento,
} from '../../utils/enums/tipo-evento.enum';

@ValidatorConstraint({ name: 'EstadoPorTipoEvento', async: false })
class EstadoPorTipoEventoConstraint implements ValidatorConstraintInterface {
  validate(estado_evento: string, args: ValidationArguments): boolean {
    const evento = args.object as EventoDTO;

    // Si el tipo de evento es BATERIA_BAJA, permitimos cualquier valor
    if (evento.tipo_evento === TipoEvento.BATERIA_BAJA) {
      return true; // Cualquier valor es válido para BATERIA_BAJA
    }

    // Para otros tipos de eventos, validamos según el mapeo
    const estadosPermitidos = EstadoPorTipoEvento[evento.tipo_evento];
    return estadosPermitidos
      ? Object.values(estadosPermitidos).includes(estado_evento)
      : false;
  }

  defaultMessage(args: ValidationArguments) {
    const evento = args.object as EventoDTO;

    if (evento.tipo_evento === TipoEvento.BATERIA_BAJA) {
      return `El estado "${evento.estado_evento}" es válido para BATERIA_BAJA, pero algo salió mal.`;
    }

    return `El estado "${evento.estado_evento}" no es válido para el tipo de evento "${evento.tipo_evento}".`;
  }
}

export class EventoDTO {
  @IsUUID()
  @IsNotEmpty()
  uuid_evento: string;

  @IsString()
  @IsNotEmpty()
  tipo_evento: TipoEvento;

  @IsString()
  @IsNotEmpty()
  @Validate(EstadoPorTipoEventoConstraint)
  estado_evento: string;

  @IsString()
  @IsNotEmpty()
  serial_dispositivo: string;

  @IsString()
  @IsNotEmpty()
  tipo_notificacion: string;
}
