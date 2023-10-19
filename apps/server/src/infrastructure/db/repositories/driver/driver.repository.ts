import { DriverDoesNotExistError, type IDriverRepository } from '@domain/driver/index.js';

import type { PoolClientDecorator } from '@infrastructure/db/pg/index.js';

import {
  type IDriverQueryResult,
  type IDriverWorkShiftsQueryResult,
  mapDriverToDomain,
  mapDriversWorkShiftsToDomain,
} from './types.js';

export default function (client: PoolClientDecorator): IDriverRepository {
  return {
    async getAll() {
      const result = await client.query<IDriverQueryResult>('SELECT * FROM drivers');

      return result.rows.map(mapDriverToDomain);
    },

    async getById(id) {
      const result = await client.query<IDriverQueryResult>('SELECT * FROM drivers where id = $1', [id]);

      if (result.rowCount === 0) {
        throw new DriverDoesNotExistError(id);
      }

      return mapDriverToDomain(result.rows[0]);
    },

    async findByEmail(email) {
      const result = await client.query<IDriverWorkShiftsQueryResult>(
        'SELECT ws.id as work_shift_id, ws.*, d.* FROM drivers d LEFT JOIN work_shifts ws on ws.driver_id = d.id WHERE email = $1 ',
        [email],
      );

      if (result.rowCount === 0) {
        throw new DriverDoesNotExistError(email);
      }

      return mapDriversWorkShiftsToDomain(result.rows)[0];
    },
  };
}