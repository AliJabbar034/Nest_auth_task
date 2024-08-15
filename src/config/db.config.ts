/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/user/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Task],
  autoLoadEntities: true,
  synchronize: true,
};
