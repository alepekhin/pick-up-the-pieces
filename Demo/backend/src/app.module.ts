import { AssociationsModule } from './app/associations/module'
import { DevicesModule } from './app/devices/module'
import { GraphQLModule } from '@nestjs/graphql'
import { LocationsModule } from './app/locations/module'
import { Module } from '@nestjs/common'
import { join } from 'path'
// import { KeycloakModule } from './keycloak.module'

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
    // KeycloakModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
