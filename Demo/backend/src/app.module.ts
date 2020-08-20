import { AssociationsModule } from './app/associations/module'
import { DevicesModule } from './app/devices/module'
import { GraphQLModule } from '@nestjs/graphql'
import { LocationsModule } from './app/locations/module'
import { Module } from '@nestjs/common'
import { join } from 'path'
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from './auth/index';
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'demo',
      clientId: 'demo-backend',
      secret: 'f3e99916-c6c3-4c84-abab-6ad69db92bdf',
      // optional if you want to retrieve JWT from cookie
      //cookieKey: 'KEYCLOAK_JWT',
    }),
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
  controllers: [
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
