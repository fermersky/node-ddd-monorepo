import chance from 'chance';
import { container } from 'tsyringe';

import type { Driver } from '@domain/driver/index.js';

import type { IBcryptService } from '@infrastructure/crypto/bcrypt.service.js';

const bcryptService = container.resolve<IBcryptService>('IBcryptService');

const ch = chance();

export const randomDriver = async (overrides?: Partial<Driver>): Promise<Driver> => {
  const password = await bcryptService.hash(overrides?.password || '123');

  return {
    id: overrides?.id || ch.guid({ version: 4 }),
    email: overrides?.email || ch.email(),
    firstName: overrides?.firstName || ch.first(),
    lastName: overrides?.lastName || ch.last(),
    phone: overrides?.phone || ch.phone(),
    password,
  };
};
