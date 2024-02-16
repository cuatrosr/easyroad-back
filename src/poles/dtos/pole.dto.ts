import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreatePoleDTO {
  @IsString()
  @IsNotEmpty()
  serial: string;

  @IsMongoId()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsOptional()
  state: string;
}

export class UpdatePoleDTO extends PartialType(CreatePoleDTO) {}
