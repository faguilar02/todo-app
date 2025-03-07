import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { TasksService } from '../../tasks/task.service';
import { Task } from '../../tasks/interfaces/task.interface';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent {
  private tasksService = inject(TasksService);
  public task = input.required<Task>()
  public isDeleting = computed(() => this.tasksService.isDeleting());

  confirmDelete() {
    // Lógica para confirmar la eliminación
    this.tasksService.isDeleting.set(false);
    this.tasksService.deleteTask(this.task().id)
  }

  cancelDelete() {
    this.tasksService.isDeleting.set(false);
  }
}
