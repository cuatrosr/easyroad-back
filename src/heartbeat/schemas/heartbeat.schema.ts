import { Transform } from 'class-transformer';
import mongoose, { Types, Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TipoEvento } from '../../utils/enums/tipo-evento.enum';

export class HeartbeatJSON {
  @Prop({ required: true })
  serial_dispositivo: string;

  @Prop({ required: true })
  voltaje_bateria: string;

  @Prop({ required: true })
  voltaje_panel: string;

  @Prop({ required: true })
  porcentaje_bateria: string;

  @Prop({ required: true })
  estado_registro: number;

  @Prop({ required: true })
  imei: string;

  @Prop({ required: true })
  numero_sim: string;

  @Prop({ required: true })
  nivel_senal: string;

  @Prop({ required: true })
  operador: string;

  @Prop({ required: true })
  tipo_tecnologia_red_movil: number;
}

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Heartbeat {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  fecha: Date;

  @Prop({ required: true, type: HeartbeatJSON })
  contenido: HeartbeatJSON;

  @Prop({ required: true })
  tipo: TipoEvento;

  @Prop({
    default: () => new Date(Date.now() - 5 * 60 * 60 * 1000), // GMT-5 timezone
  })
  created: Date;

  @Prop({
    default: () => new Date(Date.now() - 5 * 60 * 60 * 1000), // GMT-5 timezone
  })
  updated: Date;
}

export const HeartbeatSchema = SchemaFactory.createForClass(Heartbeat);
export type HeartbeatDocument = Heartbeat & Document;
export type HeartbeatModel = Model<Heartbeat>;
