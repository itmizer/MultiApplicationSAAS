import { PersonModule } from './person/person.module';
import { Module } from '@nestjs/common';
import { PrModule } from './pr/pr.module';
import { PrismaService } from 'src/database/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthFirebaseService } from '../../microservice/authFirebase.service';

@Module({
  imports: [PersonModule, PrModule, UsersModule],

  providers: [PrismaService, AuthFirebaseService],
})
export class PersonsModule {}
