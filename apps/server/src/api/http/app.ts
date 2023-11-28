import cors from '@fastify/cors';
import fastify from 'fastify';

import { appConfig } from '@infrastructure/config.js';

import '@api/shared/dependency-tree.js';

import routes from './core/routes.js';

const app = fastify();

await app.register(cors, {
  origin: '*',
  allowedHeaders: '*',
  methods: '*',
  maxAge: 360000000,
});

app.register(routes);

app.addHook('onReady', (done) => {
  console.log(`HTTP server is running on port ${appConfig.httpPort} 🚀`);
  console.dir(appConfig);

  done();
});

export default app;
