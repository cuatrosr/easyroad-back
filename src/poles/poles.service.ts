import { CreatePoleDTO, UpdatePoleDTO } from './dtos/pole.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Status } from '../utils/enums/status.enum';
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

  async findBySerial(serial: string) {
    return await this.polesRepository.findBySerial(serial);
  }

  async findBySocket(socket: string) {
    return await this.polesRepository.findBySocket(socket);
  }

  async updatePole(id: string, updatePoleDTO: UpdatePoleDTO) {
    return await this.polesRepository.updatePole(id, updatePoleDTO);
  }

  async updateStateHeartbeat(socket: string, newState: string) {
    const current = await this.findBySocket(socket);
    const state =
      newState === Status.DISCONNECTED
        ? newState
        : current!.state === Status.ALERT
          ? Status.ALERT
          : newState;
    return await this.polesRepository.updateStateHeartbeat(socket, state);
  }

  async updateSocket(serial: string, socket: string) {
    return await this.polesRepository.updateSocket(serial, socket);
  }

  async updateSocketById(id: string, socket: string) {
    return await this.polesRepository.updateSocketById(id, socket);
  }

  async deletePole(id: string) {
    return await this.polesRepository.deletePole(id);
  }
}
