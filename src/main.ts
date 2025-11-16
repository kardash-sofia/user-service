import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URL')!],
      queue: configService.get<string>('PROJECT_QUEUE')!,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices(); // запускаємо microservice

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
