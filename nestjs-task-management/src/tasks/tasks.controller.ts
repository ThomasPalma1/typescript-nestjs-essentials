import { createTaskDTO } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTasksById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}
