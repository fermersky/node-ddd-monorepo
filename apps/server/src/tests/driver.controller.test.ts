import { appConfig } from '@infrastructure/config.js';
import bcryptService from '@infrastructure/crypto/bcrypt.service.js';
import { pool } from '@infrastructure/db/pg/index.js';
import driverRepository from '@infrastructure/db/repositories/driver/driver.repository.js';

import app from '@api/http/app.js';
import {
  DriverLoginResponseSchema,
  GetDriverSchema,
  GetDriversSchema,
} from '@api/http/controller/driver/driver.dto.js';

import { makeAuthenticatedRequest, makeRequest } from './common.js';

let address: string;

beforeAll(async () => {
  address = await app.listen({ port: appConfig.httpPort });

  await pool.migrate.latest();

  const password = await bcryptService().hash('123');

  await driverRepository(pool).create({
    id: '5333c2d3-c83f-4493-979f-fd97ad54f44d',
    email: 'andrew@mail.com',
    firstName: 'Dan',
    lastName: 'also Dan',
    phone: '38039272037',
    password,
  });
});

afterAll(async () => {
  await pool.raw(
    'drop table drivers cascade; drop table work_shifts cascade; drop table migrations cascade; drop table migrations_lock cascade;',
  );
  await app.close();
  await pool.destroy();
});

describe('Driver controller endpoints tests', () => {
  test('POST /driver/login returns 200 status and token on successful driver login', async () => {
    const { status, body } = await makeRequest(`${address}/driver/login`, DriverLoginResponseSchema, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'andrew@mail.com',
        password: '123',
      }),
    });

    expect(status).toBe(200);

    expect(body).toHaveProperty('token');
  });

  test('GET /driver/me returns 200 status and driver data based on the payload of an authorization token', async () => {
    const { status, body } = await makeAuthenticatedRequest(`${address}/driver/me`, GetDriverSchema);

    expect(status).toBe(200);

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('email');
    expect(body.email).toEqual('andrew@mail.com');
  });

  test('GET /drivers returns 200 status and all drivers available in the db', async () => {
    const { status, body } = await makeAuthenticatedRequest(`${address}/drivers`, GetDriversSchema);

    expect(status).toBe(200);

    expect(body).toBeInstanceOf(Array);
  });
});
