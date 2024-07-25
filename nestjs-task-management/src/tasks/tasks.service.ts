import { Task } from './tasks.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  // At this point, code follows the instructions in the NestJS documentation

  createTask(createTaskDto: createTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
