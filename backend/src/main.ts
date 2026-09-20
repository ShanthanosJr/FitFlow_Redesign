import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // ── Security middleware ──────────────────────────────────────────────
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: config.get<string>('CORS_ORIGINS', '*').split(','),
    credentials: true,
  });

  // ── Global validation pipe ───────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── API versioning ───────────────────────────────────────────────────
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // ── Swagger / OpenAPI ────────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FitFlow API')
    .setDescription(
      'FitFlow core API — workout plans, nutrition tracking, social feed and AI-powered recommendations.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'cognito-jwt',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User profile management')
    .addTag('workouts', 'Workout plans and logs')
    .addTag('nutrition', 'Nutrition tracking and meal logs')
    .addTag('social', 'Social feed, challenges and leaderboards')
    .addTag('notifications', 'Push and in-app notifications')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // ── Start ────────────────────────────────────────────────────────────
  const port = config.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`🚀  FitFlow API running at http://localhost:${port}/v1`);
  console.log(`📖  Swagger docs at    http://localhost:${port}/api/docs`);
}

bootstrap();
