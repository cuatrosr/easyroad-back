import { HeartbeatDTO } from '../../websockets/dtos/heartbeat.dto';
import { Heartbeat } from '../schemas/heartbeat.schema';

export const HEARTBEAT_REPOSITORY = 'HeartbeatRepository';

export interface HeartbeatRepository {
  createHeartbeat(createHeartbeatDTO: HeartbeatDTO): Promise<Heartbeat>;
  findAll(): Promise<Heartbeat[]>;
  findBySerial(serial: string): Promise<Heartbeat | null>;
}
