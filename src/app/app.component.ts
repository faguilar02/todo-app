import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from "./tasks/task-list/task-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app-frontend';
}
