import { HttpMongoError } from '../../utils/exceptions/http.exception';
import { CreateStateDTO, UpdateStateDTO } from '../dtos/state.dto';
import { State, StateModel } from '../schemas/state.schema';
import { StatesRepository } from './states-repository';
import { Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export class MongoStatesRepository implements StatesRepository {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    @InjectModel(State.name)
    private readonly stateModel: StateModel,
  ) {}

  async createState(createStateDTO: CreateStateDTO) {
    return await this.stateModel.create(createStateDTO).catch(() => {
      this.logger.error(`[Back] Error en la base de datos`);
      return HttpMongoError('Error en la base de datos');
    });
  }

  async findAll() {
    return await this.stateModel
      .find({ isActive: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async findById(id: string) {
    return await this.stateModel
      .findById(id)
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async updateState(id: string, updateStateDTO: UpdateStateDTO) {
    return await this.stateModel
      .findByIdAndUpdate(id, updateStateDTO, {
        new: true,
      })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }

  async deleteState(id: string) {
    return await this.stateModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec()
      .catch(() => {
        this.logger.error(`[Back] Error en la base de datos`);
        return HttpMongoError('Error en la base de datos');
      });
  }
}
