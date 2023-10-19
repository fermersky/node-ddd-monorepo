import { appConfig } from '@infrastructure/config.js';
import { jwtService } from '@infrastructure/crypto/index.js';

import jwtValidation from './jwt-validation.service.js';

export const jwtValidationService = jwtValidation({
  jwt: jwtService(),
  appConfig,
});

export * from './jwt-validation.service.js';
