import { Transform } from 'class-transformer';
import { Types, Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TipoEvento } from '../../utils/enums/tipo-evento.enum';
import { TipoNotificacion } from '../../utils/enums/tipo-notificacion.enum';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Event {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  uuid_evento: string;

  @Prop({ required: true, type: String, enum: TipoEvento })
  tipo_evento: TipoEvento;

  @Prop({ required: true })
  estado_evento: string;

  @Prop({ required: true })
  serial_dispositivo: string;

  @Prop({ required: true, type: String, enum: TipoNotificacion })
  tipo_notificacion: TipoNotificacion;

  @Prop({
    default: () => new Date(Date.now() - 5 * 60 * 60 * 1000), // GMT-5 timezone
  })
  created: Date;

  @Prop({
    default: () => new Date(Date.now() - 5 * 60 * 60 * 1000), // GMT-5 timezone
  })
  updated: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
export type EventDocument = Event & Document;
export type EventModel = Model<Event>;
