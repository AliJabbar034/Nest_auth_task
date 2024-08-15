/* eslint-disable prettier/prettier */

import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;

  @ManyToOne((type) => User, (user) => user.tasks)
  user: User;
}
