import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Device, DeviceInput } from '../../graphql'
import knex from '../database/db'

@Resolver()
export class DevicesResolver {
  @Query()
  async devices(): Promise<Device[]> {
    return knex('devices')
  }

  @Mutation()
  async createDevice(@Args('device') device: DeviceInput): Promise<string> {
    await knex('devices').insert({ device: device.device })
    return 'OK'
  }

  @Mutation()
  async deleteDevice(@Args('device') device: string): Promise<string> {
    await knex('devices').where('device', device).del()
    return 'OK'
  }
}
