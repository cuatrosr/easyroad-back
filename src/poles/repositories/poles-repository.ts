import { CreatePoleDTO, UpdatePoleDTO } from '../dtos/pole.dto';
import { Pole } from '../schemas/pole.schema';

export const POLES_REPOSITORY = 'PolesRepository';

export interface PolesRepository {
  createPole(createPoleDTO: CreatePoleDTO): Promise<Pole>;
  findAll(): Promise<Pole[]>;
  findById(id: string): Promise<Pole | null>;
  findByProject(project: string): Promise<Pole[] | null>;
  findBySerial(serial: string): Promise<Pole | null>;
  findBySocket(socket: string): Promise<Pole | null>;
  updatePole(id: string, updatePoleDTO: UpdatePoleDTO): Promise<Pole | null>;
  updateSocket(serial: string, socket: string): Promise<Pole | null>;
  updateSocketById(id: string, socket: string): Promise<Pole | null>;
  updateStateHeartbeat(socket: string, state: string): Promise<Pole | null>;
  deletePole(id: string): Promise<Pole | null>;
}
