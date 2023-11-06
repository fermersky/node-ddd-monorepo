import knex from 'knex';

import { appConfig } from '@infrastructure/config.js';

import config from '../../../../knexfile.js';
import context from './context.js';
import { PoolClientDecorator } from './pool-client.js';

const pool = knex(config[appConfig.nodeEnv]);

export { context, PoolClientDecorator, pool };
