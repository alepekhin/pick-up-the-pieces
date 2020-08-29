import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Location, LocationInput } from '../../graphql'
import knex from '../database/db'
import { UseGuards } from '@nestjs/common'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../guards/roles.decorator'

@Resolver()
export class LocationsResolver {

  @Query()
  //@UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles('admin')
  async locations(): Promise<Location[]> {
    return knex('locations')
  }

  @Mutation()
  async createLocation(
    @Args('location') location: LocationInput,
  ): Promise<string> {
    await knex('locations').insert({ location: location.location })
    return 'OK'
  }

  @Mutation()
  async deleteLocation(@Args('location') location: string): Promise<string> {
    await knex('locations').where('location', location).del()
    return 'OK'
  }
}
