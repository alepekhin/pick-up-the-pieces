import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Device, DeviceInput } from '../../graphql'
import knex from '../database/db'
import { Roles } from '../guards/roles.decorator'

@Resolver()
export class DevicesResolver {

  @Query()
  @Roles('user', 'admin')
  async devicesCount(
    @Args('filter') filter?:string
  ): Promise<any> {
    let result = []
    if (filter !== undefined && filter.length > 0 ) {
      result =  await knex('devices').where('location','like','%'+filter+'%').count()  // [{"count(*)":1276}]
    } else {  
      result =  await knex('devices').count()  // [{"count(*)":1276}]
    }
    return result[0]['count(*)']
  }

  @Query()
  @Roles('user', 'admin')
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
  @Roles('user', 'admin')
  async device(
    @Args('id') id:string
  ): Promise<Device[]> { // knex always returns array
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
