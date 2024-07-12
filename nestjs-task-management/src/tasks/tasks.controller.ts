import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { createTaskDTO } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTasksById(@Param('id') id: string): Task {
    return this.tasksService.getTasksById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDTO): Task {
    return this.tasksService.createTasks(createTaskDto);
  }
}
