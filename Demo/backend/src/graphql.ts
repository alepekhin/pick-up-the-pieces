
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AssociationInput {
    location: string;
    device: string;
}

export class DeviceInput {
    device: string;
}

export class LocationInput {
    location: string;
}

export class Association {
    location: string;
    device: string;
}

export abstract class IQuery {
    abstract associationsCount(filter?: string): number | Promise<number>;

    abstract associations(limit?: number, offset?: number, filter?: string): Association[] | Promise<Association[]>;

    abstract association(location?: string, device?: string): Association | Promise<Association>;

    abstract devicesCount(filter?: string): number | Promise<number>;

    abstract devices(limit?: number, offset?: number, filter?: string): Device[] | Promise<Device[]>;

    abstract device(id?: string): Device | Promise<Device>;

    abstract locationsCount(filter?: string): number | Promise<number>;

    abstract locations(limit?: number, offset?: number, filter?: string): Location[] | Promise<Location[]>;

    abstract location(id?: string): Location | Promise<Location>;
}

export abstract class IMutation {
    abstract createAssociation(association?: AssociationInput): string | Promise<string>;

    abstract deleteAssociation(association: AssociationInput): string | Promise<string>;

    abstract createDevice(device?: DeviceInput): string | Promise<string>;

    abstract deleteDevice(device: string): string | Promise<string>;

    abstract createLocation(location?: LocationInput): string | Promise<string>;

    abstract deleteLocation(location: string): string | Promise<string>;
}

export class Device {
    device: string;
}

export class Location {
    location: string;
}
