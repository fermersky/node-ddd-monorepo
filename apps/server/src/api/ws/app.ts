import { container } from 'tsyringe';
import uWS from 'uWebSockets.js';

import '../shared/dependency-tree.js';
import { WsHandlers } from './core/handlers/handlers.js';

const handlers = container.resolve(WsHandlers);

const app = uWS
  .App({})
  .get('/anything', (res) => {
    console.log('plain http request');
    res.end('hi');
  })
  .ws('/ws', {
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,

    open: handlers.open.bind(handlers),
    upgrade: handlers.upgrade.bind(handlers),
    close: handlers.close.bind(handlers),
    drain: handlers.drain.bind(handlers),
    message: handlers.message.bind(handlers),
  });

export default app;
