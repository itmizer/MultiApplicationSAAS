import { HttpException, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { PrismaService } from 'src/database/prisma.service';
import { AppointmentDTO } from './dto/appointment.dto';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';
import { getDay, isToday, parseISO, startOfWeek, daysInWeek } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

import { WeekReservationDto } from './dto/week-reservation.dto';

interface HourWeek {
  idHourWeek: number;
  dayOfWeek: number;
  vacancy: number;
  hours: {
    idHour: number;
    name: string;
    hourStart: string;
    service: string;
    PersonAppointment: {
      idPerson: number;
    }[];
  }[];
}
@Injectable()
export class WeekService {
  reservations: any;

  constructor(private prisma: PrismaService) {}
  create(createWeekDto: CreateWeekDto) {
    return 'This action adds a new week';
  }

  findAll(tenant_id) {
    return this.prisma.calendarWeek.findMany({
      where: {
        AND: {
          tenant_id: tenant_id,
          typeDay: true,
        },
      },
    });
    return `This action returns all week`;
  }

  findWeek(tenant_id: number) {
    const today = new Date();
    const startDay = new Date(today);
    startDay.setDate(today.getDate() - today.getDay());
    console.log(startDay);

    const firstDayOfWeek = startOfWeek(today, { weekStartsOn: 0 });

    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 7),
    );
    console.log(endOfWeek);
    return this.prisma.calendar.findMany({
      select: {
        date: true,
        type: true,
        year: true,
        weekday: true,
        weekname: true,
        month: true,
        day: true,
      },
      where: {
        AND: [
          { date: { gte: startDay } },
          { date: { lte: endOfWeek } },
          { tenant_id: tenant_id },
          { type: true },
        ],
      },
    });
  }

  async findWeekReservation(
    tenant_id: number,
    reservationDTO: WeekReservationDto,
  ) {
    const today = new Date();
    const firstDayOfWeek = startOfWeek(today, { weekStartsOn: 0 });

    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6),
    );
    //return reservationDTO;
    console.log(reservationDTO.profile);

    if (reservationDTO.profile == 'STAFF') {
      this.reservations = await this.prisma.calendar.findMany({
        select: {
          date: true,
          type: true,

          weekday: true,
          weekname: true,
          Reservation: {
            select: {
              date: true,
              idHour: true,
              status: true,
              idPerson: true,
            },
          },
        },
        where: {
          AND: [
            { date: { gte: firstDayOfWeek } },
            { date: { lte: endOfWeek } },
            { tenant_id: tenant_id },
            { type: true },
          ],
        },
      });
    } else {
      console.log('Sou: ', reservationDTO.profile);

      this.reservations = await this.prisma.calendar.findMany({
        select: {
          date: true,
          type: true,

          weekday: true,
          weekname: true,
          Reservation: {
            select: {
              date: true,
              idHour: true,
              status: true,
              idPerson: true,
            },

            where: {
              idPerson: reservationDTO.idPerson,
            },
          },
        },
        where: {
          AND: [
            { date: { gte: firstDayOfWeek } },
            { date: { lte: endOfWeek } },
            { tenant_id: tenant_id },
            { type: true },
          ],
        },
      });
    }
    const counts = this.reservations.reduce((acc, curr) => {
      curr.Reservation.forEach((r) => {
        acc[r.status]++;
      });
      return acc;
    }, {});

    const result = this.reservations.map((r) => ({
      ...r,
      ...Object.keys(counts).reduce((acc, curr) => {
        acc[curr] = r.Reservation.filter((x) => x.status === curr).length;
        return acc;
      }, {}),
    }));

    return result;

    // return this.reservations.map((item) => ({
    //   ...item,
    //   Reservation: item.Reservation.length,
    // }));
  }

  async find(date: Date, tenant_id: number) {
    const saoPauloTimeZone = 'America/Sao_Paulo';
    const dateSearch = utcToZonedTime(date, saoPauloTimeZone);

    date.setUTCHours(+3);
    const dayOfWeek = date.getDay() + 1; // retorna um número de 0 a 6

    const hours = await this.prisma.hourWeek.findMany({
      where: {
        dayOfWeek: dayOfWeek,
        hours: {
          tenant_id: tenant_id,
          status: 'ativo',
        },
      },
      include: {
        hours: {
          select: {
            idHour: true,
            name: true,
            hourStart: true,
            service: true,
            Reservation: {
              select: {
                idPerson: true,
                Person: {
                  select: {
                    name: true,
                    foto: true,
                  },
                },
              },
              where: {
                AND: {
                  date: dateSearch,
                  tenant_id: tenant_id,
                  status: { notIn: 'Cancelado' },
                },
              },
            },
          },
        },
      },
    });

    const promises = hours.map(async (hour) => {
      const count = hour.hours.Reservation
        ? hour.hours.Reservation.filter((r) => !!r).length
        : 0;

      return { ...hour, count };
    });

    const hoursWithCount = await Promise.all(promises);

    const filteredHours = hoursWithCount.filter(
      (hour) => hour.count < hour.vacancy,
    );

    return filteredHours;
  }

  findOne(id: number, tenant_id: number) {
    return this.prisma.personAppointment.findMany({
      where: {
        AND: { tenant_id: tenant_id, idPerson: id },
      },
      select: {
        code: true,
        idHour: true,
        dayOfWeek: true,
        idPerson: true,
        hour: { select: { name: true } },
        weekDay: { select: { name: true } },
      },
    });
  }

  findHour(dayOfWeek: number, tenant_id: number) {
    return this.prisma.hourWeek.findMany({
      where: { dayOfWeek: dayOfWeek, tenant_id: tenant_id },
      select: {
        idHour: true,
        dayOfWeek: true,
        vacancy: true,
        tenant_id: true,
        hours: {
          select: {
            name: true,
            idHour: true,
            hourStart: true,
            hourEnd: true,
            typeHour: true,
            PersonAppointment: {
              select: {
                idPerson: true,
                idHour: true,
              },

              where: {
                AND: {
                  dayOfWeek: dayOfWeek,
                  tenant_id: tenant_id,
                },
              },
            },
          },
        },
      },
    });
  }

  async createAppointmentMany(appointmentDTO: AppointmentDTO) {
    if (Array.isArray(appointmentDTO.idPerson)) {
      const appointments = appointmentDTO.idPerson.map((id) => ({
        idHour: appointmentDTO.idHour,
        dayOfWeek: appointmentDTO.dayOfWeek,
        idPerson: id,
        tenant_id: appointmentDTO.tenant_id,
      }));

      const appointment = await this.prisma.personAppointment.createMany({
        data: appointments,
      });
      // aqui você pode usar o método createMany do Prisma para criar os registros
      return appointment;
    }
    const appointment = await this.prisma.personAppointment.createMany({
      data: appointmentDTO,
    });

    if (!appointment) {
      throw new HttpException('Cadastro Não Realizado', 202);
    }
    throw new HttpException('Cadastro Realizado', 200);
  }

  async deleteAppointment(id: number) {
    const deleteAppointment = await this.prisma.personAppointment.delete({
      where: { code: id },
    });

    if (deleteAppointment) {
      throw new HttpException(`O horario  foi excluido?`, 200);
    }
    throw new HttpException(`O horario não foi excluido?`, 202);
  }

  remove(id: number) {
    return `This action removes a #${id} week`;
  }
}
