import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Location, LocationInput } from '../../graphql'
import knex from '../database/db'
import { Roles } from '../guards/roles.decorator'

@Resolver()
export class LocationsResolver {

  @Query()
  @Roles('user', 'admin')
  async locations(): Promise<Location[]> {
    return knex('locations')
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
