import { DevicesResolver } from './resolvers'
import { Module } from '@nestjs/common'

@Module({
  providers: [DevicesResolver],
})

export class DevicesModule {}
