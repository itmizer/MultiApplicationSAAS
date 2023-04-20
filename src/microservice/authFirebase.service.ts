import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateNotificationDto } from 'src/app/notifications/dto/create-notification.dto';
import * as firebase from 'firebase-admin';
import * as admin from 'firebase-admin';
import { log } from 'console';
import { SendNotificationDto } from 'src/app/notifications/dto/send-notification.dto';
import { PersonAuthDto } from 'src/app/persons/person/dto/PersonAuth-dto';

@Injectable()
export class AuthFirebaseService {
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

  // funcao de enviar notificacao

  async getEmail(tenant_id: number, email: string) {
    // Configure a administração do Firebase usando as credenciais obtidas
    const firebaseApp = await this.getFirebaseApp(tenant_id);

    try {
      const firebaseUser = await firebaseApp
        .auth()
        .getUserByEmail(email)
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            return null; // Se o usuário não existir, retornar nulo
          }
          throw error; // Lançar erro se ocorrer algum erro diferente de usuário não encontrado
        });
      if (firebaseUser) {
        return firebaseUser;
      }
    } catch (error) {
      console.error('Error listing users:', error);
      throw error;
    }
  }
  async getUsers(tenant_id: number) {
    // Configure a administração do Firebase usando as credenciais obtidas
    const firebaseApp = await this.getFirebaseApp(tenant_id);

    try {
      const listUsersResult = await firebaseApp.auth().listUsers();
      const users = listUsersResult.users;

      const usersJSON = JSON.stringify(users, null, 2); // 2 espaços de indentação
      return usersJSON;
    } catch (error) {
      console.error('Error listing users:', error);
      throw error;
    }
  }

  async findUser(tenant_id: number, userId: string) {
    try {
      // Configure a administração do Firebase usando as credenciais obtidas
      const firebaseApp = await this.getFirebaseApp(tenant_id);
      const userRecord = await firebaseApp.auth().getUser(userId);

      const usersJSON = JSON.stringify(userRecord, null, 2); // 2 espaços de indentação
      return usersJSON;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  async updateUser(userData: PersonAuthDto) {
    try {
      // Configure a administração do Firebase usando as credenciais obtidas
      const firebaseApp = await this.getFirebaseApp(userData.tenant_id);
      const userRecord = await firebaseApp.auth().getUser(userData.uuid);

      if (userData.name) {
        await firebaseApp.auth().updateUser(userData.uuid, {
          displayName: userData.name,
          email: userData.email,
        });
      }

      const customClaims = {};
      if (userData.cpf) {
        customClaims['cpf'] = userData.cpf;
      }
      if (userData.phoneNumber) {
        customClaims['phoneNumber'] = userData.phoneNumber;
      }
      const custom = await firebaseApp
        .auth()
        .setCustomUserClaims(userData.uuid, customClaims);

      console.log(custom);

      if (userData.cpf) {
        await firebaseApp
          .auth()
          .setCustomUserClaims(userData.uuid, { cpf: userData.cpf });
      }
      // if (userData.cpf) {
      //   await firebaseApp
      //     .auth()
      //     .setCustomUserClaims(userData.uuid, { cpf: userData.cpf });
      // }
      // if (userData.token) {
      //   await firebaseApp.auth().setCustomUserClaims(userData.uuid, {
      //     token: userData.token,
      //   });
      // }
      // if (userData.phoneNumber) {
      //   await firebaseApp.auth().setCustomUserClaims(userData.uuid, {
      //     phoneNumber: userData.phoneNumber,
      //   });
      // }

      console.log(`Usuário com ID ${userData.uuid} atualizado com sucesso.`);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
