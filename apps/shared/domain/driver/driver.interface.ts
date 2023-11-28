import type { IRepository } from '../domain.interface.js';
import type { Driver } from './index.js';

export interface IDriverRepository extends IRepository<Driver> {
  findByEmail(email: string): Promise<Driver>;
  // ...other driver repository methods
}

export interface IDriverService {
  getAll(): Promise<Driver[]>;
  findByEmail(email: string): Promise<Driver>;
  authenticate(email: string, password: string): Promise<Driver>;
  create(driver: Driver): Promise<Driver>;
}
