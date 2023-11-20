import assert from 'node:assert';
import { before, beforeEach, describe, mock, test } from 'node:test';
import 'reflect-metadata';
import { container } from 'tsyringe';

import type { DriverService } from '@domain/driver/index.js';

import { DI } from '@api/shared/dependencies.js';
import '@api/shared/dependency-tree.js';

import { TestDbContext } from '../db/index.js';

let driverService: DriverService;

before(() => {
  container.register(DI.DbContext, { useValue: new TestDbContext() });

  driverService = container.resolve<DriverService>(DI.DriverService);
});

beforeEach(() => mock.restoreAll());

describe('Driver domain service tests', () => {
  test('DriverService.getAll returns correct data', async () => {
    const result = await driverService.getAll();

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].id, '5333c2d3-c83f-4493-979f-fd97ad54f44d');
  });
});
