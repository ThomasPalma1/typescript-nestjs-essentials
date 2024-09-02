import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { NotFoundException } from '@nestjs/common';
import { TasksStatus } from './tasks-status.enum';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Thomas',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepositoryCustom; // Using the custom repository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepositoryCustom = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepositoryCustom.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: TasksStatus.OPEN,
      };

      tasksRepositoryCustom.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepositoryCustom.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
