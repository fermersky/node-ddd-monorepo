import type { Knex } from 'knex';

import { type Driver, DriverDoesNotExistError, type IDriverRepository } from '@domain/driver/index.js';

import { type IDriverQueryResult, mapDriverToDomain, mapDriversWorkShiftsToDomain } from './types.js';

export class KnexDriverRepository implements IDriverRepository {
  constructor(private client: Knex) {}

  async getAll() {
    const result = await this.client<IDriverQueryResult>('drivers').select('*');

    return result.map(mapDriverToDomain);
  }

  async getById(id: string) {
    const result = await this.client<IDriverQueryResult>('drivers').where({ id });

    if (result == null || result.length === 0) {
      throw new DriverDoesNotExistError(id);
    }

    return mapDriverToDomain(result[0]);
  }

  async create(driver: Driver) {
    const result = await this.client('drivers').insert(
      {
        id: driver.id,
        email: driver.email,
        password: driver.password,
        first_name: driver.firstName,
        last_name: driver.lastName,
        phone: driver.phone,
      },
      '*',
    );

    return result[0] as Driver;
  }

  async findByEmail(email: string) {
    const result = await this.client('drivers')
      .leftJoin('work_shifts', 'drivers.id', 'work_shifts.driver_id')
      .select(
        'drivers.id as id',
        'phone',
        'first_name',
        'last_name',
        'email',
        'password',
        'work_shifts.id as work_shift_id',
        'start',
        'end',
      )
      .where({ email });

    if (result == null || result.length === 0) {
      throw new DriverDoesNotExistError(email);
    }

    return mapDriversWorkShiftsToDomain(result)[0];
  }
}
