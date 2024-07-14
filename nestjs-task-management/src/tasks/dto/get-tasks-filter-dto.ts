import { TasksStatus } from '../tasks.model';

export class GetTasksFilterDTO {
  status?: TasksStatus;
  search?: string;
}
// Put the sign '?' in front of the attributes
// indicates that they are optional and not mandatory.
