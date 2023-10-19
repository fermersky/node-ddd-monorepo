import { appConfig } from '@infrastructure/config.js';

import app from '@api/http/app.js';
import uWSapp from '@api/ws/app.js';

// start HTTP
app.listen({ port: appConfig.httpPort });

// start WebSocket
uWSapp.listen(appConfig.wsPort, (socket) => {
  if (socket) {
    console.log(`start listening WebSockets on port ${appConfig.wsPort} 🙉`);
  } else {
    console.log(`failed to start listening WS connections on port ${appConfig.wsPort}`);
  }
});
