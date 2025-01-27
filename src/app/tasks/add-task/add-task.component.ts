import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent {
  private fb = inject(FormBuilder);
  private tasksService = inject(TasksService);
  private tasksLenght = computed<number>(
    () => this.tasksService.tasks().length
  );

  public myForm: FormGroup = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(1)]],
  });

  addTask() {
    if (this.myForm.invalid) return;

    const { text } = this.myForm.value;

    const task = {
      id: this.tasksLenght() + 1,
      text: text.toLowerCase().trim(),
      completed: false,
    };

    this.tasksService.addTask(task);

    this.myForm.reset('');
  }
}
