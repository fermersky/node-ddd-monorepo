import { jwtValidationService } from '@api/shared/services/index.js';

import jwtWs from './jwt-ws.service.js';

export const jwtWsService = jwtWs({ jwt: jwtValidationService });
