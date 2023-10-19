import type { FastifyInstance } from 'fastify';

import { appConfig } from '@infrastructure/config.js';

import { driverController } from '../controller/index.js';
import { ApiHandler } from './handlers.js';

const logger = console;
const logging = appConfig.httpLogging;

export default async function routes(app: FastifyInstance) {
  app.get('/drivers', async (req, res) => {
    const controller = await driverController();
    await ApiHandler(req, res, { logging, logger })(controller.getAll);
  });

  app.post('/driver/login', async (req, res) => {
    const controller = await driverController();
    await ApiHandler(req, res, { logging, logger })(controller.login);
  });

  app.get('/driver/me', async (req, res) => {
    const controller = await driverController();
    await ApiHandler(req, res, { logging, logger })(controller.me);
  });
}
