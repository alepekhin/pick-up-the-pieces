import { DevicesResolver } from './devices.resolver'
import { Module } from '@nestjs/common'

@Module({
  providers: [DevicesResolver],
})

export class DevicesModule {}
