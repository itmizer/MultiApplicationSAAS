import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TenantMiddleware } from '../../../tenant/tenant.middleware';

import { AuthFirebaseService } from 'src/microservice/authFirebase.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthFirebaseService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('users');
  }
}
