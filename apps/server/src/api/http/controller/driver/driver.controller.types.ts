import type { FastifyRequest } from 'fastify';
import type { DriverLoginResponseBody, GetDriverResponseBody, GetDriversResponseBody } from 'shared';

import type { FastifyHandlerResult } from '../controller.types.js';

export interface IDriverController {
  getAll(req: FastifyRequest): FastifyHandlerResult<GetDriversResponseBody>;
  me(req: FastifyRequest): FastifyHandlerResult<GetDriverResponseBody>;
  login(req: FastifyRequest): FastifyHandlerResult<DriverLoginResponseBody>;
}
