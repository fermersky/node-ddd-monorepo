import driver from '@domain/driver/driver.service.js';

import { bcryptService } from '@infrastructure/crypto/index.js';
import { context, pool } from '@infrastructure/db/pg/index.js';

import { jwtHttpService } from '../core/services/index.js';
import driverHttpController from './driver/driver.controller.js';

// infrastructure
const db = context(pool);
const bcrypt = bcryptService();

// http controllers
export const driverController = async () => {
  const session = await db.connect();
  const driverService = driver({ db: session, bcrypt });

  return driverHttpController({ jwt: jwtHttpService, driverService });
};
