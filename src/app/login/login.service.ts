import { HttpException, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'src/database/prisma.service';
import { log } from 'console';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async findEmail(email: string, tenant_id: number) {
    const person = this.prisma.person
      .findFirstOrThrow({
        where: {
          email: email,
          tenant_id: tenant_id,
        },
      })
      .then((user) => {
        //var result = [];
        const idPerson = user.idPerson;
        const tenant_id = user.tenant_id;
        const profile = user.profile;
        const cargo = user.cargo;
        const foto = user.foto;
        const name = user.name;
        const email = user.email;
        const role = user.role;

        const result = {
          idPerson,
          email,
          tenant_id,
          profile,
          foto,
          name,
          role,
          cargo,
        };
        return result;
      })
      .catch(() => {
        throw new HttpException(
          `E-mail: ${email} não Consta em nossa base de dados. Deseja Realizar Cadastro?`,
          202,
        );
        //throw new NotFoundException( `E-mail não Consta em nossa base de dados  ${email} does not exist.`);
      });

    return person;
  }
}
