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
import { DeleteModalComponent } from "../../shared/delete-modal/delete-modal.component";
import { Task } from '../interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, AddTaskComponent, TaskComponent, DeleteModalComponent],
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

  public isDeleting = computed( () => this.tasksService.isDeleting())
  public taskToDelete = signal<Task>({
    id: 0,
    text: '',
    completed: false

  })

  searchByState(state: State) {
    this.selectedState = state;
    this.tasksService.searchByState(state);
  }

  isDeletingTask(value: boolean) {
    this.tasksService.isDeleting.set(value)
  }

  setTask(task:Task){
    this.taskToDelete.set(task)
  }

}
