import { LocationsResolver } from './resolvers'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ProductController } from './controller'
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [LocationsResolver],
  controllers: [ProductController],
})

export class LocationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/service/admin');
  }
}
