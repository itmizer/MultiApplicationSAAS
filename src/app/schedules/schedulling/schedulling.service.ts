import { HttpException, Injectable } from '@nestjs/common';
import { CreateSchedullingDto } from './dto/create-schedulling.dto';
import { UpdateSchedullingDto } from './dto/update-schedulling.dto';
import { PrismaService } from 'src/database/prisma.service';
import { InvoicesGetService } from 'src/app/adm/invoices/services/invoices.service';
import { ReservationService } from 'src/app/reservation/service/reservation.service';
import { log } from 'console';

@Injectable()
export class SchedullingService {
  constructor(
    private prisma: PrismaService,
    private invoices: InvoicesGetService,
    private reservation: ReservationService,
  ) {}
  async create(createSchedullingDto: CreateSchedullingDto) {
    // verifica fatura ativa
    const invoice = await this.invoices.isInvoiceActive(
      createSchedullingDto.idPerson,
      createSchedullingDto.date,
      createSchedullingDto.tenant_id,
    );

    if (!invoice.hasActiveInvoice) {
      throw new HttpException('Não há fatura Ativa', 202);
    }

    const activeInvoice = invoice.activeInvoice;
    const plan = activeInvoice.plans;

    const daysLimitWeek = plan.daysOfWeek;
    const reservation = await this.reservation.countReservationWeek(
      createSchedullingDto,
    );

    if (reservation <= daysLimitWeek) {
      // throw new HttpException(
      //   'O número de reservas não canceladas na semana de  é ${reservation}.',
      //   202,
      // );

      if (reservation < daysLimitWeek) {
        // permitir que a pessoa faça a reserva

        const vacancy = await this.prisma.reservation.count({
          where: {
            date: createSchedullingDto.date,
            idHour: createSchedullingDto.idHour,
            status: { notIn: 'Cancelado' },
          },
        });
        const dayOfWeek = createSchedullingDto.date.getDay() + 1; // retorna um número de 0 a 6

        const hourWeek = await this.prisma.hourWeek.findFirst({
          where: {
            dayOfWeek: dayOfWeek,
            idHour: createSchedullingDto.idHour,
          },
        });

        if (vacancy < hourWeek.vacancy) {
          const scheduling = await this.prisma.reservation.create({
            data: {
              tenant_id: createSchedullingDto.tenant_id,
              idPerson: createSchedullingDto.idPerson,
              idHour: createSchedullingDto.idHour,
              date: createSchedullingDto.date,
            },
          });
          if (scheduling) {
            throw new HttpException(`Reserva Realizada.`, 201);
          }
        }
        throw new HttpException(`Limite de Vagas Atingido.`, 202);
      } else {
        throw new HttpException(
          `O limite de ${daysLimitWeek} reservas já foi atingido. A reserva não pode ser realizada.`,
          202,
        );

        // impedir que a pessoa faça a reserva
      }
    } else {
      console.log(
        `O número de reservas não canceladas na semana de ${createSchedullingDto.date
          .toISOString()
          .slice(
            0,
            10,
          )} é: ${reservation}. O limite de ${daysLimitWeek} reservas já foi atingido.`,
      );
      // impedir que a pessoa faça a reserva
    }
    //  throw new HttpException('Pode realizar o agendamento', 202);
    // const scheduling = await this.prisma.reservation.create({
    //   data: {
    //     tenant_id: createSchedullingDto.tenant_id,
    //     idPerson: createSchedullingDto.idPerson,
    //     idHour: createSchedullingDto.idHour,
    //     date: createSchedullingDto.date,
    //   },
    // });
    // return scheduling;
    //
  }

  findAll() {
    return `This action returns all schedulling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedulling`;
  }

  update(id: number, updateSchedullingDto: UpdateSchedullingDto) {
    return `This action updates a #${id} schedulling`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedulling`;
  }
}
