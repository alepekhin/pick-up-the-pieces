import { DevicesModule } from './module'
import { DevicesResolver } from './resolvers'
import { Test } from '@nestjs/testing'
import { v4 as uuidv4 } from 'uuid'

describe('DevicesModule', () => {

  let devicesResolver: DevicesResolver
  const uuid = uuidv4()

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DevicesResolver],
    }).compile()
    devicesResolver = moduleRef.get(DevicesResolver)
  })

  it(`should create, find and delete Device ${uuid}`, async () => {
    const expected = { device: uuid }
    await devicesResolver.createDevice(expected)
    let devices = await devicesResolver.devices()
    expect(devices).toEqual(expect.arrayContaining([expected]))
    await devicesResolver.deleteDevice(uuid)
    devices = await devicesResolver.devices()
    expect(devices).not.toEqual(expect.arrayContaining([expected]))
  })

  it('should create module', () => {
    expect(DevicesModule)
  })

})
