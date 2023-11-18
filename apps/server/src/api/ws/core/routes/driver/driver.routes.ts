import { inject, injectable } from 'tsyringe';

import type { IDriverService } from '@domain/driver/index.js';

import { appConfig } from '@infrastructure/config.js';
import type { IJwtService } from '@infrastructure/crypto/jwt.service.js';

import type { IDriverJwtPayload } from '@api/shared/services/index.js';

import { type IJwtWsService } from '../../services/index.js';
import {
  type DriverLoginParams,
  DriverLoginSchema,
  type DriverMeParams,
  DriverMeSchema,
  type GetAllDriversParams,
  GetAllDriversParamsSchema,
  type IWsDriverRouteHandlers,
  type WsGetAllDriversWsHandlerResult,
  type WsLoginHandlerResult,
  type WsMeHandlerResult,
  fromDomain,
} from './driver.routes.types.js';

@injectable()
export class WsDriverRouteHandlers implements IWsDriverRouteHandlers {
  constructor(
    @inject('IJwtWsService') private jwtWsService: IJwtWsService,
    @inject('IJwtService') private jwt: IJwtService,
    @inject('IDriverService') private driverService: IDriverService,
  ) {}

  async login(params: DriverLoginParams): WsLoginHandlerResult {
    await DriverLoginSchema.parseAsync(params);

    const driver = await this.driverService.authenticate(params.email, params.password);

    const token = await this.jwtWsService.createToken({
      id: driver.id,
      email: driver.email,
    });

    return { data: { token }, status: 200, event: 'login' };
  }

  async getAllDrivers(params: GetAllDriversParams): WsGetAllDriversWsHandlerResult {
    await GetAllDriversParamsSchema.parseAsync(params);

    const drivers = await this.driverService.getAll();

    return {
      data: drivers.map(fromDomain),
      status: 200,
      event: 'getAllDrivers',
    };
  }

  async me(params: DriverMeParams): WsMeHandlerResult {
    await DriverMeSchema.parseAsync(params);

    const { email } = await this.jwt.verify<IDriverJwtPayload>(params.token, appConfig.jwtSecret);
    const driver = await this.driverService.findByEmail(email);

    return { data: fromDomain(driver), status: 200, event: 'me' };
  }
}
