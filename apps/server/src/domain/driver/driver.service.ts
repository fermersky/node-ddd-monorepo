import { inject, injectable } from 'tsyringe';

import { CouldNotAuthenticateDriver, DriverDoesNotExistError } from '@domain/driver/driver.errors.js';
import type { IDriverService } from '@domain/driver/driver.interface.js';
import type { IDbContext } from '@domain/index.js';

import { type IBcryptService } from '@infrastructure/crypto/bcrypt.service.js';

import { DI } from '@api/shared/dependencies.js';

import type { Driver } from './index.js';

@injectable()
export class DriverService implements IDriverService {
  constructor(
    @inject(DI.DbContext) private db: IDbContext,
    @inject(DI.BcryptService) private bcrypt: IBcryptService,
  ) {}

  async getAll(): Promise<Driver[]> {
    return await this.db.driverRepository.getAll();
  }

  async findByEmail(email: string): Promise<Driver> {
    const driver = await this.db.driverRepository.findByEmail(email);

    if (!driver) {
      throw new DriverDoesNotExistError(email);
    }

    return driver;
  }
  async authenticate(email: string, password: string): Promise<Driver> {
    const driver = await this.db.driverRepository.findByEmail(email);

    if (driver == null) {
      throw new CouldNotAuthenticateDriver();
    }

    const passwordValid = await this.bcrypt.compare(password, driver.password);

    if (passwordValid) {
      return driver;
    }

    throw new CouldNotAuthenticateDriver();
  }
}
