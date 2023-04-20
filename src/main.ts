import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const cors = require('cors');
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('DOCUMENTACAO / PARAMETRIZACAO')
    .setDescription('The  API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalFilters();

  app.use(cors()); // Use a função cors() como middleware do Express
  await app.listen(3000);
}
bootstrap();
