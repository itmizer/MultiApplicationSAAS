import { HttpException, Injectable } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { PrismaService } from 'src/database/prisma.service';
import { InvoicesGetService } from 'src/app/adm/invoices/services/invoices.service';
import { ReservationService } from '../service/reservation.service';
import { log } from 'console';

@Injectable()
export class BoxService {
  constructor(
    private prisma: PrismaService,
    private invoices: InvoicesGetService,
    private reservation: ReservationService,
  ) {}
  async create(boxDTO: CreateBoxDto) {
    // verifica se possui checkin no dia
    const reservationExists = await this.prisma.reservation.findFirst({
      where: {
        date: boxDTO.date,
        tenant_id: boxDTO.tenant_id,
        idPerson: boxDTO.idPerson,
        status: { notIn: 'Cancelado' },
      },
    });

    console.log(reservationExists);
    if (reservationExists) {
      throw new HttpException('Já Possui Checkin no Dia', 202);
    }
    const countCancel = await this.prisma.reservation.count({
      where: {
        date: boxDTO.date,
        tenant_id: boxDTO.tenant_id,
        idPerson: boxDTO.idPerson,
        status: { in: ['Cancelado', 'Cancelada'] },
      },
    });

    //console.log('Total Checkins: ', countCancel);

    const invoice = await this.invoices.isInvoiceActive(
      boxDTO.idPerson,
      boxDTO.date,
      boxDTO.tenant_id,
    );

    if (!invoice.hasActiveInvoice) {
      throw new HttpException('Não há fatura Ativa', 202);
    }
    //console.log('Fatura Ativa: ', invoice.hasActiveInvoice);

    const activeInvoice = invoice.activeInvoice;
    const plan = activeInvoice.plans;

    const daysLimitWeek = plan.daysOfWeek;

    // console.log('Limite Dias: ', daysLimitWeek);
    const reservationWeek = await this.reservation.countReservationWeek(boxDTO);
    console.log('reservationWeek : ', reservationWeek);
    if (reservationWeek <= daysLimitWeek) {
      // throw new HttpException(
      //   'O número de reservas não canceladas na semana de  é ${reservation}.',
      //   202,
      // );

      if (reservationWeek < daysLimitWeek) {
        // permitir que a pessoa faça a reserva

        const vacancyOcupacy = await this.prisma.reservation.count({
          where: {
            date: boxDTO.date,
            idHour: boxDTO.idHour,
            tenant_id: boxDTO.tenant_id,
            status: { notIn: 'Cancelado' },
          },
        });

        console.log('Vagas Ocupadas : ', vacancyOcupacy);
        const dayOfWeek = boxDTO.date.getDay() + 1; // retorna um número de 0 a 6

        const schedule = await this.prisma.schedule.findFirst({
          where: {
            tenant_id: boxDTO.tenant_id,
            idHour: boxDTO.idHour,
          },
        });
        console.log(typeof schedule.vacancy);

        if (vacancyOcupacy < Number(schedule.vacancy)) {
          const scheduling = await this.prisma.reservation.create({
            data: {
              tenant_id: boxDTO.tenant_id,
              idPerson: boxDTO.idPerson,
              idHour: boxDTO.idHour,
              date: boxDTO.date,
            },
          });
          if (scheduling) {
            throw new HttpException(`Reserva Realizada.`, 201);
          }
        }
        throw new HttpException(`Limite de Vagas Atingido.`, 202);
      } else {
        throw new HttpException(
          `O limite de ${daysLimitWeek} Checkin já foi atingido. A reserva não pode ser realizada.`,
          202,
        );

        // impedir que a pessoa faça a reserva
      }
    } else {
      console.log(
        `O número de reservas não canceladas na semana de ${boxDTO.date
          .toISOString()
          .slice(
            0,
            10,
          )} é: ${reservationWeek}. O limite de ${daysLimitWeek} reservas já foi atingido.`,
      );
      // impedir que a pessoa faça a reserva
    }
  }

  // findAll() {
  //   return `This action returns all box`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} box`;
  // }

  // update(id: number, updateBoxDto: UpdateBoxDto) {
  //   return `This action updates a #${id} box`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} box`;
  // }
}
