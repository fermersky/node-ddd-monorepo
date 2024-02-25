import type { IDriverService } from 'shared';
import { inject, injectable } from 'tsyringe';

import { DI } from '@api/shared/dependencies.js';

import type { IJwtWsService } from '../../services/index.js';
import type { UserData } from '../../session.manager.js';
import type {
  DriverLoginParams,
  DriverMeParams,
  GetAllDriversParams,
  IWsDriverRouteHandlers,
  WsGetAllDriversWsHandlerResult,
  WsLoginHandlerResult,
  WsMeHandlerResult,
} from './driver.routes.types.js';
import {
  DriverLoginSchema,
  DriverMeSchema,
  GetAllDriversParamsSchema,
  fromDomain,
} from './driver.routes.types.js';

@injectable()
export class WsDriverRouteHandlers implements IWsDriverRouteHandlers {
  constructor(
    @inject(DI.JwtWsService) private jwtWsService: IJwtWsService,
    @inject(DI.DriverService) private driverService: IDriverService,
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

  async me(params: DriverMeParams, userData: UserData): WsMeHandlerResult {
    await DriverMeSchema.parseAsync(params);

    const driver = await this.driverService.findByEmail(userData.email);

    return { data: fromDomain(driver), status: 200, event: 'me' };
  }
}
