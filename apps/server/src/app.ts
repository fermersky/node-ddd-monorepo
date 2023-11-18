import 'reflect-metadata';

import { appConfig } from '@infrastructure/config.js';

import httpApp from '@api/http/app.js';
import uWSapp from '@api/ws/app.js';

// start HTTP
httpApp.listen({ port: appConfig.httpPort });

// start WebSocket
uWSapp.listen(appConfig.wsPort, (socket) => {
  if (socket) {
    console.log(`start listening WebSockets on port ${appConfig.wsPort} 🙉`);
  } else {
    console.log(`failed to start listening WS connections on port ${appConfig.wsPort}`);
  }
});
