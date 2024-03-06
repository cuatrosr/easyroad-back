import { Project } from '../../projects/schemas/project.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, Model, SchemaTypes } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Status } from '../../utils/enums/status.enum';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Pole {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  serial: string;

  @Prop({ required: true })
  fabricante: string;

  @Prop({ required: true })
  modelo: string;

  @Prop()
  socket: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: Project.name, required: true })
  @Transform(({ value }) => value.toString())
  project: Types.ObjectId;

  @Prop({ type: String, enum: Status, default: Status.DISCONNECTED })
  state: Status;
}

export const PoleSchema = SchemaFactory.createForClass(Pole);
export type PoleDocument = Pole & Document;
export type PoleModel = Model<Pole>;
