/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  description: string;
}
