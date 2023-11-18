import type { FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

import type { IDriverService } from '@domain/driver/index.js';

import type { IJwtHttpService } from '@api/http/core/services/jwt-http.service.js';

import type { FastifyHandlerResult } from '../controller.types.js';
import type { IDriverController } from './driver.controller.types.js';
import {
  type DriverLoginResponseBody,
  DriverLoginSchema,
  type GetDriverResponseBody,
  type GetDriversResponseBody,
  fromDomain,
} from './driver.dto.js';

@injectable()
export class DriverController implements IDriverController {
  constructor(
    @inject('IJwtHttpService') private jwt: IJwtHttpService,
    @inject('IDriverService') private driverService: IDriverService,
  ) {}

  async getAll(req: FastifyRequest): FastifyHandlerResult<GetDriversResponseBody> {
    await this.jwt.validateRequest(req);

    const drivers = await this.driverService.getAll();

    return { body: drivers.map(fromDomain), status: 200 };
  }

  async me(req: FastifyRequest): FastifyHandlerResult<GetDriverResponseBody> {
    const { email } = await this.jwt.validateRequest(req);

    const driver = await this.driverService.findByEmail(email);

    return { body: fromDomain(driver), status: 200 };
  }

  async login(req: FastifyRequest): FastifyHandlerResult<DriverLoginResponseBody> {
    const { email, password } = await DriverLoginSchema.parseAsync(req.body);

    const driver = await this.driverService.authenticate(email, password);

    const token = await this.jwt.createToken({
      id: driver.id,
      email: driver.email,
    });

    return { body: { token }, status: 200 };
  }
}
