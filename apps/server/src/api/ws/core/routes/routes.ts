import { container } from 'tsyringe';

import {
  type IWsDriverRouteHandlers,
  type IWsIncomingMessage,
  type WsHandlerResult,
} from './driver/driver.routes.types.js';

export const handleMessage = async (msg: IWsIncomingMessage): WsHandlerResult<unknown, string> => {
  const driverRoutes = container.resolve<IWsDriverRouteHandlers>('IWsDriverRouteHandlers');

  if (msg.query in driverRoutes) {
    return await driverRoutes[msg.query](msg.params);
  }

  throw new Error('Invalid query');
};
