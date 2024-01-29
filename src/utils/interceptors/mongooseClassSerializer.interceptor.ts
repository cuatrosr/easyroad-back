import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Document, Types } from 'mongoose';
import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from '@nestjs/common';

function MongooseClassSerializerInterceptor(
  classToIntercept: Type,
): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    private changePlainObjectToClass(document: PlainLiteralObject) {
      if (!(document instanceof Document)) {
        return document;
      }
      const plainObject = document.toObject();
      const transformedObject: PlainLiteralObject = { ...plainObject };
      if (
        transformedObject._id &&
        transformedObject._id instanceof Types.ObjectId
      ) {
        transformedObject._id = transformedObject._id.toString();
      }
      const jsonString = JSON.stringify(transformedObject, (key, value) => {
        if (value instanceof Object && !(value instanceof Array)) {
          return { ...value };
        }
        return value;
      });
      return plainToClass(classToIntercept, JSON.parse(jsonString));
    }

    private prepareResponse(
      response: PlainLiteralObject | PlainLiteralObject[],
    ) {
      if (Array.isArray(response)) {
        return response.map(this.changePlainObjectToClass);
      }
      return this.changePlainObjectToClass(response);
    }

    serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ) {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
}

export default MongooseClassSerializerInterceptor;
