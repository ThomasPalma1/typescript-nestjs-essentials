import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { TaskRepository } from './tasks.repository';

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: Repository<Task>; // Using the generic repository
  let tasksRepositoryCustom: TaskRepository; // Using the custom repository

  beforeEach(() => {
    // Initialize a NestJS module with TasksService and the Repository
  });
});
