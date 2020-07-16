import { LocationsResolver } from './locations.resolver'
import { Module } from '@nestjs/common'

@Module({
  providers: [LocationsResolver],
})

export class LocationsModule {}
