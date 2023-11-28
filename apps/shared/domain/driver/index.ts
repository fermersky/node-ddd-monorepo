import { z } from 'zod';

import { EntitySchema } from '../domain.entity.js';
import { WorkShiftSchema } from '../work_shift/index.js';

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
