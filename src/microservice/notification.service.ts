import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateNotificationDto } from 'src/app/notifications/dto/create-notification.dto';
import * as firebase from 'firebase-admin';
import * as admin from 'firebase-admin';
import { log } from 'console';
import { SendNotificationDto } from 'src/app/notifications/dto/send-notification.dto';

@Injectable()
export class NotificationService {
  private firebaseConfigs: { [tenant_id: number]: admin.ServiceAccount } = {};
  private firebaseApps: { [tenant_id: number]: admin.app.App } = {}; // Armazena as instâncias do Firebase já inicializadas
  public message: any;
  constructor(private prisma: PrismaService) {}

  async getFirebaseApp(tenant_id: number): Promise<admin.app.App> {
    // Busque a configuração do Firebase no banco de dados usando o Prisma
    if (this.firebaseApps[tenant_id]) {
      return this.firebaseApps[tenant_id];
    }
    if (this.firebaseApps[tenant_id]) {
      return this.firebaseApps[tenant_id];
    }
    const firebaseConfig = await this.prisma.firebaseConfig.findUnique({
      where: { tenant_id },
    });
    if (!firebaseConfig) {
      throw new HttpException(
        `Servidor de notificacao não configurado`,
        HttpStatus.CREATED,
      );
    }

    // Verificar se já existe uma instância do aplicativo para o tenantId
    const existingApp = admin.apps.find(
      (app) => app.name === `tenantApp-${tenant_id}`,
    );
    if (existingApp) {
      this.firebaseApps[tenant_id] = existingApp;
      return existingApp;
    }

    const app = admin.initializeApp(
      {
        credential: admin.credential.cert({
          projectId: firebaseConfig.project_id,
          clientEmail: firebaseConfig.client_email,
          privateKey: firebaseConfig.private_key,
        }),
        // ... outras configurações do Firebase, se necessário
      },
      `tenantApp-${tenant_id}`, // Nome único do aplicativo com base no tenantId
    );

    this.firebaseApps[tenant_id] = app;

    return app;
  }

  async saveMessageToken(notification: CreateNotificationDto) {
    const tenantId = notification.tenant_id;

    const user = await this.prisma.person.findFirst({
      where: { idPerson: notification.idPerson },
    });

    const messaging = await this.prisma.notifications.create({
      data: {
        token: user.token,
        title: notification.title,
        body: notification.body,
        status: 'Created',
        tenant_id: notification.tenant_id,
        idPerson: notification.idPerson,
      },
    });

    const notificationToken = await this.sendNotification({
      token: messaging.token,
      title: messaging.title,
      body: messaging.body,
      tenant_id: messaging.tenant_id,
      // code: messaging.code.toString()
    });

    console.log(notificationToken);

    return notificationToken;
    // if (!notificationToken) {
    //   return new HttpException('Notificação Não Enviada', 202);
    // }

    // return new HttpException('Notificação Enviada', 201);

    // return 'This action adds a new notification';
  }
  async saveMessageTopic(notification: CreateNotificationDto) {
    const messaging = await this.prisma.notifications.create({
      data: {
        title: notification.title,
        body: notification.body,
        status: 'Created',
        tenant_id: notification.tenant_id,
        topic: notification.topic,
        type: notification.type,
        data: notification.data,
      },
    });
    //   console.log(messaging);
    // const notificationToken = await this.sendNotificationTopic(
    //   messaging.token,
    //   messaging.title,
    //   messaging.body,
    //   messaging.code.toString(),
    //   messaging.tenant_id,
    // );

    // return notificationToken;
  }

  // funcao de enviar notificacao

  async sendNotification(notification: SendNotificationDto) {
    // Configure a administração do Firebase usando as credenciais obtidas
    const firebaseApp = await this.getFirebaseApp(notification.tenant_id);

    const token = notification.token;
    const title = notification.title;
    const body = notification.body;

    if (firebaseApp) {
      if (!notification.topic) {
        console.log('Não tem topic, token: ', token);

        const message = {
          token,
          notification: { title, body },
          // data: {
          //   code: notification.code.toString(),
          // },
        };
        try {
          const response = await firebaseApp.messaging().send(message);
          console.log(message);
          return message;
        } catch (error) {
          console.log(error);

          return error;
        }
      } else {
        const message = { notification: { title, body } };
        const response = await firebaseApp
          .messaging()
          .sendToTopic(notification.topic, message);

        try {
          console.log(response);
          return message;
        } catch (error) {
          return error;
        }
      }
    }
  }

  async sendNotificationToken(
    token: string,
    title: string,
    body: string,
    code: string,
    tenant_id: number,
  ) {
    // Configure a administração do Firebase usando as credenciais obtidas
    const firebaseApp = await this.getFirebaseApp(tenant_id);

    if (firebaseApp) {
      const message = {
        token,
        notification: { title, body },
        data: {
          id: code,
        },
      };
      try {
        const response = await firebaseApp.messaging().send(message);
        //   console.log(response);
        return message;
      } catch (error) {
        return error;
      }
    }
  }

  // async sendNotificationTopic(
  //   topic: string,
  //   title: string,
  //   body: string,
  //   code: string,
  //   tenant_id: number,
  // ) {
  //   const firebaseApp = await this.getFirebaseApp(tenant_id);
  //   if (firebaseApp) {
  //     const message = {
  //       notification: {
  //         title,
  //         body,
  //       },
  //       data: {
  //         id: code,
  //       },
  //     };
  //     try {
  //       const response = await firebase.messaging().sendToTopic(topic, message);
  //       console.log(response);
  //       return message;
  //     } catch (error) {
  //       return error;
  //     }
  //   }
  // }
}
