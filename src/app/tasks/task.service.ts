import { computed, Injectable, signal } from '@angular/core';
import { Task } from './interfaces/task.interface';
import { State } from './interfaces/state';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private _tasks = signal<Task[]>([]);
  public tasks = computed(() => this._filteredTasks() ?? this._tasks());
  private _filteredTasks = signal<Task[] | null>(null);
  private _state = signal<State>('All');
  public numberOfTasks = computed<number>(() => this._tasks().length);
  public completedTasks = computed<number>(
    () => this._tasks().filter((task) => task.completed === true).length
  );
  constructor() {
    this.loadFromLocalStorage();
  }

  addTask(task: Task) {
    console.log(task);
    this._tasks.update((tasks) => [...tasks, { ...task }]);
    this.saveToLocalStorage();
    this.clearFilter();
    console.log(this._tasks());
  }

  changeIsCompleted(id: number) {
    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    this.saveToLocalStorage();

    const filteredTasks = this._tasks().filter((task) => {
      switch (this._state()) {
        case 'Pending':
          return task.completed === false;

        case 'Completed':
          return task.completed === true;

        default:
          return task;
      }
    });

    this._filteredTasks.set(filteredTasks);
  }

  searchTaskByText(text: string) {
    console.log(this._state());
    const formatedText = text.toLowerCase().trim();
    const filteredTasks = this._tasks().filter((task) => {
      switch (this._state()) {
        case 'Pending':
          return task.text.includes(formatedText) && task.completed === false;

        case 'Completed':
          return task.text.includes(formatedText) && task.completed === true;

        default:
          return task.text.includes(formatedText);
      }
    });

    this._filteredTasks.set(filteredTasks);
  }

  editValueTask(task: Task, text: string) {

    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, text: text } : t))
    );

    console.log(this._tasks());

    this.saveToLocalStorage();
  }

  searchByState(state: State) {
    switch (state) {
      case 'All':
        this.clearFilter();
        this._state.set('All');

        break;
      case 'Pending':
        this._state.set('Pending');
        this._filteredTasks.set(
          this._tasks().filter((task) => !task.completed)
        );
        break;
      case 'Completed':
        this._state.set('Completed');
        this._filteredTasks.set(this._tasks().filter((task) => task.completed));
        break;
    }
  }

  clearFilter() {
    this._filteredTasks.set(null);
  }

  loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    this._tasks.set(storedTasks ? JSON.parse(storedTasks) : []);
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks()));
  }

  deleteTask(id: number) {
    const tasks = this._tasks().filter((task) => task.id !== id);

    this._tasks.set(tasks);

    this.saveToLocalStorage();
  }
}
