import type { IDbContext } from 'shared';

import { DriverRepositoryStub } from './driver.repository.stub.js';

export class TestDbContext implements IDbContext {
  get driverRepository() {
    return new DriverRepositoryStub();
  }
}
