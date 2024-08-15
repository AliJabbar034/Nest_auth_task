/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user.interceptor';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIREY,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
  controllers: [UserController],
  exports: [TypeOrmModule, JwtModule, PassportModule],
})
export class UserModule {}
