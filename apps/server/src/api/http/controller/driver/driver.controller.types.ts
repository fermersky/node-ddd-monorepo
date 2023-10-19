import type { FastifyRouteHandlerFn } from '../controller.types.js';
import type { DriverLoginResponseBody, GetDriverResponseBody, GetDriversResponseBody } from './driver.dto.js';

type GetAllHandler = FastifyRouteHandlerFn<GetDriversResponseBody>;
type GetMeHandler = FastifyRouteHandlerFn<GetDriverResponseBody>;
type LoginHandler = FastifyRouteHandlerFn<DriverLoginResponseBody>;

export interface IDriverController {
  getAll: GetAllHandler;
  me: GetMeHandler;
  login: LoginHandler;
}
