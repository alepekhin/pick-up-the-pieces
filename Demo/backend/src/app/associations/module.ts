import { AssociationsResolver } from './resolvers'
import { Module } from '@nestjs/common'

@Module({
  providers: [AssociationsResolver],
})

export class AssociationsModule {}
