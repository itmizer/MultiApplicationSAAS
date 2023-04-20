import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [FirebaseController],
  providers: [FirebaseService, PrismaService],
})
export class FirebaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('firebase');
  }
}
