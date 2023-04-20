import { HttpException, Injectable, Logger } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationService } from 'src/microservice/notification.service';
const { startOfWeek, endOfWeek } = require('date-fns');

@Injectable()
export class ReservationService {
  constructor(
    private prisma: PrismaService,
    private notification: NotificationService,
  ) {
    // const firebaseCredentials = process.env.FIREBASE;
    // console.log(firebaseCredentials);
  }

  async sendReservationContract(contract) {
    const person = await this.prisma.person.findFirst({
      where: {
        idPerson: contract.idPerson,
        tenant_id: contract.tenant_id,
      },
      select: {
        idPerson: true,
        name: true,
        token: true,
        Invoice: {
          select: {
            id: true,
            dateStart: true,
            dtEnd: true,
            status: true,
          },
          where: {
            nContract: contract.id,
          },
        },
        personAppointment: {
          select: {
            idHour: true,
            dayOfWeek: true,
          },
          where: {
            idPerson: contract.idPerson,
            tenant_id: contract.tenant_id,
          },
        },
      },
    });

    //  console.log(person);
    for (const invoice of person.Invoice) {
      //    console.log(invoice);

      const datas = [];
      for (
        let d = invoice.dateStart;
        d < invoice.dtEnd;
        d.setDate(d.getDate() + 1)
      ) {
        const dateWithHours = new Date(d);
        dateWithHours.setHours(dateWithHours.getHours() + 3);
        datas.push(dateWithHours);
      }
      //      console.log(datas);

      const reservations = [];
      for (const appoint of person.personAppointment) {
        const idHour = appoint.idHour;
        const dayOfWeek = appoint.dayOfWeek;

        for (const date of datas) {
          const dateWeek = date.getDay() + 1;

          if (dateWeek === dayOfWeek) {
            //const idHour = appoint.idHour;
            const reservation = {
              date,
              idHour,
            };
            reservations.push(reservation);
          }
        }
      }

      const reservationSend = await this.prisma.reservation.createMany({
        data: reservations.map((reservation) => ({
          idPerson: contract.idPerson,
          tenant_id: contract.tenant_id,
          date: reservation.date,
          idInvoice: invoice.id,
          idHour: reservation.idHour,
        })),
      });

      if (reservationSend) {
        const message = {
          title: `Agenda`,
          token: person.token,
          body: `${person.name}, sua Agenda foi Gerada com Sucesso.`,
          idPerson: person.idPerson,
          tenant_id: contract.tenant_id,

          type: 'Agenda',
        };
        console.log(message);

        const notication = await this.notification.saveMessageToken(message);
      }
      return reservationSend;
    }

    // const reservationSend = await this.prisma.reservation.createMany({
    //   data: reservationDates,
    // });
    // return reservationSend;
  }

  async sendReservationInvoice(invoice) {
    const person = await this.prisma.person.findUnique({
      where: {
        idPerson_tenant_id: {
          idPerson: invoice.idPerson,
          tenant_id: invoice.tenant_id,
        },
      },
      select: {
        idPerson: true,
        personAppointment: {
          select: {
            idHour: true,
            dayOfWeek: true,
          },
          where: {
            idPerson: invoice.idPerson,
            tenant_id: invoice.tenant_id,
          },
        },
      },
      //PersonAppointment: true,
    });

    //  console.log(person);

    const datas = [];
    for (
      let d = invoice.dateStart;
      d < invoice.dtEnd;
      d.setDate(d.getDate() + 1)
    ) {
      const dateWithHours = new Date(d);
      dateWithHours.setHours(dateWithHours.getHours() + 3);
      datas.push(dateWithHours);
    }
    //      console.log(datas);

    const reservations = [];
    for (const appoint of person.personAppointment) {
      console.log(appoint);

      const idHour = appoint.idHour;
      const dayOfWeek = appoint.dayOfWeek;

      for (const date of datas) {
        const dateWeek = date.getDay() + 1;

        if (dateWeek === dayOfWeek) {
          //const idHour = appoint.idHour;
          const reservation = {
            date,
            idHour,
          };
          reservations.push(reservation);
        }
      }
    }

    const reservationSend = await this.prisma.reservation.createMany({
      data: reservations.map((reservation) => ({
        idPerson: invoice.idPerson,
        tenant_id: invoice.tenant_id,
        date: reservation.date,
        idInvoice: invoice.id,
        idHour: reservation.idHour,
      })),
    });

    return reservationSend;
  }

  async countReservationWeek(reservation) {
    const startOfWeekDate = startOfWeek(reservation.date);
    const endOfWeekDate = endOfWeek(reservation.date);

    const result = await this.prisma.reservation.count({
      where: {
        date: {
          gte: startOfWeekDate,
          lte: endOfWeekDate,
        },
        tenant_id: reservation.tenant_id,
        idPerson: reservation.idPerson,
        status: {
          notIn: 'Cancelado',
        },
      },

      //PersonAppointment: true,
    });

    //  console.log(person);

    return result;
  }

  calculateReservations(reservationData): Date[] {
    const { startDate, endDate, reservations } = reservationData;

    const reservationDates = [];

    let currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      reservations.forEach((reservation) => {
        if (reservation.dayOfWeek === currentDate.getDay() + 1) {
          const reservationDate = new Date(currentDate.getTime());

          reservationDates.push({
            date: reservationDate,
            idHour: reservation.idHour,
            idPerson: reservationData.idPerson,
          });
        }
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return reservationDates;
  }

  getProximoDiaDaSemana(diaDaSemana, dataInicial) {
    const hoje = dataInicial || new Date();
    const diff = (diaDaSemana - hoje.getDay() + 7) % 7;
    const proximoDia = new Date(hoje.getTime() + diff * 24 * 60 * 60 * 1000);
    return proximoDia;
  }
}
