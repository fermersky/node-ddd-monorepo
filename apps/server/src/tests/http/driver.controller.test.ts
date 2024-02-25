import assert from 'node:assert';
import { after, before, describe, test } from 'node:test';
import 'reflect-metadata';
import { DriverLoginResponseSchema, GetDriverSchema, GetDriversSchema } from 'shared';

import { appConfig } from '@infrastructure/config.js';
import { KnexDbContext } from '@infrastructure/db/pg/context.js';
import { pool } from '@infrastructure/db/pg/index.js';

import app from '@api/http/app.js';

import { makeAuthenticatedRequest, makeRequest } from '../util/common.js';
import { randomDriver } from '../util/driver.faker.js';

const shared = { address: '' };
const dbContext = new KnexDbContext(pool);

before(async () => {
  shared.address = await app.listen({ port: appConfig.httpPort });

  await pool.migrate.latest();
  const driver = await randomDriver({ password: '123', email: 'andrew@mail.com' });

  await dbContext.driverRepository.create(driver);
});

after(async () => {
  await pool.migrate.rollback({}, true);

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

    assert.equal(status, 200);
    assert.ok('token' in body);
  });

  test('GET /driver/me returns 200 status and driver data based on the payload of an authorization token', async () => {
    const { status, body } = await makeAuthenticatedRequest(`${shared.address}/driver/me`, GetDriverSchema);

    assert.equal(status, 200);
    assert.ok('id' in body);
    assert.ok('email' in body);
    assert.equal(body.email, 'andrew@mail.com');
  });

  test('GET /drivers returns 200 status and all drivers available in the db', async () => {
    const { status, body } = await makeAuthenticatedRequest(`${shared.address}/drivers`, GetDriversSchema);

    assert.equal(status, 200);

    assert.ok(body instanceof Array);
  });
});
