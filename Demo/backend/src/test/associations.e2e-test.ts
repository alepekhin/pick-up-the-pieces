import { AssociationInput } from 'src/graphql'
import { AssociationsModule } from '../app/associations/module'
import { AssociationsResolver } from '../app/associations/resolvers'
import { DevicesResolver } from '../app/devices/resolvers'
import { LocationsResolver } from '../app/locations/resolvers'
import { Test } from '@nestjs/testing'
import { v4 as uuidv4 } from 'uuid'
import { createTables } from '../app/database/db'

describe('AssociationsModule', () => {

  let associationsResolver: AssociationsResolver
  let devicesResolver: DevicesResolver
  let locationsResolver: LocationsResolver

  beforeEach(async () => {
    await createTables()
    const moduleRef = await Test.createTestingModule({
      providers: [AssociationsResolver, DevicesResolver, LocationsResolver],
    }).compile()
    associationsResolver = moduleRef.get(AssociationsResolver)
    devicesResolver = moduleRef.get(DevicesResolver)
    locationsResolver = moduleRef.get(LocationsResolver)
  })

  it('should create 1000 associations', async () => {
    for (let i = 0; i < 1000; i++) {
      const locationuuid = 'location-' + uuidv4().substring(0, 10)
      const deviceuuid = 'device-' + uuidv4().substring(0, 10)
          // create device
      const device = { device: deviceuuid }
      await devicesResolver.createDevice(device)
      // create location
      const location = { location: locationuuid }
      await locationsResolver.createLocation(location)
      // create association
      const association = { location: locationuuid, device: deviceuuid }
      await associationsResolver.createAssociation(association as AssociationInput)
    }
  })

  it('should create module', () => {
    expect(AssociationsModule)
  })

})
