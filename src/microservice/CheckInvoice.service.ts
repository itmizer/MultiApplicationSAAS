import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import * as cron from 'cron';

import { PrismaService } from 'src/database/prisma.service';

import * as admin from 'firebase-admin';

import { NotificationService } from './notification.service';
import { log } from 'console';

@Injectable()
export class CheckInvoiceService implements OnModuleInit {
  private repeticoes = 0; // contador de repetições
  private readonly MAX_REPETICOES = 3; // número máximo de repetições

  public message: any;
  constructor(
    private prisma: PrismaService,
    private readonly notification: NotificationService,
  ) {}

  onModuleInit(): void {
    this.iniciarCron();
  }

  async iniciarCron() {
    const dataAtual = new Date();
    const dataDezDias = new Date();
    dataDezDias.setDate(dataAtual.getDate() + 10);

    const tenant_id = 1;
    const invoice = await this.prisma.invoice.findFirst({
      where: {
        idPerson: 99,
        tenant_id: tenant_id,
      },
      include: {
        Person: {
          select: {
            name: true,
            token: true,
          },
        },
      },
    });
    //
    const repeticoes = 0; // contador de repetições
    const MAX_REPETICOES = 3; // número máximo de repetições
    // Crie uma nova instância de cron job para executar a função todos os dias às 18 horas
    //const cronJob = new cron.CronJob('43 17 * * *', () => {
    const cronJob = new cron.CronJob('* 12 * * *', () => {
      // Lógica para verificar as faturas e enviar a mensagem
      console.log(invoice);

      if (this.repeticoes < this.MAX_REPETICOES) {
        this.notification.saveMessageToken({
          idPerson: 1,
          tenant_id: 1,

          title: 'Fatura a vencer',
          body: `Sua Fatura Vence dia ${invoice.dtDue} , no valor de ${invoice.amount}`,
        });
        //        console.log('Enviou');
        this.repeticoes++;
      } else {
        // Pare o cron job após 3 repetições
        cronJob.stop();
      }

      // ...
    });

    // Inicie o cron job
    cronJob.start();
  }
}
