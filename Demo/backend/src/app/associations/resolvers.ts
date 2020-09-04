import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Association, AssociationInput } from '../../graphql'
import knex from '../database/db'
import { Roles } from '../guards/roles.decorator'

@Resolver()
export class AssociationsResolver {

  @Query()
  //@Roles('user', 'admin')
  async associationsCount(
    @Args('filter') filter?:string
  ): Promise<any> {
    let result = []
    if (filter !== undefined && filter.length > 0 ) {
      result =  await knex('associations').where('location','like','%'+filter+'%').count()  // [{"count(*)":1276}]
    } else {  
      result =  await knex('associations').count()  // [{"count(*)":1276}]
    }
    return result[0]['count(*)']
  }

  @Query()
  //@Roles('user', 'admin')
  async associations(
    @Args('limit') limit:number,
    @Args('offset') offset:number,
    @Args('filter') filter?:string
  ): Promise<Association[]> {
    if (filter !== undefined && filter.length > 0 ) {
      return knex('associations').where('location','like','%'+filter+'%').orderBy('location').limit(limit).offset(offset)
    } else {  
      return knex('associations').orderBy('location').limit(limit).offset(offset)
    }
  }

  @Query()
  //@Roles('user', 'admin')
  async association(
    @Args('lid') locationID:number,
    @Args('did') deviceID:number
  ): Promise<Association[]> {
      return knex('associations').where({location: locationID, device: deviceID})
  }

  @Mutation()
  //@Roles('admin')
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
  //@Roles('admin')
  async deleteAssociation(
    @Args('association') association: AssociationInput,
  ): Promise<string> {
    await knex('associations')
      .where({ location: association.location, device: association.device })
      .del()
    return 'OK'
  }
}
