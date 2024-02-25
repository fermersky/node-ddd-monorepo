import type { Knex } from 'knex';
import type { IDbContext } from 'shared';

import { KnexDriverRepository } from '../repositories/driver/driver.repository.js';

export class KnexDbContext implements IDbContext {
  constructor(private client: Knex) {}

  get driverRepository() {
    return new KnexDriverRepository(this.client);
  }
}
