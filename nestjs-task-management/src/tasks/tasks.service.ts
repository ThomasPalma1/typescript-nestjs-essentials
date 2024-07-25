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
    private tasksRepository: Repository<Task>, // Using the generic repository
    private tasksRepositoryCustom: TaskRepository, // Using the custom repository
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  createTask(createTaskDto: createTaskDTO): Promise<Task> {
    return this.tasksRepositoryCustom.createTask(createTaskDto);
  }
}
