import { inject, injectable } from 'tsyringe';

import { appConfig } from '@infrastructure/config.js';
import type { IJwtService } from '@infrastructure/crypto/jwt.service.js';

import { DI } from '../dependencies.js';

export interface IDriverJwtPayload {
  email: string;
  id: string;
}

export interface IJwtValidationService {
  validateToken<T = IDriverJwtPayload>(token: string): Promise<T>;
  createToken<T extends object>(payload: T): Promise<string>;
}

@injectable()
export class JwtValidationService implements IJwtValidationService {
  constructor(@inject(DI.JwtService) private jwt: IJwtService) {}

  async validateToken<T = IDriverJwtPayload>(token: string): Promise<T> {
    try {
      const tokenValid = await this.jwt.verify<T>(token, appConfig.jwtSecret);

      if (!tokenValid) {
        throw new Error('Token verification failed');
      }

      return tokenValid;
    } catch (error) {
      console.log(error);

      throw new Error('Token verification failed');
    }
  }
  async createToken<T extends object>(payload: T): Promise<string> {
    const token = await this.jwt.sign(payload, appConfig.jwtSecret, {
      expiresIn: Date.now() + 15 * 60 * 1000,
    });

    return token as string;
  }
}
