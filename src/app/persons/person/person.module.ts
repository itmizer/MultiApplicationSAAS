import { AuthFirebaseService } from '../../../microservice/authFirebase.service';
import { PrismaService } from './../../../database/prisma.service';
import { PersonsController } from './person.controller';
import { PersonService } from './person.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantMiddleware } from '../../../tenant/tenant.middleware';
@Module({
  controllers: [PersonsController],
  providers: [PersonService, PrismaService, AuthFirebaseService],
})
export class PersonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('person');
  }
}
