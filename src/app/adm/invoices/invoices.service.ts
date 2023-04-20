import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { ReservationService } from 'src/app/reservation/service/reservation.service';
import { PrismaService } from 'src/database/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

import { UpdateInvoiceDto } from './dto/update-invoice.dto';

import { InvoicesGetService } from './services/invoices.service';

@Injectable()
export class InvoicesService {
  constructor(
    private prisma: PrismaService,
    private notificationInvoice: InvoicesGetService,
    private readonly reservation: ReservationService,
  ) {}

  async create(createInvoice: CreateInvoiceDto) {
    const i = 1;

    const invoice = await this.prisma.invoice.create({
      data: {
        typePayment: createInvoice.typePayment,
        amount: createInvoice.amount,
        amountInvoice: createInvoice.amount,
        status: 'Gerada',
        dateStart: createInvoice.dateStart,
        dtEnd: new Date(
          createInvoice.dateStart.getFullYear(),
          createInvoice.dateStart.getMonth() + i,
          createInvoice.dateStart.getDate(),
        ),
        dtDue: new Date(
          createInvoice.dateStart.getFullYear(),
          createInvoice.dateStart.getMonth(),
          createInvoice.dateStart.getDate() + 0,
        ),
        Person: {
          connect: {
            idPerson_tenant_id: {
              idPerson: createInvoice.idPerson,
              tenant_id: createInvoice.tenant_id,
            },
          },
        },

        Company: {
          connect: {
            idCompany: createInvoice.tenant_id,
          },
        },
        plans: {
          connect: {
            idPlan_tenant_id: {
              idPlan: createInvoice.plan,
              tenant_id: createInvoice.tenant_id,
            },
          },
        },
      },
    });

    const company = await this.prisma.company.findFirst({
      where: { idCompany: createInvoice.tenant_id },
    });
    if (company.segment == 'studio') {
      const reservation = await this.reservation.sendReservationInvoice(
        invoice,
      );

      throw new HttpException(
        'Mensalidade e Agenda Gerados com Sucesso',
        HttpStatus.CREATED,
      );
    } else {
      // Notificar

      const notication = await this.notificationInvoice.sendNotificationInvoice(
        invoice,
      );
      throw new HttpException(
        `Mensalidade #${invoice.id}  Gerada com Sucesso`,
        HttpStatus.CREATED,
      );
    }
  }

  findAll() {
    return `This action returns all invoices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }
  async cancel(id: number, tenant_id: number) {
    const invoice = await this.prisma.invoice.update({
      where: {
        id_tenant_id: {
          tenant_id: tenant_id,
          id: id,
        },
      },
      data: {
        status: 'Cancelado',
        Reservation: {
          deleteMany: {},
        },
      },
    });
    if (invoice) {
      throw new HttpException('Mensalidade Cancelada', HttpStatus.CREATED);
    }
  }

  async update(id: number, invoiceDTO: UpdateInvoiceDto) {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id_tenant_id: {
          id: id,
          tenant_id: invoiceDTO.tenant_id,
        },
      },
    });

    if (invoiceDTO.status == 'Paid' || invoiceDTO.status == 'Paga') {
      const revenue = this.prisma.invoice.update({
        where: {
          id_tenant_id: {
            id: id,
            tenant_id: invoiceDTO.tenant_id,
          },
        },
        data: {
          dateStart: invoiceDTO.dateStart,
          dtDue: invoiceDTO.dtDue,
          dtPayment: invoiceDTO.dtPayment,
          amount: invoiceDTO.amountInvoice - invoiceDTO.amountDiscount,
          amountDiscount: invoiceDTO.amountDiscount,
          typePayment: invoiceDTO.typePayment,
          status: invoiceDTO.status,
          Revenue: {
            connectOrCreate: {
              create: {
                datePayment: invoiceDTO.dtPayment,
                amount: invoiceDTO.amountInvoice - invoiceDTO.amountDiscount,
                tenant_id: invoiceDTO.tenant_id,
                idPerson: invoice.idPerson,
                typePayment: invoiceDTO.typePayment,
                status: invoiceDTO.status,
                type: 'invoice',
              },

              where: {
                tenant_id_idInvoice_idPerson: {
                  idInvoice: id,
                  tenant_id: invoice.tenant_id,
                  idPerson: invoice.idPerson,
                },
              },
            },
          },
        },
      });
      return revenue;
    } else if ((invoiceDTO.status = 'Cancelada')) {
      const revenue = this.prisma.invoice.update({
        where: {
          id_tenant_id: {
            id: id,
            tenant_id: invoiceDTO.tenant_id,
          },
        },
        data: {
          tenant_id: invoiceDTO.tenant_id,
          dateStart: invoiceDTO.dateStart,
          dtDue: invoiceDTO.dtDue,
          amount: invoiceDTO.amountInvoice - invoiceDTO.amountDiscount,
          amountDiscount: invoiceDTO.amountDiscount,
          typePayment: invoiceDTO.typePayment,
          status: invoiceDTO.status,
        },
      });
      return revenue;
    }

    return `This action updates a #${id} invoiceDTO`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceDTO`;
  }
}
