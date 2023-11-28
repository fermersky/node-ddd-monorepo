import { inject, injectable } from 'tsyringe';

import type { IDbContext } from '@domain/domain.interface.js';
import { CouldNotAuthenticateDriver, DriverDoesNotExistError } from '@domain/driver/driver.errors.js';
import type { IDriverService } from '@domain/driver/driver.interface.js';
import type { Driver } from '@domain/driver/index.js';

import { type IBcryptService } from '@infrastructure/crypto/bcrypt.service.js';

import { DI } from '@api/shared/dependencies.js';

@injectable()
export class DriverService implements IDriverService {
  constructor(
    @inject(DI.DbContext) private db: IDbContext,
    @inject(DI.BcryptService) private bcrypt: IBcryptService,
  ) {}

  async create(driver: Driver): Promise<Driver> {
    await this.db.driverRepository.create(driver);

    return driver;
  }

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
