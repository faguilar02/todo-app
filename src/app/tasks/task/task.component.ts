import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { TasksService } from '../task.service';
import { CustomFocusDirective } from '../../shared/directives/custom-focus.directive';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, CustomFocusDirective],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  public task = input.required<Task>();
  private tasksService = inject(TasksService);
  public isEditing = signal<boolean>(false);

  changeToCompleted(id: number) {
    this.tasksService.changeIsCompleted(id);
  }

  editTask(task: Task) {
    this.isEditing.set(true);
    console.log(task);
  }

  changeValueOfEditingByBlur() {
    setTimeout(() => {

      this.isEditing.set(false);
    }, 150);
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id);
  }

  editValueTask(task: Task, text: string ) {
    console.log('editandoo')
    console.log({task:task, text:text})
    this.tasksService.editValueTask(task, text);
  }
}
