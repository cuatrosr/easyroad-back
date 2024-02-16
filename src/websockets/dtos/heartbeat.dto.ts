import {
  IsUUID,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

class HeartbeatJSONDTO {
  @IsString()
  @IsNotEmpty()
  serial_dispositivo: string;

  @IsString()
  @IsNotEmpty()
  voltaje_bateria: string;

  @IsString()
  @IsNotEmpty()
  voltaje_panel: string;

  @IsString()
  @IsNotEmpty()
  porcentaje_bateria: string;

  @IsNumber()
  @IsNotEmpty()
  estado_registro: number;

  @IsString()
  @IsNotEmpty()
  imei: string;

  @IsString()
  @IsNotEmpty()
  numero_sim: string;

  @IsString()
  @IsNotEmpty()
  nivel_senal: string;

  @IsString()
  @IsNotEmpty()
  operador: string;

  @IsNumber()
  @IsNotEmpty()
  tipo_tecnologia_red_movil: number;
}

export class HeartbeatDTO {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  contenido: HeartbeatJSONDTO;

  @IsString()
  @IsNotEmpty()
  tipo: string;
}
