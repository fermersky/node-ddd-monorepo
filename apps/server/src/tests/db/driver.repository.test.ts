import assert from 'node:assert';
import { after, before, describe, mock, test } from 'node:test';
import 'reflect-metadata';
import { container } from 'tsyringe';

import type { IDriverRepository } from '@domain/driver/index.js';
import type { IDbContext } from '@domain/index.js';

import { DI } from '@api/shared/dependencies.js';
import '@api/shared/dependency-tree.js';

import { DriverRepositoryStub } from './driver.repository.stub.js';

let driverRepository: IDriverRepository;

before(() => {
  const dbContext = container.resolve<IDbContext>(DI.DbContext);
  driverRepository = dbContext.driverRepository;

  DriverRepositoryStub.mock(driverRepository);
});

after(() => mock.restoreAll());

describe('Driver Knex repository tests', () => {
  test('DriverRepository.getAll returns correct data', async () => {
    const result = await driverRepository.getAll();

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].id, '5333c2d3-c83f-4493-979f-fd97ad54f44d');
  });
});
