import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { connect } from 'http2';
import { disconnect } from 'process';
import { PrismaService } from 'src/database/prisma.service';

import { NewHourWeekDto } from './dto/new-hour-week.dto';
import { UpdateHourWeekDto } from './dto/update-hour-week.dto';
import { Hour } from './entities/hour.entity';

@Injectable()
export class HoursService {
  constructor(private prisma: PrismaService) {}
  async create(newHour: NewHourWeekDto) {
    await this.prisma.schedule.create({
      data: {
        tenant_id: newHour.tenant_id,
        name: newHour.name,
        hourStart: newHour.hourStart,
        hourEnd: newHour.hourEnd,
        vacancy: newHour.vacancy,
        status: newHour.status,
        typeHour: newHour.typeHour,
        service: newHour.service,
        HourWeek: {
          create: newHour.HourWeek.map((week) => ({
            dayOfWeek: week.dayOfWeek,
            coach: week.coach,
          })),
        },
      },
    });
    throw new HttpException('Atualizado Com Sucesso', 201);
  }

  findAll(tentant_id: number) {
    return this.prisma.schedule.findMany({
      where: {
        tenant_id: tentant_id,
        HourWeek: {
          every: {},
        },
      },
      include: {
        HourWeek: {},
      },
    });
  }

  async findOne(id: number, tenant_id: number) {
    return await this.prisma.schedule.findFirstOrThrow({
      where: {
        idHour: id,
        tenant_id: tenant_id,
        HourWeek: {
          every: {},
        },
      },
      include: {
        HourWeek: {},
      },
    });
  }

  async update(id: number, updateHourDTO: NewHourWeekDto) {
    const existingSchedule = await this.prisma.schedule.findFirstOrThrow({
      where: {
        idHour: id,
        HourWeek: {
          every: {},
        },
      },
      include: {
        HourWeek: {},
      },
    });

    if (!existingSchedule) {
      throw new NotFoundException(`Parent with id ${id} not found`);
    }

    const existingHourWeekIds = existingSchedule.HourWeek.map((hourWeek) => {
      return {
        idhour: hourWeek.idHour,
        dayOfWeek: hourWeek.dayOfWeek,
        //   coach: hourWeek.coach,
      };
    });

    const HourDisconnect = existingHourWeekIds.filter((existingHourWeek) => {
      const matchingWeek = updateHourDTO.HourWeek.find((week) => {
        return (
          week.dayOfWeek === existingHourWeek.dayOfWeek
          //  &&
          // week.coach === existingHourWeek.coach
        );
      });
      return !matchingWeek;
    });
    //return HourDisconnect;
    const HourWeekIdsToConnect = updateHourDTO.HourWeek.filter(
      (newHourWeek) => {
        const matchingWeek = existingHourWeekIds.find(
          (existingHourWeek) =>
            existingHourWeek.dayOfWeek === newHourWeek.dayOfWeek,
          //  &&
          // existingHourWeek.coach === newHourWeek.coach,
        );
        return !matchingWeek;
      },
    );

    await this.prisma.schedule.update({
      where: {
        idHour_tenant_id: {
          idHour: id,
          tenant_id: updateHourDTO.tenant_id,
        },
      },
      data: {
        tenant_id: updateHourDTO.tenant_id,
        name: updateHourDTO.name,
        hourStart: updateHourDTO.hourStart,
        hourEnd: updateHourDTO.hourEnd,
        vacancy: updateHourDTO.vacancy,
        status: updateHourDTO.status,
        typeHour: updateHourDTO.typeHour,
        service: updateHourDTO.service,
        HourWeek: {
          deleteMany: {},
          create: updateHourDTO.HourWeek.map((week) => ({
            dayOfWeek: week.dayOfWeek,
            coach: week.coach,
          })),
        },
      },
    });

    throw new HttpException('Atualizado Com Sucesso', 201);
  }
  async cancel(id: number, tenant_id: number) {
    const existingSchedule = await this.prisma.schedule.findFirst({
      where: {
        idHour: id,
        tenant_id: tenant_id,
      },
    });

    if (!existingSchedule) {
      throw new NotFoundException(`Horário Não Existe`);
    }

    await this.prisma.schedule.update({
      where: {
        idHour_tenant_id: {
          idHour: id,
          tenant_id: tenant_id,
        },
      },
      data: { status: 'Inativo' },
    });

    throw new HttpException('Atualizado Com Sucesso', 201);
  }
  async active(id: number, tenant_id: number) {
    const existingSchedule = await this.prisma.schedule.findFirst({
      where: {
        idHour: id,
        tenant_id: tenant_id,
      },
    });

    if (!existingSchedule) {
      throw new NotFoundException(`Horário Não Existe`);
    }

    await this.prisma.schedule.update({
      where: {
        idHour_tenant_id: {
          idHour: id,
          tenant_id: tenant_id,
        },
      },
      data: { status: 'Ativo' },
    });

    throw new HttpException('Atualizado Com Sucesso', 201);
  }
}
