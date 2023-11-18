import { container } from 'tsyringe';

import type { IDriverService } from '@domain/driver/index.js';

import type { IJwtHttpService } from '../core/services/jwt-http.service.js';
import driverHttpController from './driver/driver.controller.js';

export const driverController = async () => {
  const driverService = container.resolve<IDriverService>('IDriverService');
  const jwtHttpService = container.resolve<IJwtHttpService>('IJwtHttpService');

  return driverHttpController({ jwt: jwtHttpService, driverService });
};
