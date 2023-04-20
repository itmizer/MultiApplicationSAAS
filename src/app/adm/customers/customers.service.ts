import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll(tenant_id: number) {
    return this.prisma.person
      .findMany({
        select: {
          idPerson: true,
          profile: true,
          status: true,
          dateActive: true,
          name: true,
        },
        where: {
          tenant_id: tenant_id,
          profile: 'CUSTOMER',
        },
        orderBy: {
          name: 'asc',
        },
      })
      .then((personCompanies) =>
        personCompanies.map((personCompany) => ({
          ...personCompany,
          name: personCompany.name,
        })),
      );
  }

  async findOne(tenant_id: number, id: number) {
    const currentMonth = new Date();
    const today = new Date().toISOString();
    console.log(today);

    const dataEnd = new Date();
    dataEnd.setDate(currentMonth.getDate() - 90);
    //    return currentMonth;
    const userDetail = await this.prisma.person
      .findFirstOrThrow({
        where: {
          idPerson: id,
          tenant_id: tenant_id,
        },
        include: {
          Invoice: {
            where: {
              tenant_id: tenant_id,
              status: {
                notIn: 'Cancelada',
              },
            },
            orderBy: {
              dateStart: 'desc',
            },
            include: {
              plans: {
                select: {
                  name: true,
                },
              },
            },
          },
          Reservation: {
            include: {
              hours: {
                select: {
                  hourStart: true,
                },
              },
            },
            where: {
              tenant_id: tenant_id,
              date: {
                gte: dataEnd,
                lte: today,
              },
            },
            orderBy: {
              date: 'asc',
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
                },
              },
              weekDay: {
                select: {
                  name: true,
                },
              },
            },
          },
          Records: {
            include: {
              PersonalRecords: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: {
              PersonalRecords: {
                name: 'asc',
              },
              //cargaLbs: 'desc',
              // cargakgs: 'desc',
              // tempo: 'asc',
              // reps: 'desc',
            },
          },
        },
      })
      .catch(() => {
        throw new HttpException(`Não possui Cadastro`, 202);
        //throw new NotFoundException( `E-mail não Consta em nossa base de dados  ${email} does not exist.`);
      });
    return userDetail;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
