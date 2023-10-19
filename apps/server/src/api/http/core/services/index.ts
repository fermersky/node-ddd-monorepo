import { jwtValidationService } from '@api/shared/services/index.js';

import jwtHttp from './jwt-http.service.js';

export const jwtHttpService = jwtHttp({ jwt: jwtValidationService });
