/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from './Dto/task.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(taskData: TaskDto, user: User): Promise<Task> {
    const { title, description } = taskData;

    const task = this.taskRepository.create({
      title: title,
      description: description,
      user: user,
    });

    await this.taskRepository.save(task);

    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    if (tasks.length === 0) {
      throw new NotFoundException('Tasks not found');
    }

    return tasks;
  }

  async getTask(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async deleteTask(taskId: number): Promise<{ message: string }> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.taskRepository.delete(task);
    return { message: 'Task deleted successfully' };
  }
}
