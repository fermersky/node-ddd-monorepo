import type { Driver } from 'shared';
import { z } from 'zod';

import type { UserData } from '../../session.manager.js';

export const WsMessageSchema = z.object({
  query: z.string(),
  params: z.unknown(),
});

export interface IWsIncomingMessage<TParams> {
  params: TParams;
  query: 'getAllDrivers' | 'me';
}

export interface IWsHandlerResult<TSchema, TEvent> {
  status: number;
  data: TSchema;
  event: TEvent;
}

export const GetAllDriversParamsSchema = z.object({
  skip: z.number().default(0),
  take: z.number().default(5),
});

export const DriverLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const DriverMeSchema = z.object({
  email: z.string(),
});

export type WsHandlerResult<T, Q> = Promise<IWsHandlerResult<T, Q>>;

export type GetAllDriversParams = z.infer<typeof GetAllDriversParamsSchema>;
export type DriverLoginParams = z.infer<typeof DriverLoginSchema>;
export type DriverMeParams = z.infer<typeof DriverMeSchema>;

export type WsLoginHandlerResult = WsHandlerResult<{ token: string }, 'login'>;
export type WsGetAllDriversWsHandlerResult = WsHandlerResult<GetDriverResult[], 'getAllDrivers'>;
export type WsMeHandlerResult = WsHandlerResult<GetDriverResult, 'me'>;

export interface IWsDriverRouteHandlers {
  login(params: DriverLoginParams, userData: UserData): WsLoginHandlerResult;
  getAllDrivers(params: GetAllDriversParams, userData: UserData): WsGetAllDriversWsHandlerResult;
  me(params: DriverMeParams, userData: UserData): WsMeHandlerResult;
}

export interface IWsWorkShiftRouteHandlers {
  getWorkShiftById: () => void; // just for a placeholder
}

export type WsQuery = keyof IWsDriverRouteHandlers | keyof IWsWorkShiftRouteHandlers;

export const GetDriverSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  workShifts: z
    .array(
      z.object({
        id: z.string(),
        start: z.string(),
        end: z.string(),
      }),
    )
    .optional(),
});

export const GetDriversSchema = z.array(GetDriverSchema);

export type GetDriverResult = z.infer<typeof GetDriverSchema>;

export function fromDomain(driver: Driver): GetDriverResult {
  let workShifts = undefined;

  if (driver.workShifts) {
    workShifts = driver.workShifts.map((ws) => ({
      id: ws.id,
      start: ws.start,
      end: ws.end,
      driverId: ws.driverId,
    }));
  }
  return {
    id: driver.id,
    firstName: driver.firstName,
    lastName: driver.lastName,
    email: driver.email,
    phone: driver.phone,
    workShifts,
  };
}
