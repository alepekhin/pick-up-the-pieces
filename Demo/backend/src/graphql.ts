/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AssociationInput {
  location: string
  device: string
}

export class DeviceInput {
  device: string
}

export class LocationInput {
  location: string
}

export class Association {
  location: string
  device: string
}

export abstract class IQuery {
  abstract associations(): Association[] | Promise<Association[]>

  abstract devices(): Device[] | Promise<Device[]>

  abstract locations(): Location[] | Promise<Location[]>
}

export abstract class IMutation {
  abstract createAssociation(
    association?: AssociationInput,
  ): string | Promise<string>

  abstract deleteAssociation(
    association: AssociationInput,
  ): string | Promise<string>

  abstract createDevice(device?: DeviceInput): string | Promise<string>

  abstract deleteDevice(device: string): string | Promise<string>

  abstract createLocation(location?: LocationInput): string | Promise<string>

  abstract deleteLocation(location: string): string | Promise<string>
}

export class Device {
  device: string
}

export class Location {
  location: string
}
