import { inject, injectable } from 'tsyringe';
import uWS from 'uWebSockets.js';

import type { IDriverJwtPayload, IJwtValidationService } from '@api/shared/services/index.js';

export interface IJwtWsService {
  validateRequest<T = IDriverJwtPayload>(req: uWS.HttpRequest): Promise<T>;
  createToken<T extends object>(payload: T): Promise<string>;
}

@injectable()
export class JwtWsService implements IJwtWsService {
  constructor(@inject('IJwtValidationService') private jwt: IJwtValidationService) {}

  async validateRequest<T = IDriverJwtPayload>(req: uWS.HttpRequest): Promise<T> {
    try {
      const token = req.getHeader('authorization')?.split(' ')[1];

      if (token == null) {
        throw new Error('Token is missing');
      }

      const tokenValid = await this.jwt.validateToken<T>(token);

      return tokenValid;
    } catch (error) {
      console.log(error);

      throw new Error('Token verification failed');
    }
  }
  async createToken<T extends object>(payload: T): Promise<string> {
    return await this.jwt.createToken(payload);
  }
}
