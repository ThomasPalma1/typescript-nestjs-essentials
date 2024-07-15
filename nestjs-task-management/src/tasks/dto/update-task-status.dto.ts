import { IsEnum } from 'class-validator';
import { TasksStatus } from '../tasks.model';

export class UpdateTaskStatusDTO {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
