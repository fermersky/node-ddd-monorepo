import type { IDbContext } from '@domain/index.js';

import { DriverRepositoryStub } from './driver.repository.stub.js';

export class TestDbContext implements IDbContext {
  get driverRepository() {
    return new DriverRepositoryStub();
  }
}
