/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
