import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationService } from 'src/microservice/notification.service';
import { CreateListReservationDto } from './dto/create-list-reservation.dto';
import { UpdateListReservationDto } from './dto/update-list-reservation.dto';
import { format } from 'date-fns';
import { HttpException, Logger } from '@nestjs/common';
import { InvoicesGetService } from 'src/app/adm/invoices/services/invoices.service';
import { ReservationService } from '../service/reservation.service';
@Injectable()
export class ListReservationService {
  constructor(
    private prisma: PrismaService,
    private notification: NotificationService,
    private invoices: InvoicesGetService,
    private reservation: ReservationService,
  ) {}

  async create(reservationDTO: CreateListReservationDto) {
    const reservationExists = await this.prisma.reservation.findFirst({
      where: {
        date: reservationDTO.date,
        tenant_id: reservationDTO.tenant_id,
        idPerson: reservationDTO.idPerson,
        status: { notIn: 'Cancelado' },
      },
    });
    console.log('reserva', reservationExists);

    const countCancel = await this.prisma.reservation.count({
      where: {
        date: reservationDTO.date,
        tenant_id: reservationDTO.tenant_id,
        idPerson: reservationDTO.idPerson,
        status: { in: ['Cancelado', 'Cancelada'] },
      },
    });

    //console.log(reservationExists);
    if (reservationExists) {
      throw new HttpException(
        `Já Possui Checkin no Dia ${reservationExists.date}, ${reservationExists.idHour}  A reserva não pode ser realizada.`,
        202,
      );
    }

    // const countCancel = await this.prisma.reservation.count({
    //   where: {
    //     date: reservationDTO.date,
    //     tenant_id: reservationDTO.tenant_id,
    //     idPerson: reservationDTO.idPerson,
    //     status: { in: ['Cancelado', 'Cancelada'] },
    //   },
    // });
    // console.log(countCancel);

    const invoice = await this.invoices.isInvoiceActive(
      reservationDTO.idPerson,
      reservationDTO.date,
      reservationDTO.tenant_id,
    );

    if (!invoice.hasActiveInvoice) {
      throw new HttpException('Não há fatura Ativa', 202);
    }

    const activeInvoice = invoice.activeInvoice;
    const plan = activeInvoice.plans;

    const daysLimitWeek = plan.daysOfWeek;
    const reservation = await this.reservation.countReservationWeek(
      reservationDTO,
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
            date: reservationDTO.date,
            idHour: reservationDTO.idHour,
            status: { notIn: 'Cancelado' },
          },
        });
        const dayOfWeek = reservationDTO.date.getDay() + 1; // retorna um número de 0 a 6

        const hourWeek = await this.prisma.hourWeek.findFirst({
          where: {
            dayOfWeek: dayOfWeek,
            idHour: reservationDTO.idHour,
          },
        });

        if (vacancy < hourWeek.vacancy) {
          const scheduling = await this.prisma.reservation.create({
            data: {
              tenant_id: reservationDTO.tenant_id,
              idPerson: reservationDTO.idPerson,
              idHour: reservationDTO.idHour,
              date: reservationDTO.date,
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
        `O número de reservas não canceladas na semana de ${reservationDTO.date
          .toISOString()
          .slice(
            0,
            10,
          )} é: ${reservation}. O limite de ${daysLimitWeek} reservas já foi atingido.`,
      );
      // impedir que a pessoa faça a reserva
    }
  }

  findAll() {
    return `This action returns all listReservation`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} listReservation`;
  // }
  async cancel(id: number, tenant_id: number) {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        idReservation: id,
      },
      select: {
        idPerson: true,
        date: true,
        tenant_id: true,
        hours: {
          select: {
            name: true,
            hourStart: true,
            hourEnd: true,
          },
        },
        Person: {
          select: {
            idPerson: true,
            name: true,
          },
        },
      },
    });

    const cancelReservation = await this.prisma.reservation.update({
      where: {
        idReservation: id,
      },
      data: {
        status: 'Cancelado',
      },
    });
    if (cancelReservation) {
      const message = {
        title: `Cancelamento`,
        topic: 'STAFF',
        body: `${
          reservation.Person.name
        }, Cancelou o agendamento do dia ${format(
          reservation.date,
          'dd/MM/yyyy',
        )}, ás  ${reservation.hours.name}.`,
        // idPerson: person.idPerson,
        tenant_id: reservation.tenant_id,
        data: reservation.idPerson.toString(),

        type: 'Cancelamento',
      };

      const notication = await this.notification.saveMessageTopic(message);
      throw new HttpException(`Reserva Cancelada Cancelada`, 201);
    }
    throw new HttpException(`Reserva Não Cancelada Cancelada`, 202);
  }

  async update(id: number, reservationDTO: UpdateListReservationDto) {
    const reservation = await this.prisma.reservation.update({
      where: {
        idReservation: id,
      },
      data: {
        status: reservationDTO.status,
      },
    });
    return reservation;
    if (reservation) {
      throw new HttpException(
        `Status: ${reservation.status} `,
        HttpStatus.ACCEPTED,
      );
    }
    return `This action updates a #${id} listReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} listReservation`;
  }
}
