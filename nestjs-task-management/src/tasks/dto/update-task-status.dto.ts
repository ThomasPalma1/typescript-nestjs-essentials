import { IsEnum } from 'class-validator';
import { TasksStatus } from '../tasks-status.enum';

export class UpdateTaskStatusDTO {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
