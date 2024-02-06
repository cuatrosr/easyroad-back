import { CreateStateDTO, UpdateStateDTO } from '../dtos/state.dto';
import { State } from '../schemas/state.schema';

export const STATES_REPOSITORY = 'StatesRepository';

export interface StatesRepository {
  createState(createStateDTO: CreateStateDTO): Promise<State>;
  findAll(): Promise<State[]>;
  findById(id: string): Promise<State | null>;
  updateState(id: string, updatePoleDTO: UpdateStateDTO): Promise<State | null>;
  deleteState(id: string): Promise<State | null>;
}
