import type { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';

import { appConfig } from '@infrastructure/config.js';

import type { IDriverController } from '../controller/driver/driver.controller.types.js';
import { ApiHandler } from './handlers.js';

const logger = console;
const logging = appConfig.httpLogging;

const controller = container.resolve<IDriverController>('IDriverController');

export default async function routes(app: FastifyInstance) {
  app.get('/drivers', async (req, res) => {
    await ApiHandler(req, res, { logging, logger })(controller.getAll.bind(controller));
  });

  app.post('/driver/login', async (req, res) => {
    await ApiHandler(req, res, { logging, logger })(controller.login.bind(controller));
  });

  app.get('/driver/me', async (req, res) => {
    await ApiHandler(req, res, { logging, logger })(controller.me.bind(controller));
  });
}
