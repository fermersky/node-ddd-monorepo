import { container } from 'tsyringe';

import { DriverService } from '@domain/driver/driver.service.js';

import { BcryptService } from '@infrastructure/crypto/bcrypt.service.js';
import { JwtService } from '@infrastructure/crypto/jwt.service.js';
import { KnexDbContext } from '@infrastructure/db/pg/context.js';
import { pool } from '@infrastructure/db/pg/index.js';

import { DriverController } from '@api/http/controller/driver/driver.controller.js';
import { JwtHttpService } from '@api/http/core/services/jwt-http.service.js';
import { WsHandlers } from '@api/ws/core/handlers/handlers.js';
import { WsDriverRouteHandlers } from '@api/ws/core/routes/driver/driver.routes.js';
import { JwtWsService } from '@api/ws/core/services/jwt-ws.service.js';

import { JwtValidationService } from './services/jwt-validation.service.js';

// domain
container.register('IDriverService', { useClass: DriverService });

// infrastructure
container.register('IBcryptService', { useClass: BcryptService });
container.register('IJwtService', { useClass: JwtService });
container.register('IJwtValidationService', { useClass: JwtValidationService });
container.register('IJwtWsService', { useClass: JwtWsService });
container.register('IJwtHttpService', { useClass: JwtHttpService });
container.register('IDbContext', { useValue: new KnexDbContext(pool) });

// api
container.register('IWsDriverRouteHandlers', { useClass: WsDriverRouteHandlers });
container.register('IWsHandlers', { useClass: WsHandlers });
container.register('IDriverController', { useClass: DriverController });

console.log('dependency tree initialized 🌲');
