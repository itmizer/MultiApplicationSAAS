import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateFixedDto } from './dto/create-fixed.dto';
import { UpdateFixedDto } from './dto/update-fixed.dto';

@Injectable()
export class FixedService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number, tenant_id: number) {
    const schedule = await this.prisma.schedule.findMany({
      where: {
        tenant_id: tenant_id,
        HourWeek: {
          some: {
            dayOfWeek: id,
          },
        },
      },
      select: {
        idHour: true,
        name: true,
        hourStart: true,
        status: true,
        HourWeek: {
          select: {
            coach: true,
            vacancy: true,
            dayOfWeek: true,
          },
          where: {
            dayOfWeek: id,
          },
        },
        PersonAppointment: {
          where: {
            dayOfWeek: id,
          },
          include: {
            person: {
              select: {
                idPerson: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return schedule;

    //   return this.prisma.hourWeek.findMany({
    //     where: {
    //       dayOfWeek: id,
    //       hours: {
    //         tenant_id: tenant_id,
    //       },
    //     },
    //     select: {
    //       idHour: true,
    //       dayOfWeek: true,
    //       vacancy: true,
    //       hours: {
    //         include: {
    //           PersonAppointment: {
    //             include: {
    //               person: {
    //                 select: {
    //                   name: true,
    //                 },
    //               },
    //             },
    //             where: {
    //               tenant_id: tenant_id,
    //               dayOfWeek: id,
    //             },
    //           },
    //         },
    //       },
    //     },
    //     orderBy: {
    //       hours: {
    //         hourStart: 'asc',
    //       },
    //     },
    //   });
  }
}
