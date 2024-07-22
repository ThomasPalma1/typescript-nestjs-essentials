import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTasksById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
}
