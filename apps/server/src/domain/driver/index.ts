import { z } from 'zod';

import { WorkShiftSchema } from '@domain/work_shift/index.js';

import { EntitySchema } from '../domain.entity.js';
import driverService from './driver.service.js';

export const DriverSchema = EntitySchema.extend({
  password: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  workShifts: z.array(WorkShiftSchema).optional(),
});

export type Driver = z.infer<typeof DriverSchema>;

export { driverService };

export * from './driver.interface.js';
export * from './driver.errors.js';
