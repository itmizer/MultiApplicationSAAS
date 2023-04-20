import {
  Headers,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}
  async create(params: CreatePlanDto) {
    const savePlan = await this.prisma.plan.create({
      data: {
        tenant_id: params.tenant_id,
        name: params.name,
        daysOfWeek: params.daysOfWeek,
        qtdPeriod: params.qtdPeriod,
        amount: params.amount,
        taxRegistration: params.taxRegistration,
        gracePeriod: params.gracePeriod,
        promotional: params.promotional,
        acumulative: params.acumulative,
        status: params.status,
        planServices: {
          create: params.planServices.map((service) => ({
            idService: service.idService,
          })),
        },
      },
    });

    if (savePlan) {
      throw new HttpException('Criado Com Sucesso', HttpStatus.CREATED);
    }
  }

  findAll(tentant_id: number) {
    return this.prisma.plan.findMany({
      where: { tenant_id: tentant_id },
      include: {
        planServices: {
          include: {
            services: {},
          },
        },
      },
      orderBy: {
        daysOfWeek: 'asc',
      },
    });
  }

  findOne(id: number, tenant_id: number) {
    return this.prisma.plan.findUnique({
      where: {
        idPlan_tenant_id: {
          idPlan: id,
          tenant_id: tenant_id,
        },
      },
      include: {
        planServices: {
          include: {
            services: {},
          },
        },
      },
    });
  }

  async update(id: number, params: CreatePlanDto, tenant_id: number) {
    const existingPlan = await this.prisma.plan.findUniqueOrThrow({
      where: {
        idPlan_tenant_id: { idPlan: id, tenant_id: params.tenant_id },
      },
      include: {
        planServices: {},
      },
    });

    if (!existingPlan) {
      throw new NotFoundException(`Plano Inexistente`);
    }

    const existingPlanServiceIds = existingPlan.planServices.map((service) => {
      return {
        idService: service.idService,
        //   coach: hourWeek.coach,
      };
    });

    await this.prisma.plan.update({
      where: {
        idPlan_tenant_id: {
          idPlan: id,
          tenant_id: tenant_id,
        },
      },
      data: {
        tenant_id: params.tenant_id,
        name: params.name,
        daysOfWeek: 5,
        qtdPeriod: params.qtdPeriod,
        amount: params.amount,
        taxRegistration: params.taxRegistration,
        gracePeriod: params.gracePeriod,
        promotional: params.promotional,
        acumulative: params.acumulative,
        status: params.status,
        planServices: {
          deleteMany: {},
          create: params.planServices.map((week) => ({
            idService: week.idService,
          })),
        },
      },
    });

    throw new HttpException('Atualizado Com Sucesso', HttpStatus.CREATED);
  }

  async cancel(id: number, tenant_id: number) {
    const existingPlan = await this.prisma.plan.findFirst({
      where: {
        idPlan: id,
      },
    });

    if (!existingPlan) {
      throw new NotFoundException(`Plano Inexistente`);
    }

    await this.prisma.plan.update({
      where: {
        idPlan_tenant_id: {
          idPlan: id,
          tenant_id: tenant_id,
        },
      },
      data: {
        status: 'Inativo',
      },
    });

    throw new HttpException('Atualizado Com Sucesso', HttpStatus.CREATED);
  }
  async active(id: number, tenant_id: number) {
    const existingPlan = await this.prisma.plan.findFirst({
      where: {
        idPlan: id,
      },
    });

    if (!existingPlan) {
      throw new NotFoundException(`Plano Inexistente`);
    }

    const updatePlan = await this.prisma.plan.update({
      where: {
        idPlan_tenant_id: {
          idPlan: id,
          tenant_id: tenant_id,
        },
      },
      data: {
        status: 'Ativo',
      },
    });

    throw new HttpException('Atualizado Com Sucesso', HttpStatus.CREATED);
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
