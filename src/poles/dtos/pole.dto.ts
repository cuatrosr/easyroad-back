import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreatePoleDTO {
  @IsString()
  @IsNotEmpty()
  serial: string;

  @IsMongoId()
  @IsNotEmpty()
  project: string;

  @IsMongoId()
  @IsNotEmpty()
  state: string;

  @IsString()
  fabricante: string;

  @IsString()
  modelo: string;

  @IsString()
  imei: string;

  @IsString()
  numeroSim: string;

  @IsString()
  nivelSenal: string;

  @IsString()
  registro: string;

  @IsString()
  operador: string;

  @IsString()
  bateria: string;

  @IsString()
  tamper: string;

  @IsString()
  panelSolar: string;

  @IsString()
  emergenciaSim: string;
}

export class UpdatePoleDTO extends PartialType(CreatePoleDTO) {}
