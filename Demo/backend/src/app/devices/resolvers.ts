import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Device, DeviceInput } from '../../graphql'
import knex from '../database/db'
import { Roles } from '../guards/roles.decorator'

@Resolver()
export class DevicesResolver {

  @Query()
  //@Roles('user', 'admin')
  async devices(
    @Args('limit') limit:number,
    @Args('offset') offset:number,
    @Args('filter') filter?:string

  ): Promise<Device[]> {
    if (filter !== undefined && filter.length > 0 ) {
      return knex('devices').where('device','like','%'+filter+'%').orderBy('device').limit(limit).offset(offset)
    } else {  
      return knex('devices').orderBy('device').limit(limit).offset(offset)
    }
  }

  @Query()
  //@Roles('user', 'admin')
  async location(
    @Args('id') id:string
  ): Promise<Location[]> {
    return knex('devices').where({device: id})
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
