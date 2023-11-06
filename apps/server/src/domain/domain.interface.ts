import type { IDriverRepository } from './driver/index.js';

export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(obj: T): Promise<any>;
  // ...other generic repository methods
}

export interface IKnexDbContext {
  driverRepository: IDriverRepository;
}

export interface IDbContext {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;

  withinTransaction<F extends (...params: Parameters<F>) => ReturnType<F>>(
    cb: F,
    ...params: Parameters<F>
  ): Promise<ReturnType<F>>;

  beginTransaction<T>(cb: (session: IDbContext) => Promise<T>): Promise<T>;

  // driverRepository: IDriverRepository;
}
