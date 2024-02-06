import { Project } from '../../projects/schemas/project.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, Model, SchemaTypes } from 'mongoose';
import { State } from '../../states/schemas/state.schema';
import { Exclude, Transform } from 'class-transformer';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Pole {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  serial: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: Project.name, required: true })
  @Transform(({ value }) => value.toString())
  project: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: State.name, required: true })
  @Transform(({ value }) => value.toString())
  state: Types.ObjectId;

  @Prop()
  fabricante: string;

  @Prop()
  modelo: string;

  @Prop()
  imei: string;

  @Prop()
  numeroSim: string;

  @Prop()
  nivelSenal: string;

  @Prop()
  registro: string;

  @Prop()
  operador: string;

  @Prop()
  bateria: string;

  @Prop()
  tamper: string;

  @Prop()
  panelSolar: string;

  @Prop()
  emergenciaSim: string;
}

export const PoleSchema = SchemaFactory.createForClass(Pole);
export type PoleDocument = Pole & Document;
export type PoleModel = Model<Pole>;
