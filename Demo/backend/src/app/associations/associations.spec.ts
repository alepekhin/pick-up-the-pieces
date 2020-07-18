import { AssociationInput } from 'src/graphql'
import { AssociationsModule } from './module'
import { AssociationsResolver } from './resolvers'
import { DevicesResolver } from '../devices/resolvers'
import { LocationsResolver } from '../locations/resolvers'
import { Test } from '@nestjs/testing'
import { v4 as uuidv4 } from 'uuid'

describe('AssociationsModule', () => {

  let associationsResolver: AssociationsResolver
  let devicesResolver: DevicesResolver
  let locationsResolver: LocationsResolver
  const locationuuid = uuidv4()
  const deviceuuid = uuidv4()

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AssociationsResolver, DevicesResolver, LocationsResolver],
    }).compile()
    associationsResolver = moduleRef.get(AssociationsResolver)
    devicesResolver = moduleRef.get(DevicesResolver)
    locationsResolver = moduleRef.get(LocationsResolver)
  })

  it('should create, find and delete association', async () => {
    // create device
    const device = { device: deviceuuid }
    await devicesResolver.createDevice(device)
    // create location
    const location = { location: locationuuid }
    await locationsResolver.createLocation(location)
    // create association
    const association = { location: locationuuid, device: deviceuuid }
    await associationsResolver.createAssociation(association as AssociationInput)
    // test
    let associations = await associationsResolver.associations()
    expect(associations).toEqual(expect.arrayContaining([association]))
    await associationsResolver.deleteAssociation(association as AssociationInput)
    associations = await associationsResolver.associations()
    expect(associations).not.toEqual(expect.arrayContaining([association]))
    // cleaning
    await devicesResolver.deleteDevice(deviceuuid)
    await locationsResolver.deleteLocation(locationuuid)
  })

  it('should create module', () => {
    expect(AssociationsModule)
  })

})
