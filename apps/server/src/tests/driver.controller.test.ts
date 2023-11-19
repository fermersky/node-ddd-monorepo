import expect from 'node:assert';
import { after, before, describe, test } from 'node:test';
import 'reflect-metadata';

import { appConfig } from '@infrastructure/config.js';
import { KnexDbContext } from '@infrastructure/db/pg/context.js';
import { pool } from '@infrastructure/db/pg/index.js';

import app from '@api/http/app.js';
import {
  DriverLoginResponseSchema,
  GetDriverSchema,
  GetDriversSchema,
} from '@api/http/controller/driver/driver.dto.js';

import { makeAuthenticatedRequest, makeRequest } from './util/common.js';
import { randomDriver } from './util/driver.faker.js';

const shared = { address: '' };
const dbContext = new KnexDbContext(pool);

before(async () => {
  shared.address = await app.listen({ port: appConfig.httpPort });

  await pool.migrate.latest();
  const driver = await randomDriver({ password: '123', email: 'andrew@mail.com' });

  await dbContext.driverRepository.create(driver);
});

after(async () => {
  await pool.raw(
    'drop table drivers cascade; drop table work_shifts cascade; drop table migrations cascade; drop table migrations_lock cascade;',
  );
  await app.close();
  await pool.destroy();
});

describe('Driver controller endpoints tests', () => {
  test('POST /driver/login returns 200 status and token on successful driver login', async () => {
    const { status, body } = await makeRequest(`${shared.address}/driver/login`, DriverLoginResponseSchema, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'andrew@mail.com',
        password: '123',
      }),
    });

    expect.equal(status, 200);
    expect.ok('token' in body);
  });

  test('GET /driver/me returns 200 status and driver data based on the payload of an authorization token', async () => {
    const { status, body } = await makeAuthenticatedRequest(`${shared.address}/driver/me`, GetDriverSchema);

    expect.equal(status, 200);
    expect.ok('id' in body);
    expect.ok('email' in body);
    expect.equal(body.email, 'andrew@mail.com');
  });

  test('GET /drivers returns 200 status and all drivers available in the db', async () => {
    const { status, body } = await makeAuthenticatedRequest(`${shared.address}/drivers`, GetDriversSchema);

    expect.equal(status, 200);

    expect.ok(body instanceof Array);
  });
});
