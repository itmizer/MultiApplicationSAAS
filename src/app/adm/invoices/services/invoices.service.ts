import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Invoice } from '@prisma/client';
import { format } from 'date-fns';
import { InvoiceActiveResult } from 'src/app/Interface/InvoiceActive';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationService } from 'src/microservice/notification.service';

@Injectable()
export class InvoicesGetService {
  hasActiveInvoice: boolean;
  constructor(
    private prisma: PrismaService,
    private notification: NotificationService,
  ) {
    // const firebaseCredentials = process.env.FIREBASE;
    // console.log(firebaseCredentials);
  }
  async isInvoiceActive(idPerson: number, dateParam: Date, tenant_id: number) {
    const invoices = await this.prisma.invoice.findMany({
      where: {
        AND: [
          {
            idPerson: idPerson,
            tenant_id: tenant_id,
            dateStart: { lte: dateParam },
            dtEnd: { gte: dateParam },
          },
        ],
      },
      include: {
        plans: {
          include: {
            planServices: true,
          },
        },
      },
    });

    if (!invoices) {
      throw new Error(`Invoice with ID ${invoices} not found`);
    }

    if (invoices.length > 0) {
      return { hasActiveInvoice: true, activeInvoice: invoices[0] };
    }

    return { hasActiveInvoice: false };
  }

  async sendNotificationInvoice(invoice) {
    const person = await this.prisma.person.findFirst({
      where: {
        idPerson: invoice.idPerson,
        tenant_id: invoice.tenant_id,
      },
    });

    if (person) {
      const message = {
        title: `Mensalidade `,
        token: person.token,
        body: `${person.name}, sua mensalida foi ${invoice.status} com Sucesso.`,
        idPerson: person.idPerson,
        tenant_id: invoice.tenant_id,

        type: 'Mensalidade',
      };
      console.log(message);

      const notication = await this.notification.saveMessageToken(message);
    }
  }
}
