import { AssociationsResolver } from './associations.resolver'
import { Module } from '@nestjs/common'

@Module({
  providers: [AssociationsResolver],
})

export class AssociationsModule {}
