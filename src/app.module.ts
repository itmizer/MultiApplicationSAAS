import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { CompanyModule } from './app/company/company.module';
import { LoginModule } from './app/login/login.module';
import { PersonsModule } from './app/persons/persons.module';
import { ConfigModule } from './app/config/config.module';
import { SchedulesModule } from './app/schedules/schedules.module';
import { AdminModule } from './app/adm/adm.module';
import { ReservationModule } from './app/reservation/reservation.module';
import { TypePaymentsModule } from './app/type-payments/type-payments.module';
import { FeedModule } from './app/feed/feed.module';
import { NotificationsModule } from './app/notifications/notifications.module';
import { WorkoutModule } from './app/workout/workout.module';
import { FirebaseModule } from './microservice/firebase/firebase.module';
import { CheckInvoiceService } from './microservice/CheckInvoice.service';
import { NotificationService } from './microservice/notification.service';
import { AuthFirebaseService } from './microservice/authFirebase.service';

@Module({
  imports: [
    LoginModule,
    CompanyModule,
    PersonsModule,

    ConfigModule,
    SchedulesModule,
    AdminModule,
    //RecordsModule,
    ReservationModule,
    TypePaymentsModule,
    FeedModule,
    NotificationsModule,
    WorkoutModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    CheckInvoiceService,
    NotificationService,
    AuthFirebaseService,
  ],
})
export class AppModule {}
