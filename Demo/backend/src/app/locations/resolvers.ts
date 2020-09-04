import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Location, LocationInput } from '../../graphql'
import knex from '../database/db'
import { Roles } from '../guards/roles.decorator'

@Resolver()
export class LocationsResolver {

  @Query()
  //@Roles('user', 'admin')
  async locations(
    @Args('limit') limit:number,
    @Args('offset') offset:number,
    @Args('filter') filter?:string
  ): Promise<Location[]> {
    if (filter !== undefined && filter.length > 0 ) {
      return knex('locations').where('location','like','%'+filter+'%').orderBy('location').limit(limit).offset(offset)
    } else {  
      return knex('locations').orderBy('location').limit(limit).offset(offset)
    }
  }

  @Query()
  //@Roles('user', 'admin')
  async location(
    @Args('id') id:string
  ): Promise<Location[]> {
    return knex('locations').where({location: id})
  }

  @Mutation()
  @Roles('admin')
  async createLocation(
    @Args('location') location: LocationInput,
  ): Promise<string> {
    await knex('locations').insert({ location: location.location })
    return 'OK'
  }

  @Mutation()
  @Roles('admin')
  async deleteLocation(@Args('location') location: string): Promise<string> {
    await knex('locations').where('location', location).del()
    return 'OK'
  }
}
