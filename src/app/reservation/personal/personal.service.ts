import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';

import { PersonalDto } from './dto/personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { isToday } from 'date-fns';

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}

  // create(createPersonalDto: CreatePersonalDto) {
  //   return 'This action adds a new personal';
  // }
  listDate(personal: PersonalDto) {
    const originalDate = new Date(personal.data);
    const newDate = new Date(originalDate);
    newDate.setUTCHours(newDate.getUTCHours() + 3);
    const newDateString = newDate.toISOString(); // "2023-03-07T03:00:00.000Z"

    const now = new Date();

    if (isToday(new Date(newDateString))) {
      const hour = new Date().getHours();
      const minute = new Date().getMinutes();
      const nDate = new Date();
      nDate.setUTCHours(nDate.getUTCHours() + -3);

      return this.prisma.reservation.findMany({
        where: {
          date: new Date(personal.data),
          idPerson: personal.idPerson,
          hours: {
            hourStart: {
              gt: new Date(nDate), // filtro para horas maiores que a hora atual
            },
          },
        },
        select: {
          idReservation: true,
          status: true,
          date: true,
          hours: {
            select: {
              idHour: true,
              name: true,
              hourStart: true,
              hourEnd: true,
            },
          },
        },

        orderBy: {
          date: 'asc',
        },
      });
    }
    return this.prisma.reservation.findMany({
      where: {
        date: new Date(personal.data),
        idPerson: personal.idPerson,
      },
      select: {
        idReservation: true,
        status: true,
        date: true,
        hours: {
          select: {
            idHour: true,
            name: true,
            hourStart: true,
          },
        },
      },

      orderBy: {
        date: 'asc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} personal`;
  }

  update(id: number, updatePersonalDto: UpdatePersonalDto) {
    return `This action updates a #${id} personal`;
  }

  remove(id: number) {
    return `This action removes a #${id} personal`;
  }
}
