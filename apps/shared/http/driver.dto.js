import { z } from 'zod';
export const GetDriverSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    phone: z.coerce.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    workShifts: z
        .array(z.object({
        id: z.string(),
        start: z.string(),
        end: z.string(),
        driverId: z.string(),
    }))
        .optional(),
});
export const GetDriversSchema = z.array(GetDriverSchema);
export function fromDomain(driver) {
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
export const DriverLoginResponseSchema = z.object({
    token: z.string(),
});
export const DriverLoginSchema = z.object({
    email: z.string(),
    password: z.string(),
});
