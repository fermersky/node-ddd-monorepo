import { pool } from '@infrastructure/db/pg/index.js';

import app from '@api/http/app.js';
import {
  DriverLoginResponseSchema,
  GetDriverSchema,
  GetDriversSchema,
} from '@api/http/controller/driver/driver.dto.js';

import { makeAuthenticatedRequest, makeRequest } from './common.js';

let address: string;

beforeAll(async () => {
  address = await app.listen({ port: 0 });
});

afterAll(async () => {
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
