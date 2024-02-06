import { CreateStateDTO, UpdateStateDTO } from './dtos/state.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  STATES_REPOSITORY,
  StatesRepository,
} from './repositories/states-repository';

@Injectable()
export class StatesService {
  constructor(
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: StatesRepository,
  ) {}

  async createState(createStateDTO: CreateStateDTO) {
    return await this.statesRepository.createState(createStateDTO);
  }

  async findAll() {
    return await this.statesRepository.findAll();
  }

  async findById(id: string) {
    return await this.statesRepository.findById(id);
  }

  async updateState(id: string, updateStateDTO: UpdateStateDTO) {
    return await this.statesRepository.updateState(id, updateStateDTO);
  }

  async deleteState(id: string) {
    return await this.statesRepository.deleteState(id);
  }
}
