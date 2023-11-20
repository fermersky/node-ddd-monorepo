import { mock } from 'node:test';

import type { Driver, IDriverRepository } from '@domain/driver/index.js';

export class DriverRepositoryStub implements IDriverRepository {
  /**
   * Replaces methods in the target DriverRepository with fake implementations from DriverRepositoryStub.
   * This method modifies the original object in place.
   *
   * @param target - The DriverRepository instance to be mocked.
   *
   * @example
   * ```typescript
   * const driverRepository = new SomeDriverRepository();
   * DriverRepositoryStub.mock(driverRepository);
   * // Now, driverRepository has fake implementations for its methods.
   * ```
   *
   * @remarks
   * The `mock` function replaces each method in the target `IDriverRepository` with a fake implementation from the `DriverRepositoryStub`.
   * This can be useful for testing purposes, isolating the behavior of the repository, and preventing actual database or external service interactions.
   * Ensure to call this function before using the target repository in your tests.
   *
   * @throws Will throw an error if the `mock` function from the 'node:test' library fails to mock a method.
   *
   * @see {@link https://nodejs.org/api/test.html} - Link to the documentation of the 'node:test' library.
   */
  static mock(target: IDriverRepository) {
    const obj = new DriverRepositoryStub();

    Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).forEach((key) => {
      if (key === 'constructor') return;

      const propertyName = key as keyof DriverRepositoryStub;
      if (typeof obj[propertyName] !== 'function') return;

      mock.method(target, propertyName).mock.mockImplementation(obj[propertyName].bind(obj));
    });
  }

  private _drivers: Driver[] = [
    {
      id: '5333c2d3-c83f-4493-979f-fd97ad54f44d',
      firstName: 'Andrew',
      lastName: 'Udot',
      email: 'andrew@mail.com',
      password: '123',
    },
  ];

  async getAll() {
    return this._drivers;
  }

  async getById(id: string) {
    const driver = this._drivers.find((d) => d.id === id);

    if (driver) return driver;

    throw new Error('Driver not found');
  }

  async create(driver: Driver) {
    this._drivers.push(driver);

    return driver;
  }

  async findByEmail(email: string) {
    const driver = this._drivers.find((d) => d.email === email);

    if (driver) return driver;

    throw new Error('Driver not found');
  }
}
