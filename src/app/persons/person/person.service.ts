import { PrismaService } from './../../../database/prisma.service';
import {
  Injectable,
  HttpException,
  NotFoundException,
  Headers,
  Inject,
} from '@nestjs/common';
import { PersonDto } from './dto/Person-dto';
import { MultiPerson } from './dto/Multi-Person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaClient } from '@prisma/client';
import { AuthFirebaseService } from 'src/microservice/authFirebase.service';
import { emit } from 'process';

@Injectable()
export class PersonService {
  constructor(
    private prisma: PrismaService,
    @Inject(AuthFirebaseService)
    private authfirebase: AuthFirebaseService,
  ) {}

  async create(personDTO: PersonDto) {
    const personExists = await this.prisma.person.findUnique({
      where: {
        tenant_id_profile_cpf: {
          tenant_id: personDTO.tenant_id,
          cpf: personDTO.cpf,
          profile: 'CUSTOMER',
        },
      },
    });

    if (personExists) {
      const update = this.prisma.person.update({
        where: {
          idPerson_tenant_id: {
            idPerson: personExists.idPerson,
            tenant_id: personExists.tenant_id,
          },
        },
        data: {
          name: personDTO.name,
          email: personDTO.email,
          uuid: personDTO.uuid,
          token: personDTO.token,
          cpf: personDTO.cpf,
          dataNascimento: personDTO.dataNascimento,
          phoneNumber: personDTO.phoneNumber,
        },
        select: {
          idPerson: true,
          name: true,
          email: true,
          role: true,
          profile: true,
          tenant_id: true,
          status: true,
        },
      });
      return update;
    } else {
      const user = await this.prisma.person.create({
        data: {
          name: personDTO.name,
          email: personDTO.email,
          uuid: personDTO.uuid,
          token: personDTO.token,
          cpf: personDTO.cpf,
          dataNascimento: personDTO.dataNascimento,
          tenant_id: personDTO.tenant_id,
          phoneNumber: personDTO.phoneNumber,
        },
      });
      return this.prisma.person.findUnique({
        where: {
          idPerson_tenant_id: {
            idPerson: user.idPerson,
            tenant_id: personDTO.tenant_id,
          },
        },
        select: {
          idPerson: true,
          name: true,
          token: true,
          email: true,
          role: true,
          profile: true,
          tenant_id: true,
          status: true,
        },
      });
    }
  }

  async findContract(id: number, tenant_id: number) {
    const hours = await this.prisma.personAppointment.findMany({
      where: {
        idPerson: id,
        tenant_id: tenant_id,
      },
    });
    const invoices = await this.prisma.invoice.findMany({
      where: {
        idPerson: id,
        tenant_id: tenant_id,
      },
    });
    const contract = await this.prisma.contract.findMany({
      where: {
        idPerson: id,
        tenant_id: tenant_id,
      },
    });
    if (!hours) {
      throw new HttpException(`Empresa codigo :${tenant_id}`, 202);
    }
    return { hours, invoices, contract };
    // return this.prisma.contract.aggregate({
    //   where: {
    //     idPerson: id,
    //   },
    //   _count: true,
    // });
  }
  async findOne(idPerson: number, tenant_id: number) {
    //  return idPerson;

    const person = await this.prisma.person.findUniqueOrThrow({
      where: {
        idPerson_tenant_id: {
          idPerson: idPerson,
          tenant_id: tenant_id,
        },
      },
      include: {
        Invoice: {
          include: {
            plans: {
              select: {
                name: true,
              },
            },
            Company: {
              select: {
                NomeEmpresa: true,
              },
            },
          },
        },
        Records: {
          include: {
            PersonalRecords: {},
          },
          orderBy: {
            PersonalRecords: {
              name: 'asc',
            },
          },
        },
        personAppointment: {
          select: {
            idHour: true,
            dayOfWeek: true,
            hour: {
              select: {
                name: true,
                hourStart: true,
                hourEnd: true,
              },
            },
            weekDay: {
              select: {
                name: true,
              },
            },
          },
        },
        Reservation: {
          select: {
            date: true,
            status: true,
            typeReservation: true,
            hours: {
              select: {
                hourStart: true,
                idHour: true,
                hourEnd: true,
              },
            },
          },
        },
      },
    });
    console.log(person.Invoice.length);

    return person;
  }

  // async createMulti(params: MultiPerson) {
  //   const person = this.prisma.person.createMany({ data: params.person });
  //   return person;
  // }

  async findAll(tenant_id: number) {
    return this.prisma.person.findMany({
      select: {
        name: true,
        idPerson: true,
        email: true,
        cpf: true,
      },
      where: {
        tenant_id: tenant_id,
      },
    });
    //return "all Persons";
  }
  findPersons() {}
  async find(params: PersonDto) {}

  async update(id: number, personDTO: UpdatePersonDto, tenant_id: number) {
    const user = await this.prisma.person
      .findUniqueOrThrow({
        where: {
          idPerson_tenant_id: {
            idPerson: id,
            tenant_id: tenant_id,
          },
        },
      })
      .catch(() => {
        throw new HttpException('Cadastrado Usuario Não Localizado', 202);
      });

    if (user) {
      const update = await this.prisma.person
        .update({
          where: {
            idPerson_tenant_id: {
              idPerson: id,
              tenant_id: tenant_id,
            },
          },
          data: {
            name: personDTO.name,
            email: personDTO.email,
            cpf: personDTO.cpf,
            phoneNumber: personDTO.phoneNumber,
            foto: personDTO.foto,
            dataNascimento: personDTO.dataNascimento,
            tenant_id: personDTO.tenant_id,
            token: personDTO.token,
          },
        })
        .then((user) => {
          // name: true,
          // token: true,
          // email: true,
          // role: true,
          // profile: true,
          // tenant_id: true,
          // status: true,

          const idPerson = user.idPerson;
          const name = user.name;
          const email = user.email;
          const role = user.role;
          const token = user.token;
          const profile = user.profile;
          const tenant_id = user.tenant_id;
          const status = user.status;
          const cargo = user.cargo;
          const foto = user.foto;

          const result = {
            idPerson,
            email,
            token,
            status,
            tenant_id,
            profile,
            foto,
            name,
            role,
            cargo,
          };
          return result;
        });
      // funcao de atualizar o firebase

      const userUpdate = await this.authfirebase.updateUser({
        uuid: personDTO.uuid,
        tenant_id: tenant_id,
        name: personDTO.name,
        email: personDTO.email,
        token: personDTO.token,
        cpf: personDTO.cpf.toString(),
        phoneNumber: personDTO.phoneNumber,
      });

      return update;

      //   const person = this.prisma.person
      //     .findUnique({
      //       where: {
      //         idPerson_tenant_id: {
      //           idPerson: id,
      //           tenant_id: tenant_id,
      //         },
      //       },
      //     })
      //     .then((user) => {
      //       //var result = [];
      //       const idPerson = user.idPerson;
      //       const tenant_id = user.tenant_id;
      //       const profile = user.profile;
      //       const cargo = user.cargo;
      //       const foto = user.foto;
      //       const name = user.name;
      //       const email = user.email;
      //       const personRole = user.role;
      //       const tokeh = user.role;

      //       const result = {
      //         idPerson,
      //         email,
      //         tenant_id,
      //         profile,
      //         foto,
      //         name,
      //         personRole,
      //         cargo,
      //       };
      //       return result;
      //     });
      //   return person;
      // }

      //  this.Persons;
    } else {
      return new HttpException('Não Localizado', 202);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
