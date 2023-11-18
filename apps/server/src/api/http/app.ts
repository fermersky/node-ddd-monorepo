import fastify from 'fastify';

import { appConfig } from '@infrastructure/config.js';

import '@api/shared/dependency-tree.js';

import routes from './core/routes.js';

const app = fastify();

app.register(routes);

app.addHook('onReady', (done) => {
  console.log(`HTTP server is running on port ${appConfig.httpPort} 🚀`);
  console.dir(appConfig);

  done();
});

export default app;
