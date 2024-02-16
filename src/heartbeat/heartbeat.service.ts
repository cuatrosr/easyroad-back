import { HeartbeatDTO } from '../websockets/dtos/heartbeat.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  HEARTBEAT_REPOSITORY,
  HeartbeatRepository,
} from './repositories/heartbeat-repository';

@Injectable()
export class HeartbeatService {
  constructor(
    @Inject(HEARTBEAT_REPOSITORY)
    private readonly heartbeatRepository: HeartbeatRepository,
  ) {}

  async createHeartbeat(createHeartbeatDTO: HeartbeatDTO) {
    return await this.heartbeatRepository.createHeartbeat(createHeartbeatDTO);
  }

  async findAll() {
    return await this.heartbeatRepository.findAll();
  }
}
