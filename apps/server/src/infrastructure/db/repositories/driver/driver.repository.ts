import type { Knex } from 'knex';

import { DriverDoesNotExistError, type IDriverRepository } from '@domain/driver/index.js';

import { type IDriverQueryResult, mapDriverToDomain, mapDriversWorkShiftsToDomain } from './types.js';

export default function (client: Knex): IDriverRepository {
  return {
    async getAll() {
      const result = await client<IDriverQueryResult>('drivers').select('*');

      return result.map(mapDriverToDomain);
    },

    async getById(id) {
      const result = await client<IDriverQueryResult>('drivers').where({ id });

      if (result == null || result.length === 0) {
        throw new DriverDoesNotExistError(id);
      }

      return mapDriverToDomain(result[0]);
    },

    async findByEmail(email) {
      const result = await client('drivers')
        .join('work_shifts', 'drivers.id', 'work_shifts.driver_id')
        .select('*', 'work_shifts.id as work_shift_id')
        .where({ email });

      if (result == null || result.length === 0) {
        throw new DriverDoesNotExistError(email);
      }

      return mapDriversWorkShiftsToDomain(result)[0];
    },
  };
}
