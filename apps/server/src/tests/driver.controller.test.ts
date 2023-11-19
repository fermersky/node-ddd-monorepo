import expect from 'node:assert';
import { after, before, describe, test } from 'node:test';
import 'reflect-metadata';
import { container } from 'tsyringe';

import { appConfig } from '@infrastructure/config.js';
import { type IBcryptService } from '@infrastructure/crypto/bcrypt.service.js';
import { KnexDbContext } from '@infrastructure/db/pg/context.js';
import { pool } from '@infrastructure/db/pg/index.js';

import app from '@api/http/app.js';
import {
  DriverLoginResponseSchema,
  GetDriverSchema,
  GetDriversSchema,
} from '@api/http/controller/driver/driver.dto.js';

import { makeAuthenticatedRequest, makeRequest } from './common.js';

const shared = { address: '' };
const bcryptService = container.resolve<IBcryptService>('IBcryptService');
const dbContext = new KnexDbContext(pool);

before(async () => {
  shared.address = await app.listen({ port: appConfig.httpPort });

  await pool.migrate.latest();

  const password = await bcryptService.hash('123');

  await dbContext.driverRepository.create({
    id: '5333c2d3-c83f-4493-979f-fd97ad54f44d',
    email: 'andrew@mail.com',
    firstName: 'Dan',
    lastName: 'also Dan',
    phone: '38039272037',
    password,
  });
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
