import { Headers, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}
  create(createCalendarDto: CreateCalendarDto) {
    return 'This action adds a new calendar';
  }

  findAll(tenant_id: number) {
    return this.prisma.calendar.findMany({
      where: {
        tenant_id: tenant_id,
        date: {
          gte: new Date(),
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} calendar`;
  }

  async update(tenant_id: number, date: Date) {
    const dateInfo = await this.prisma.calendar.findFirst({
      where: {
        tenant_id: tenant_id,
        date: date,
      },
    });
    let statusType = false;
    if (dateInfo.type === false) {
      statusType = true;
    }

    const dateUpdate = await this.prisma.calendar.update({
      data: {
        type: statusType,
      },
      where: {
        date_tenant_id: {
          tenant_id: tenant_id,
          date: date,
        },
      },
    });
    throw new HttpException('Atualizado Com Sucesso', HttpStatus.CREATED);
  }
}
