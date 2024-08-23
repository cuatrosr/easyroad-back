import {
  HttpBadRequest,
  HttpMongoError,
} from '../../utils/exceptions/http.exception';
import { CreatePoleDTO, UpdatePoleDTO } from '../dtos/pole.dto';
import { Pole, PoleModel } from '../schemas/pole.schema';
import { PolesRepository } from './poles-repository';
import { Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export class MongoPolesRepository implements PolesRepository {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    @InjectModel(Pole.name)
    private readonly poleModel: PoleModel,
  ) {}

  async createPole(createPoleDTO: CreatePoleDTO) {
    return await this.poleModel.create(createPoleDTO).catch((error) => {
      if (error.code === 11000) {
        if (error.message.includes('serial')) {
          this.logger.warn('[Back] El Serial del poste ya existe');
          return HttpBadRequest('El serial ya existe');
        } else if (error.message.includes('name')) {
          this.logger.warn('[Back] El Nombre del poste ya existe');
          return HttpBadRequest('El name ya existe');
        }
      }
      this.logger.error(`[Back] Error en la base de datos`);
      return HttpMongoError('Error en la base de datos');
    });
  }

  async findAll() {
    return await this.poleModel
      .find({ isActive: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findById(id: string) {
    return await this.poleModel
      .findById(id)
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findByProject(project: string) {
    return await this.poleModel
      .find({ project, isActive: true })
      .sort({ created: -1 })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findBySerial(serial: string) {
    return await this.poleModel
      .findOne({ serial, isActive: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findBySocket(socket: string) {
    return await this.poleModel
      .findOne({ socket, isActive: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async updatePole(id: string, updatePoleDTO: UpdatePoleDTO) {
    return await this.poleModel
      .findByIdAndUpdate(id, updatePoleDTO, {
        new: true,
      })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async updateStateHeartbeat(socket: string, state: string) {
    return await this.poleModel
      .findOneAndUpdate({ socket }, { state }, { new: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async updateSocket(serial: string, socket: string) {
    return await this.poleModel
      .findOneAndUpdate({ serial }, { socket }, { new: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async updateSocketById(id: string, socket: string) {
    return await this.poleModel
      .findOneAndUpdate({ socket: id }, { socket }, { new: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async deletePoles(ids: string[]) {
    return await this.poleModel
      .updateMany({ _id: { $in: ids } }, { isActive: false })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async deletePole(id: string) {
    return await this.poleModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec()
      .catch((e) => {
        this.logger.error(`error: ${e}`);
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }
}
