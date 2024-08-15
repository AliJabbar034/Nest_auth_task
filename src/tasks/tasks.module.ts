import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    PassportModule,
    JwtModule,
    UserModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule],
})
export class TasksModule {}
