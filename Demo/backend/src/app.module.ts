import { AssociationsModule } from './app/associations/module'
import { DevicesModule } from './app/devices/module'
import { GraphQLModule } from '@nestjs/graphql'
import { LocationsModule } from './app/locations/module'
import { Module } from '@nestjs/common'
import { join } from 'path'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    LocationsModule,
    DevicesModule,
    AssociationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
