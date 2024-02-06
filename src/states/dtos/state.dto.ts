import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateStateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateStateDTO extends PartialType(CreateStateDTO) {}
