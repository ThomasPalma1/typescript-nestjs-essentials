import { Task } from './tasks.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksStatus } from './tasks-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>, // Using the generic repository
    private tasksRepositoryCustom: TaskRepository, // Using the custom repository
  ) {}

  getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.tasksRepositoryCustom.getTasks(filterDto, user);
  }

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

  async updateTaskStatus(id: string, status: TasksStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  createTask(createTaskDto: createTaskDTO, user: User): Promise<Task> {
    return this.tasksRepositoryCustom.createTask(createTaskDto, user);
  }
}
