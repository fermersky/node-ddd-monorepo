import type { FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

import { DI } from '@api/shared/dependencies.js';
import type {
  IDriverJwtPayload,
  IJwtValidationService,
} from '@api/shared/services/jwt-validation.service.js';

import { HttpUnauthorized } from '../http.errors.js';

export interface IJwtHttpService {
  validateRequest<T = IDriverJwtPayload>(req: FastifyRequest): Promise<T>;
  createToken<T extends object>(payload: T): Promise<string>;
}

@injectable()
export class JwtHttpService implements IJwtHttpService {
  constructor(@inject(DI.JwtValidationService) private jwt: IJwtValidationService) {}

  async validateRequest<T = IDriverJwtPayload>(req: FastifyRequest): Promise<T> {
    try {
      const token = req.headers['authorization']?.split(' ')[1];

      if (token == null) {
        throw new HttpUnauthorized('Token is missing');
      }

      const tokenValid = await this.jwt.validateToken(token);

      return tokenValid as T;
    } catch (error) {
      console.log(error);

      throw new HttpUnauthorized('Token verification failed');
    }
  }

  async createToken<T extends object>(payload: T): Promise<string> {
    return await this.jwt.createToken(payload);
  }
}
