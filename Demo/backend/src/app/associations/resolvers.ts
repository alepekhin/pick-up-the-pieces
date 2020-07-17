import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Association, AssociationInput } from '../../graphql'
import knex from '../database/db'

@Resolver()
export class AssociationsResolver {
  @Query()
  async associations(): Promise<Association[]> {
    return knex('associations')
  }

  @Mutation()
  async createAssociation(
    @Args('association') association: AssociationInput,
  ): Promise<string> {
    await knex('associations').insert({
      location: association.location,
      device: association.device,
    })
    return 'OK'
  }

  @Mutation()
  async deleteAssociation(
    @Args('association') association: AssociationInput,
  ): Promise<string> {
    await knex('associations')
      .where({ location: association.location, device: association.device })
      .del()
    return 'OK'
  }
}