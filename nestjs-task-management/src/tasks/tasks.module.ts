import { Task } from './tasks.entity';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],

  // If I don't import the custom repository here,
  // the code throws an error and doesn't allow me to continue executing.
})
export class TasksModule {}

// Code follows the instructions in the NestJS documentation
