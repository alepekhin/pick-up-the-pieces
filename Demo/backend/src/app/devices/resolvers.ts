import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Device, DeviceInput } from '../../graphql'
import knex from '../database/db'
import { Roles } from '../guards/roles.decorator'

@Resolver()
export class DevicesResolver {

  @Query()
  @Roles('user', 'admin')
  async devices(): Promise<Device[]> {
    return knex('devices')
  }

  @Mutation()
  @Roles('admin')
  async createDevice(@Args('device') device: DeviceInput): Promise<string> {
    await knex('devices').insert({ device: device.device })
    return 'OK'
  }

  @Mutation()
  @Roles('admin')
  async deleteDevice(@Args('device') device: string): Promise<string> {
    await knex('devices').where('device', device).del()
    return 'OK'
  }
}
