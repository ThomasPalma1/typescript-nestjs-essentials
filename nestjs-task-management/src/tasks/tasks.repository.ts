import { DataSource, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { Injectable } from '@nestjs/common';
import { TasksStatus } from './tasks-status.enum';
import { createTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

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
