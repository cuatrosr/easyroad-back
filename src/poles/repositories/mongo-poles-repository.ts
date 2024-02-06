import { HttpMongoError } from '../../utils/exceptions/http.exception';
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
    return await this.poleModel.create(createPoleDTO).catch(() => {
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

  async deletePole(id: string) {
    return await this.poleModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }
}
