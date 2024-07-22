import { TasksStatus } from '../tasks-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TasksStatus)
  status: TasksStatus;

  @IsOptional()
  @IsString()
  search: string;
}
