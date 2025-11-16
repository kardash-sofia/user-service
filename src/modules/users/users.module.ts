import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEventsController } from './userEvents.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_BROKER',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')!],
            queue: configService.get<string>('PROJECT_QUEUE')!,
            queueOptions: { durable: true },
          },
        }),
      },
    ]),
  ],
  controllers: [UsersController, UserEventsController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
