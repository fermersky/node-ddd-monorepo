import chance from 'chance';
import type { Driver } from 'shared';

import { BcryptService } from '@infrastructure/crypto/bcrypt.service.js';

const bcryptService = new BcryptService();

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
