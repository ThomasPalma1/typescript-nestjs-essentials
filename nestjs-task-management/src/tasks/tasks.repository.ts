import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { Injectable } from '@nestjs/common';
import { createTaskDTO } from './dto/create-task.dto';
import { TasksStatus } from './tasks-status.enum';

@Injectable()
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: createTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TasksStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
}
