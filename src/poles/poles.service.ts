import { CreatePoleDTO, UpdatePoleDTO } from './dtos/pole.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  POLES_REPOSITORY,
  PolesRepository,
} from './repositories/poles-repository';

@Injectable()
export class PolesService {
  constructor(
    @Inject(POLES_REPOSITORY)
    private readonly polesRepository: PolesRepository,
  ) {}

  async createPole(createPoleDTO: CreatePoleDTO) {
    return await this.polesRepository.createPole(createPoleDTO);
  }

  async findAll() {
    return await this.polesRepository.findAll();
  }

  async findById(id: string) {
    return await this.polesRepository.findById(id);
  }

  async updatePole(id: string, updatePoleDTO: UpdatePoleDTO) {
    return await this.polesRepository.updatePole(id, updatePoleDTO);
  }

  async deletePole(id: string) {
    return await this.polesRepository.deletePole(id);
  }
}
