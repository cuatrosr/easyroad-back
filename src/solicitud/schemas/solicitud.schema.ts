import { Transform } from 'class-transformer';
import { Types, Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TipoSolicitud } from '../../utils/enums/tipo-solicitud.enum';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Solicitud {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  uuid_solicitud: string;

  @Prop({ required: true, type: String, enum: TipoSolicitud })
  tipo_solicitud: TipoSolicitud;

  @Prop({ required: true })
  valor_solicitud: string;

  @Prop({ required: true })
  serial_dispositivo: string;

  @Prop({
    default: () => new Date(Date.now() - 5 * 60 * 60 * 1000), // GMT-5 timezone
  })
  created: Date;

  @Prop({
    default: () => new Date(Date.now() - 5 * 60 * 60 * 1000), // GMT-5 timezone
  })
  updated: Date;
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
export type SolicitudDocument = Solicitud & Document;
export type SolicitudModel = Model<Solicitud>;
