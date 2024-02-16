import { Transform } from 'class-transformer';
import { Types, Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TipoEvento } from '../../utils/enums/tipo-evento.enum';

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
}

export const EventSchema = SchemaFactory.createForClass(Event);
export type EventDocument = Event & Document;
export type EventModel = Model<Event>;
