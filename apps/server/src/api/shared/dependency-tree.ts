import { container } from 'tsyringe';

import { BcryptService } from '@infrastructure/crypto/bcrypt.service.js';
import { JwtService } from '@infrastructure/crypto/jwt.service.js';
import { KnexDbContext } from '@infrastructure/db/pg/context.js';
import { pool } from '@infrastructure/db/pg/index.js';

import { DriverController } from '@api/http/controller/driver/driver.controller.js';
import { JwtHttpService } from '@api/http/core/services/jwt-http.service.js';
import { WsHandlers } from '@api/ws/core/handlers/handlers.js';
import { WsDriverRouteHandlers } from '@api/ws/core/routes/driver/driver.routes.js';
import { JwtWsService } from '@api/ws/core/services/jwt-ws.service.js';

import { DriverService } from '../../core/driver/driver.service.js';
import { DI } from './dependencies.js';
import { JwtValidationService } from './services/jwt-validation.service.js';

// domain
container.register(DI.DriverService, { useClass: DriverService });

// infrastructure
container.register(DI.BcryptService, { useClass: BcryptService });
container.register(DI.JwtService, { useClass: JwtService });
container.register(DI.JwtValidationService, { useClass: JwtValidationService });
container.register(DI.JwtWsService, { useClass: JwtWsService });
container.register(DI.JwtHttpService, { useClass: JwtHttpService });
// container.register(DI.DbContext, { useValue: new KnexDbContext(pool) });

container.register(DI.DbContext, {
  useFactory: (c) => {
    console.log('here');
    return new KnexDbContext(pool);
  },
});

// api
container.register(DI.WsDriverRouteHandlers, { useClass: WsDriverRouteHandlers });
container.register(DI.WsHandlers, { useClass: WsHandlers });
container.register(DI.DriverController, { useClass: DriverController });

console.log('dependency tree initialized 🌲');
