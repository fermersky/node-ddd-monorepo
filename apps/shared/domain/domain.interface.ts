import type { IDriverRepository } from './driver/driver.interface.js';

export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(obj: T): Promise<T>;
  // ...other generic repository methods
}

export interface IDbContext {
  driverRepository: IDriverRepository;
}
