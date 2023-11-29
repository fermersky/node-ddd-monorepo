import type { IDbContext } from 'shared/domain/index.js';

import { DriverRepositoryStub } from './driver.repository.stub.js';

export class TestDbContext implements IDbContext {
  get driverRepository() {
    return new DriverRepositoryStub();
  }
}
