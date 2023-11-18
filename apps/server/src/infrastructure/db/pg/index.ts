import knex from 'knex';

import { appConfig } from '@infrastructure/config.js';

import config from '../../../../knexfile.js';

export const pool = knex(config[appConfig.nodeEnv]);
