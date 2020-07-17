import { LocationsResolver } from './resolvers'
import { Module } from '@nestjs/common'

@Module({
  providers: [LocationsResolver],
})
export class LocationsModule {}
