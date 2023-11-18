import type { FastifyRequest } from 'fastify';

import type { FastifyHandlerResult } from '../controller.types.js';
import type { DriverLoginResponseBody, GetDriverResponseBody, GetDriversResponseBody } from './driver.dto.js';

export interface IDriverController {
  getAll(req: FastifyRequest): FastifyHandlerResult<GetDriversResponseBody>;
  me(req: FastifyRequest): FastifyHandlerResult<GetDriverResponseBody>;
  login(req: FastifyRequest): FastifyHandlerResult<DriverLoginResponseBody>;
}
