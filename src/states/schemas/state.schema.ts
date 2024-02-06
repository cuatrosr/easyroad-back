import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Model, Types } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class State {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;
}

export const StateSchema = SchemaFactory.createForClass(State);
export type StateDocument = State & Document;
export type StateModel = Model<State>;
