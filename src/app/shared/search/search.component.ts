import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { TasksService } from '../../tasks/task.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public text = signal<string>('');
  private tasksService = inject(TasksService);
  public onKeyUp = output<string>();

  @ViewChild('searchValue')
  public searchText = ElementRef<HTMLInputElement>;

  searchValue(text: string) {
    this.text.set(text);

    this.tasksService.searchTaskByText(this.text());
  }
}
