import { HttpException, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

import { PrismaService } from 'src/database/prisma.service';
import { NotificationService } from 'src/microservice/notification.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private notification: NotificationService,
  ) {}
  async create(appointmentDTO: CreateAppointmentDto) {
    const appointment = await this.prisma.person.update({
      where: {
        idPerson_tenant_id: {
          idPerson: appointmentDTO.idPerson,
          tenant_id: appointmentDTO.tenant_id,
        },
      },
      data: {
        datePayment: appointmentDTO.datePayment,
        personAppointment: {
          deleteMany: {},
          create: appointmentDTO.PersonAppointment.map((appointment) => ({
            dayOfWeek: appointment.dayOfWeek,
            idHour: appointment.idHour,
            //  tenant_id: appointmentDTO.tenant_id,
          })),
        },
      },
    });

    const hours = await this.prisma.personAppointment.findMany({
      where: {
        idPerson: appointmentDTO.idPerson,
      },
      select: {
        idHour: true,
        dayOfWeek: true,
        hour: {
          select: {
            name: true,
          },
        },
        weekDay: {
          select: {
            name: true,
          },
        },
      },
    });
    const detailHour = hours
      .map(({ weekDay, hour }) => `${weekDay.name}-> ${hour.name}`)
      .join(', ');
    console.log(detailHour);

    const message = {
      title: `${appointment.name}`,

      body: `Vinculou novos horarios: ${detailHour}, com data de Vencimento :${appointmentDTO.datePayment}`,
      idPerson: appointmentDTO.idPerson,
      topic: 'STAFF',
      tenant_id: appointmentDTO.tenant_id,
      data: appointment.idPerson.toString(),
      type: 'Contrato',
    };

    console.log(message);

    //const user = await this.notification.saveMessageToken(message);
    const note = await this.notification.saveMessageTopic(message);
    throw new HttpException('Atualizado Com Sucesso', 201);
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
