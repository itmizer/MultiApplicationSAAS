import { HttpException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UserNotificationDto } from './dto/user-notification.dto';
import { NotificationService } from 'src/microservice/notification.service';
import { log } from 'console';

@Injectable()
export class NotificationsService {
  messaging: any;
  notificationMSG: any;
  constructor(
    private prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(notification: CreateNotificationDto) {
    if (!notification.topic) {
      const user = await this.prisma.person.findUnique({
        where: {
          idPerson_tenant_id: {
            idPerson: notification.idPerson,
            tenant_id: notification.tenant_id,
          },
        },
      });
      this.messaging = await this.prisma.notifications.create({
        data: {
          token: user.token,
          title: notification.title,
          body: user.name + ' ' + notification.body,
          status: 'Created',
          tenant_id: notification.tenant_id,
          idPerson: notification.idPerson,
        },
      });

      this.notificationMSG = await this.notificationService.sendNotification({
        token: this.messaging.token,
        tenant_id: this.messaging.tenant_id,

        title: this.messaging.title,
        body: this.messaging.body,
        code: this.messaging.code,
      });
    } else {
      this.messaging = await this.prisma.notifications.create({
        data: {
          topic: notification.topic,
          title: notification.title,
          body: notification.body,
          status: 'Created',
          tenant_id: notification.tenant_id,
          //    idPerson: notification.idPerson,
        },
      });
      console.log(this.messaging);

      this.notificationMSG = await this.notificationService.sendNotification({
        tenant_id: this.messaging.tenant_id,
        topic: notification.topic,
        title: notification.title,
        body: notification.body,
        code: this.messaging.id,
      });
    }
    //    const firebaseCredentials = process.env.FIREBASE;

    console.log(this.notificationMSG);

    if (this.notificationMSG.errorInfo) {
      throw new HttpException(
        `Notificação Não Enviada: Erro ${this.notificationMSG.errorInfo.message}`,
        405,
      );
    }

    if (!this.notificationMSG) {
      throw new HttpException('Notificação Não Enviada', 202);
    }

    throw new HttpException('Notificação Enviada', 201);
    // return 'This action adds a new notification';
  }

  async findUser(tenant_id: number, user: UserNotificationDto) {
    const notication = await this.prisma.notifications.findMany({
      where: {
        OR: [
          {
            idPerson: { equals: user.idPerson },
          },
          { topic: { contains: user.profile } },
        ],
        tenant_id: user.tenant_id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return notication;
  }

  async closedUser(tenant_id: number, user: UserNotificationDto) {
    const notication = await this.prisma.notifications.findMany({
      where: {
        OR: [
          {
            idPerson: { equals: 1 },
          },
          { topic: { contains: user.profile } },
        ],
        tenant_id: user.tenant_id,
        status: 'Closed',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return notication;
  }
  findAll(tenant_id) {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return this.prisma.notifications.findFirst({
      where: {
        code: id,
      },
    });
  }

  closed(id: number, tenant_id: number) {
    return this.prisma.notifications.update({
      where: {
        code: id,
      },
      data: {
        status: 'Closed',
      },
    });
  }
  read(id: number, tenant_id: number) {
    return this.prisma.notifications.update({
      where: {
        code: id,
      },
      data: {
        status: 'Read',
      },
    });
  }

  async update(code: number, notification: UpdateNotificationDto) {
    const update = await this.prisma.notifications.update({
      where: {
        code: code,
      },
      data: notification,
    });

    if (update) {
      throw new HttpException('Confirmação de Leitura', 201);
    }

    throw new HttpException('Confirmação Não Leitura', 202);
    // return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
