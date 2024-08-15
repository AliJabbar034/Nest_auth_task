/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { LoginDto, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async createUser(userData: UserDto): Promise<User> {
    try {
      const { firstname, lastname, email, password } = userData;
      const isUserExist = await this.userRepository.findOneBy({ email: email });
      if (isUserExist) {
        throw new ConflictException(`User ${email} already exists`);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });
      const savedUser = await this.userRepository.save(user);

      return savedUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async loginUser(loginData: LoginDto): Promise<{ access_token: string }> {
    try {
      const { email, password } = loginData;
      const user = await this.userRepository.findOneBy({ email: email });
      if (!user) {
        throw new NotFoundException('Invalid login data');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new NotFoundException('Invalid login data');
      }

      const token = this.jwtService.sign({ id: user.id });
      return { access_token: token };
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(
    updatedPassword: LoginDto,
  ): Promise<{ message: string }> {
    const { email, password } = updatedPassword;

    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.update(user, { password: hashedPassword });

    return { message: 'Password updated successfully' };
  }
}
