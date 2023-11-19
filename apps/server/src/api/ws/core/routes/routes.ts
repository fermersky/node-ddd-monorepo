import { container, inject, injectable } from 'tsyringe';

import { DI } from '@api/shared/dependencies.js';

import type { UserData } from '../session.manager.js';
import {
  type IWsDriverRouteHandlers,
  type IWsIncomingMessage,
  type WsHandlerResult,
} from './driver/driver.routes.types.js';

@injectable()
export class WsHandlers {
  constructor(@inject(DI.WsDriverRouteHandlers) private driverRoutes: IWsDriverRouteHandlers) {}

  resolve(query: keyof IWsDriverRouteHandlers) {
    if (query in this.driverRoutes) {
      return this.driverRoutes[query].bind(this.driverRoutes);
    }

    return this.notFound.bind(this, query);
  }

  notFound(query: string) {
    return { event: query, data: { msg: 'No such query handler' }, status: 404 };
  }
}

export const handleMessage = async (
  msg: IWsIncomingMessage<unknown>,
  userData: UserData,
): WsHandlerResult<unknown, string> => {
  const routes = container.resolve(WsHandlers);
  const handler = routes.resolve(msg.query);

  // @ts-ignore
  return await handler(msg.params, userData);
};
