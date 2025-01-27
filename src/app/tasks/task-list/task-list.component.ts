import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { State } from '../interfaces/state';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../shared/search/search.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskComponent } from '../task/task.component';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, AddTaskComponent, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private tasksService = inject(TasksService);
  public states: State[] = ['All', 'Pending', 'Completed'];
  public selectedState?: State = 'All';
  public tasks = computed(() => this.tasksService.tasks());
  public numberOfTasks = computed(() => this.tasksService.numberOfTasks());
  public completedTasks = computed(() => this.tasksService.completedTasks());

  public counter = computed<string>(
    () => `${this.completedTasks()} / ${this.numberOfTasks()}`
  );

  searchByState(state: State) {
    this.selectedState = state;

    this.tasksService.searchByState(state);
  }
}
