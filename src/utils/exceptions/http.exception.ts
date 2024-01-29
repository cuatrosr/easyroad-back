import { HttpException, HttpStatus } from '@nestjs/common';

export const HttpNotFound = (name: string) => {
  throw new HttpException(`NotFound: ${name}`, HttpStatus.NOT_FOUND);
};

export const HttpBadRequest = (name: string) => {
  throw new HttpException(`BadRequest: ${name}`, HttpStatus.BAD_REQUEST);
};

export const HttpMongoError = (name: string) => {
  throw new HttpException(
    `MongoServerError: ${name}`,
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};

export const HttpUnauthorized = (name: string) => {
  throw new HttpException(`Unauthorized: ${name}`, HttpStatus.UNAUTHORIZED);
};
