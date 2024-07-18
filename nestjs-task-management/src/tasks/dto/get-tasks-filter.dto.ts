import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TasksStatus } from '../tasks.model';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TasksStatus)
  status: TasksStatus;

  @IsOptional()
  @IsString()
  search: string;
}
