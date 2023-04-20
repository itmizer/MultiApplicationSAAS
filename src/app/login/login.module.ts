import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';

@Module({
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('login');
  }
}
