import { LocationsModule } from '../app/locations/module'
import { LocationsResolver } from '../app/locations/resolvers'
import { Test } from '@nestjs/testing'
import { v4 as uuidv4 } from 'uuid'
import { createTables } from '../app/database/db'

describe('LocationsModule', () => {

  let locationsResolver: LocationsResolver
  const uuid = uuidv4()

  beforeEach(async () => {
    await createTables()
    const moduleRef = await Test.createTestingModule({
      providers: [LocationsResolver],
    }).compile()
    locationsResolver = moduleRef.get(LocationsResolver)
  })

  it(`should create, find and delete location ${uuid}`, async () => {
    const expected = { location: uuid }
    await locationsResolver.createLocation(expected)
    let locations = await locationsResolver.locations()
    expect(locations).toEqual(expect.arrayContaining([expected]))
    await locationsResolver.deleteLocation(uuid)
    locations = await locationsResolver.locations()
    expect(locations).not.toEqual(expect.arrayContaining([expected]))
  })

  it('should create module', () => {
    expect(LocationsModule)
  })

})
