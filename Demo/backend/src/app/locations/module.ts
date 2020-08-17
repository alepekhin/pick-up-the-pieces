import { LocationsResolver } from './resolvers'
import { Module } from '@nestjs/common'
import { ProductController } from './controller'

@Module({
  providers: [LocationsResolver],
  controllers: [ProductController],
})
export class LocationsModule {}
