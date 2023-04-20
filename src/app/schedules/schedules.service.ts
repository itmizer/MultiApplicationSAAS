import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

import { ScheduleDto } from './dto/schedule.dto';
import { ServicesDto } from './dto/Services.dto';
import { getDay, parseISO, startOfWeek } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

import { ScheduleHourDto } from './dto/scheduleHour.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}
  async create(params: CreateScheduleDto) {
    //return params;
    const newHour = await this.prisma.schedule.create({
      data: params,
    });
    return newHour;
  }

  findDetail(schedule: ScheduleHourDto, tentant_id: number) {
    return this.prisma.schedule.findFirst({
      where: {
        AND: {
          tenant_id: tentant_id,
          idHour: schedule.idHour,
          status: 'Ativo',
        },
      },
      select: {
        idHour: true,
        name: true,
        hourStart: true,
        status: true,
        vacancy: true,
        typeHour: true,
        Reservation: {
          select: {
            idReservation: true,
            idPerson: true,
            Invoice: true,
            date: true,
            status: true,
            experimental: true,
            tenant_id: true,
            Person: {
              select: {
                name: true,
                foto: true,
              },
            },
          },
          where: {
            date: schedule.date,
            status: {
              notIn: ['Cancelado', 'Cancelada'],
            },
          },
        },
      },
    });
  }
  findAll(tentant_id: number) {
    return this.prisma.schedule.findMany({
      where: {
        AND: {
          tenant_id: tentant_id,
          status: 'Ativo',
        },
      },
    });
  }

  async findHour(params: ScheduleDto) {
    // console.log(dayOfWeekNumber);

    if (params.profile === 'CUSTOMER') {
      const invoices = await this.findInvoice(params);

      if (invoices) {
        const services = invoices
          .flatMap((invoice) => {
            return invoice.plans.planServices;
          })
          .map((planService) => {
            return planService.idService;
          });

        const hours = await this.listHourCustomer(params, services);
        return hours;
      }
    } else {
      const hours = await this.listHourStaff(params);
      try {
        return hours;
      } catch (err) {
        throw new HttpException('Sem Horários', HttpStatus.ACCEPTED);
      }
      return hours;
    }
    //console.log(params.profile);
  }

  async listHourCustomer(params: ScheduleDto, services) {
    const date = new Date(params.date);
    const hour = new Date();

    const currentTime = hour.toLocaleTimeString();

    const saoPauloTimeZone = 'America/Sao_Paulo';
    const dateSearch = utcToZonedTime(date, saoPauloTimeZone);

    date.setUTCHours(+3);
    const dayOfWeek = date.getDay() + 1; // retorna um número de 0 a 6

    const schedules = await this.prisma.schedule.findMany({
      where: {
        tenant_id: params.tenant_id,
        status: 'Ativo',
        //   hourStart: { gte: currentTime },
        service: {
          in: services,
        },
        HourWeek: {
          some: {
            dayOfWeek: dayOfWeek,
          },
        },
      },
      include: {
        HourWeek: {
          where: {
            dayOfWeek: dayOfWeek,
          },
        },
      },
      orderBy: {
        hourStart: 'asc',
      },
    });

    return schedules;
  }

  async listHourStaff(params: ScheduleDto) {
    const date = new Date(params.date);
    const hours = new Date();

    //const currentTime = hour.toLocaleTimeString();

    const saoPauloTimeZone = 'America/Sao_Paulo';
    const dateSearch = utcToZonedTime(date, saoPauloTimeZone);

    date.setUTCHours(+3);
    const dayOfWeek = date.getDay() + 1; // retorna um número de 0 a 6

    const hour = await this.prisma.schedule
      .findMany({
        where: {
          tenant_id: params.tenant_id,
          HourWeek: {
            some: {
              dayOfWeek: dayOfWeek,
            },
          },
        },

        orderBy: {
          hourStart: 'asc',
        },
      })
      .then((hour) => {
        return hour;
      })
      .catch(() => {
        throw new HttpException('Cadastro Não Localizado', 202);
      });
    return hour;
  }

  async findInvoice(params: ScheduleDto) {
    const date = new Date(params.date);
    const invoices = await this.prisma.invoice.findMany({
      where: {
        dateStart: { lte: date },
        idPerson: params.idPerson,
        dtEnd: { gte: date },
      },
      include: {
        plans: {
          include: {
            planServices: {
              select: {
                idService: true,
              },
            },
          },
        },
      },
    });

    if (!invoices || invoices.length === 0) {
      throw new HttpException('Não Possui Fatura Ativa', HttpStatus.ACCEPTED);
    }

    // const activeInvoices = invoices.filter(
    //   (invoice) => !invoice.dtDue || invoice.dtDue >= date,
    //   (invoice) => invoice.dtDue <= date || invoice.status === 'Paga',
    // );
    const activeInvoices = invoices.filter((invoice) => {
      if (invoice.dtDue < date) {
        //    console.log('menor igual');
        if (invoice.status === 'Paga') {
          return true;
        } else {
          return false;
        }
      } else {
        //      console.log('pode seguir');

        return true; // Retorna false caso contrário
      }
    });
    console.log('Data:', date);

    //  console.log(activeInvoices);

    if (activeInvoices.length === 0) {
      throw new HttpException('Fatura Vencida', HttpStatus.ACCEPTED);
    }
    return activeInvoices;
  }
}
