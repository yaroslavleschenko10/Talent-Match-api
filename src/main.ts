import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TalentMatch API')
    .setDescription(
      'REST API платформи TalentMatch — підбір кандидатів і кабінети роботодавця/кандидата.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT з POST /api/auth/login',
      },
      'JWT',
    )
    .addTag('auth', 'Реєстрація та вхід')
    .addTag('candidates', 'Кандидати та профілі')
    .addTag('employers', 'Роботодавці')
    .addTag('vacancies', 'Вакансії')
    .addTag('pipeline', 'Воронка найму')
    .addTag('chats', 'Чати')
    .addTag('interviews', 'Співбесіди')
    .addTag('requests', 'Запити роботодавців')
    .addTag('applications', 'Заявки кандидата')
    .addTag('blacklist', 'Чорний список')
    .addTag('saved-jobs', 'Збережені вакансії')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      tagsSorter: 'alpha',
    },
    customSiteTitle: 'TalentMatch API Docs',
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`TalentMatch API  → http://localhost:${port}/api`);
  console.log(`Swagger UI       → http://localhost:${port}/api/docs`);
}

bootstrap();
