/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskDto } from './Dto/task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskData: TaskDto, @Req() req): Promise<Task> {
    console.log(req, taskData);

    const { user } = req;
    return this.taskService.createTask(taskData, user);
  }

  @Get('/')
  async getAllTask(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
  @Get('/:id')
  async getTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTask(id);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number): Promise<{ message: string }> {
    return this.taskService.deleteTask(id);
  }
}
