import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}
  async create(createServiceDto: CreateServiceDto) {
    const service = await this.prisma.services.create({
      data: {
        name: createServiceDto.name,
        Descritivo: createServiceDto.Descritivo,
        category: createServiceDto.category,
        status: createServiceDto.status,
        valor: createServiceDto.valor,
        valorDiaria: createServiceDto.valorDiaria,
        custo: createServiceDto.custo,
        tempoServico: createServiceDto.tempoServico,
        Company: {
          connect: {
            idCompany: createServiceDto.tenant_id,
          },
        },
      },
    });
    return service;
  }

  findAll(tentant_id: number) {
    return this.prisma.services.findMany({
      where: {
        tenant_id: tentant_id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
