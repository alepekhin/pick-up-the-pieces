import { AssociationsModule } from './app/associations/module'
import { DevicesModule } from './app/devices/module'
import { GraphQLModule } from '@nestjs/graphql'
import { LocationsModule } from './app/locations/module'
import { Module } from '@nestjs/common'
import { join } from 'path'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './app/guards/roles.guard'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req,res }) => {
        return {req, res}
      },
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
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
