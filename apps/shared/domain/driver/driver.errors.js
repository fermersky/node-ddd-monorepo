import { DomainError } from '../domain.errors.js';
export class DriverDoesNotExistError extends DomainError {
    constructor(driverId) {
        super(`Driver with ID or Email ${driverId} not found`);
    }
}
export class CouldNotAuthenticateDriver extends DomainError {
    constructor() {
        super(`Could not authenticate the driver`);
    }
}
