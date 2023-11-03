import { driverService as driver } from '@domain/driver/index.js';

import { appConfig } from '@infrastructure/config.js';
import { bcryptService, jwtService } from '@infrastructure/crypto/index.js';
import { context, pool } from '@infrastructure/db/pg/index.js';

import { driverRoutes } from './driver/driver.routes.js';
import type {
  IWsDriverRouteHandlers,
  IWsIncomingMessage,
  IWsWorkShiftRouteHandlers,
  WsHandlerResult,
} from './driver/driver.routes.types.js';

const db = context(pool);
const bcrypt = bcryptService();

export type WsRouteHandlers = IWsWorkShiftRouteHandlers | IWsDriverRouteHandlers; // & other route handlers;

export const routes: WsRouteHandlers = { ...driverRoutes };

export const handleMessage = async (msg: IWsIncomingMessage): WsHandlerResult<object, string> => {
  // const session = await db.connect();
  const driverService = driver({ db, bcrypt });
  const jwt = jwtService();

  if (msg.query in driverRoutes) {
    return await driverRoutes[msg.query as keyof IWsDriverRouteHandlers](msg.params, {
      driverService,
      jwt,
      appConfig,
    });
  }

  throw new Error('Invalid query');
};
