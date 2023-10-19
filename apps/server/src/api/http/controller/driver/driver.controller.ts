import type { IDriverService } from '@domain/driver/index.js';

import type { IJwtHttpService } from '@api/http/core/services/jwt-http.service.js';

import type { IDriverController } from './driver.controller.types.js';
import { DriverLoginSchema, fromDomain } from './driver.dto.js';

interface IDriverControllerDeps {
  driverService: IDriverService;
  jwt: IJwtHttpService;
}

export default function ({ driverService, jwt }: IDriverControllerDeps): IDriverController {
  return {
    async getAll(req) {
      await jwt.validateRequest(req);

      const drivers = await driverService.getAll();

      return { body: drivers.map(fromDomain), status: 200 };
    },

    async me(req) {
      const { email } = await jwt.validateRequest(req);

      const driver = await driverService.findByEmail(email);

      return { body: fromDomain(driver), status: 200 };
    },

    async login(req) {
      const { email, password } = await DriverLoginSchema.parseAsync(req.body);

      const driver = await driverService.authenticate(email, password);

      const token = await jwt.createToken({
        id: driver.id,
        email: driver.email,
      });

      return { body: { token }, status: 200 };
    },
  };
}
