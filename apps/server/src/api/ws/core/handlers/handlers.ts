import { inject, injectable } from 'tsyringe';
import type { HttpRequest, HttpResponse, WebSocket, us_socket_context_t } from 'uWebSockets.js';

import { type IWsIncomingMessage, WsMessageSchema } from '../routes/driver/driver.routes.types.js';
import { handleMessage } from '../routes/routes.js';
import type { IJwtWsService } from '../services/jwt-ws.service.js';
import wsSessionManager, { type UserData } from '../session.manager.js';
import type { IWsHandlers } from './handlers.types.js';

@injectable()
export class WsHandlers implements IWsHandlers {
  constructor(@inject('IJwtWsService') private jwtWsService: IJwtWsService) {}

  open(ws: WebSocket<UserData>) {
    const { id } = ws.getUserData();
    wsSessionManager.set(id, ws);

    console.log(`👋 Established new WS connection ${id}`);
  }

  async message(ws: WebSocket<UserData>, message: ArrayBuffer, isBinary: boolean) {
    try {
      const messageTxt = new TextDecoder('utf8').decode(message);
      const messageJson = JSON.parse(messageTxt) as IWsIncomingMessage<unknown>;
      await WsMessageSchema.parseAsync(messageJson);

      console.log(`➡️  Incoming WS event ${messageJson.query}`);

      const result = await handleMessage(messageJson, ws.getUserData());

      console.log(`⬅️  Outgoing WS event ${messageJson.query}`);

      ws.send(JSON.stringify(result), isBinary);
    } catch (er) {
      ws.send(JSON.stringify({ error: 400 }));
      console.log(er);
    }
  }

  drain(ws: WebSocket<UserData>) {
    console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
  }

  close(ws: WebSocket<UserData>) {
    const { id } = ws.getUserData();
    wsSessionManager.delete(id);

    console.log(`✌️ WebSocket closed, Goodbye ${id}`);
  }

  async upgrade(res: HttpResponse, req: HttpRequest, context: us_socket_context_t) {
    console.log('An Http connection wants to become WebSocket, URL: ' + req.getUrl() + '!');

    const upgradeAborted = { aborted: false };

    const secWebSocketKey = req.getHeader('sec-websocket-key');
    const secWebSocketProtocol = req.getHeader('sec-websocket-protocol');
    const secWebSocketExtensions = req.getHeader('sec-websocket-extensions');

    res.onAborted(() => {
      upgradeAborted.aborted = true;
    });

    try {
      const userData = await this.jwtWsService.validateRequest(req);

      if (upgradeAborted.aborted) {
        console.log('Ouch! Client disconnected before we could upgrade it!');
        return;
      }

      res.cork(() => {
        res.upgrade<UserData>(
          {
            id: userData.id,
            email: userData.email,
            ipAddress: '0.0.0.0',
          },
          /* Use our copies here */
          secWebSocketKey,
          secWebSocketProtocol,
          secWebSocketExtensions,
          context,
        );
      });
    } catch (er) {
      console.log(er);

      res
        .writeStatus('401')
        .writeHeader('Content-Type', 'application/json')
        .end(JSON.stringify({ error: 'authorization is failed' }));
    }
  }
}
