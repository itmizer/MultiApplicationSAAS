import { Injectable, HttpException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/database/prisma.service';
import { getDay, parseISO, startOfWeek } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import { findWorkoutDto } from './dto/find-workout.dto';
import { InvoicesGetService } from '../adm/invoices/services/invoices.service';
import { log } from 'console';

@Injectable()
export class WorkoutService {
  constructor(
    private prisma: PrismaService,

    private invoices: InvoicesGetService,
  ) {}

  async create(create: CreateWorkoutDto) {
    const workout = await this.prisma.workout.create({
      data: create,
    });

    if (workout) {
      throw new HttpException(`Cadastro Efetuado`, 201);
    }
    throw new HttpException(`Cadastro Não Efetuado`, 202);
  }
  async find(find: findWorkoutDto) {
    const invoice = await this.invoices.isInvoiceActive(
      find.idPerson,
      find.date,
      find.tenant_id,
    );
    if (!invoice.hasActiveInvoice) {
      throw new HttpException('Não há fatura Ativa', 202);
    }
    const activeInvoice = invoice.activeInvoice;
    const plan = activeInvoice.plans;

    const idServiceArray: number[] = plan.planServices.map(
      (serviceInfo) => serviceInfo.idService,
    );
    const data = new Date('2023-04-11');
    const workout = await this.prisma.workout.findMany({
      where: {
        service: { in: idServiceArray },
        date: find.date,
        tenant_id: find.tenant_id,
      },
      include: {
        Service: {
          select: {
            name: true,
            tenant_id: true,
            idService: true,
          },
        },
      },
    });

    console.log(workout);

    return workout;
    // if (workout) {
    //   throw new HttpException(`Cadastro Efetuado`, 201);
    // }
    // throw new HttpException(`Cadastro Não Efetuado`, 202);
  }

  async findAll(tenant_id: number) {
    return this.prisma.workout.findMany({
      where: {
        tenant_id: tenant_id,
      },
    });
    return `This action returns all workout`;
  }

  async findDate(tenant_id: number, date: Date) {
    // Data que você deseja filtrar

    const workout = await this.prisma.workout.findMany({
      where: {
        date: date, // Filtrando pelo campo 'date' com o valor fornecido

        tenant_id: tenant_id,
      },
      include: {
        Service: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!workout) {
      throw new HttpException(`Não Possui `, 202);
    }
    return workout;
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
