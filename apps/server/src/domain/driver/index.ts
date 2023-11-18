import { z } from 'zod';

import { WorkShiftSchema } from '@domain/work_shift/index.js';

import { EntitySchema } from '../domain.entity.js';

export const DriverSchema = EntitySchema.extend({
  password: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  workShifts: z.array(WorkShiftSchema).optional(),
});

export type Driver = z.infer<typeof DriverSchema>;

export * from './driver.interface.js';
export * from './driver.errors.js';
export * from './driver.service.js';
