/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { LoginDto, UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserInterceptor } from './user.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signUp')
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.createUser(userDto);
  }

  @Post('/login')
  async loginUser(
    @Body() loginData: LoginDto,
  ): Promise<{ access_token: string }> {
    return await this.userService.loginUser(loginData);
  }

  @Patch('/password/reset')
  async updatePassword(
    @Body() updatedData: LoginDto,
  ): Promise<{ message: string }> {
    return this.userService.updatePassword(updatedData);
  }

  @Get('/me')
  @UseInterceptors(UserInterceptor)
  @UseGuards(AuthGuard())
  async getUser(@Req() req): Promise<User> {
    console.log(req);

    return req.user;
  }
}
