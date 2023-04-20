import {
  Injectable,
  HttpException,
  NotFoundException,
  Inject,
  Headers,
} from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { AuthFirebaseService } from '../../../microservice/authFirebase.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(AuthFirebaseService)
    private prisma: PrismaService,
    private authfirebase: AuthFirebaseService,
  ) {}

  async findAll(tenant_id: number) {
    const users = await this.authfirebase.getUsers(tenant_id);
    return users;

    //return "all Persons";
  }
  async find(tenant_id: number, user: string) {
    return this.authfirebase.findUser(tenant_id, user);
  }
  // async update(tenant_id: number, user: string) {
  //   return this.authfirebase.updateUser(tenant_id, user);
  // }

  async updateMany(tenant_id: number) {
    const users = await this.prisma.person.findMany({
      where: {
        AND: [
          {
            tenant_id: tenant_id,
          },
          {
            uuid: null,
          },
        ],
        // tenant_id: tenant_id,
      },
    });

    for (const user of users) {
      const firebaseUser = await this.authfirebase.getEmail(
        tenant_id,
        user.email,
      );
      if (firebaseUser) {
        // console.log(
        //   'Nome: ',
        //   user.name,
        //   user.email,
        //   ' UUID:',
        //   firebaseUser.uid,
        // );
        const update = await this.prisma.person.update({
          where: {
            email_tenant_id_cpf: {
              email: firebaseUser.email,
              tenant_id: user.tenant_id,
              cpf: user.cpf,
            },
          },
          data: {
            uuid: firebaseUser.uid,
          },
        });
        console.log(update);
      }
    }
  }
}
