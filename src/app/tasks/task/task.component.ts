import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  public task = input.required<Task>();
  private tasksService = inject(TasksService);

  changeToCompleted(id: number) {
    this.tasksService.changeIsCompleted(id);
  }
}
