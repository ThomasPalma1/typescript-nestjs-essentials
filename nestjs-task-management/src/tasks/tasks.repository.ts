import { DataSource, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findByName(title: string): Promise<Task[]> {
    return this.find({ where: { title } });
  }
}
