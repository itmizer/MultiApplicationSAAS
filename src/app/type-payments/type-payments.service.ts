import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTypePaymentDto } from './dto/create-type-payment.dto';
import { UpdateTypePaymentDto } from './dto/update-type-payment.dto';

@Injectable()
export class TypePaymentsService {
  constructor(private prisma: PrismaService) {}
  create(createTypePaymentDto: CreateTypePaymentDto) {
    return 'This action adds a new typePayment';
  }

  findAll(tenant_id: number) {
    return this.prisma.typePayment.findMany({
      where: {
        tenant_id: tenant_id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} typePayment`;
  }

  update(id: number, updateTypePaymentDto: UpdateTypePaymentDto) {
    return `This action updates a #${id} typePayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} typePayment`;
  }
}
