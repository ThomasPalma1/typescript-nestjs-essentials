import { Task } from './tasks.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TaskRepository) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: createTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
