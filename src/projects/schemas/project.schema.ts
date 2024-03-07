import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Types, Document, Model } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Project {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;

  @Prop({
    default: () => new Date(Date.now() - 5 * 60 * 60 * 1000), // GMT-5 timezone
  })
  created: Date;

  @Prop({
    default: () => new Date(Date.now() - 5 * 60 * 60 * 1000), // GMT-5 timezone
  })
  updated: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
export type ProjectDocument = Project & Document;
export type ProjectModel = Model<Project>;
